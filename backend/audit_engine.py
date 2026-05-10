"""Audit AI — scoring engine (same logic as the Gradio reference app at repo root).

PDF -> parse/chunk -> BGE-M3 embeddings -> top-k chunks per control vs rubric ->
NVIDIA NIM (Qwen) per-control JSON judgement -> aggregate + markdown report.

Rubric: data/datasets/AI-Audit-frameworks-embedded or snapshot_download from
FatimahEmadEldin/AI-Audit-frameworks-embedded. Used by FastAPI backend/main.py.
"""

from __future__ import annotations

import json
import os
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Any, Callable, Optional

import numpy as np
from huggingface_hub import snapshot_download
from openai import OpenAI
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer
from tenacity import retry, stop_after_attempt, wait_exponential

# Project root (…/term_graph-main), not backend/
PROJECT_ROOT = Path(__file__).resolve().parent.parent
_BACKEND_DIR = Path(__file__).resolve().parent
_DOTENV_IMPORT_WARNED = False


def _load_env_files() -> None:
    """Load `.env` from repo root then `backend/.env` (later file overrides)."""
    global _DOTENV_IMPORT_WARNED
    try:
        from dotenv import load_dotenv
    except ImportError:
        if not _DOTENV_IMPORT_WARNED:
            print("WARNING: python-dotenv is not installed; .env files are ignored. pip install python-dotenv")
            _DOTENV_IMPORT_WARNED = True
        return
    # override=True: a blank NVIDIA_API_KEY in the OS env must not block `.env`
    load_dotenv(PROJECT_ROOT / ".env", override=True)
    load_dotenv(_BACKEND_DIR / ".env", override=True)


def _parse_env_file(path: Path) -> dict[str, str]:
    """Manual parse if dotenv misses (UTF-8 BOM on Windows, odd quoting, or no python-dotenv)."""
    if not path.is_file():
        return {}
    try:
        text = path.read_text(encoding="utf-8-sig")
    except OSError:
        return {}
    out: dict[str, str] = {}
    for line in text.splitlines():
        s = line.strip()
        if not s or s.startswith("#") or "=" not in s:
            continue
        k, _, v = s.partition("=")
        k = k.strip()
        v = v.strip().strip('"').strip("'")
        if k:
            out[k] = v
    return out


def _get_nvidia_api_key() -> str:
    _load_env_files()
    k = (os.environ.get("NVIDIA_API_KEY") or "").strip()
    if k:
        return k
    for p in (PROJECT_ROOT / ".env", _BACKEND_DIR / ".env"):
        k = (_parse_env_file(p).get("NVIDIA_API_KEY") or "").strip()
        if k:
            os.environ["NVIDIA_API_KEY"] = k
            return k
    return ""


# ============================================================
# Config
# ============================================================
EMBEDDED_REPO = "FatimahEmadEldin/AI-Audit-frameworks-embedded"
NIM_BASE_URL = "https://integrate.api.nvidia.com/v1"
QWEN_MODEL = "qwen/qwen3-next-80b-a3b-instruct"
EMBEDDING_MODEL = "BAAI/bge-m3"

CHUNK_CHARS = 6000        # smaller than indexing — user docs are usually short
CHUNK_OVERLAP = 800
TOP_K_CHUNKS_PER_CONTROL = 3
CONCURRENCY = 8
PER_CONTROL_TIMEOUT_S = 90
EMBED_BATCH_SIZE = 16  # BGE-M3 encode batches; drives per-batch progress in the UI stream

NIM_KEY = _get_nvidia_api_key()
HF_TOKEN = os.environ.get("HF_TOKEN", "")  # optional: private datasets, or hf auth for download

if not NIM_KEY:
    print("WARNING: NVIDIA_API_KEY not set. Audit will fail when invoked.")


def _resolve_rubric_dir() -> str:
    """Prefer a local embedded bundle; otherwise download from Hugging Face."""
    override = (os.environ.get("AI_AUDIT_RUBRIC_LOCAL") or "").strip()
    if override:
        p = Path(override)
        if p.is_dir() and (p / "controls.json").is_file():
            print(f"Loading AI-Audit rubric from AI_AUDIT_RUBRIC_LOCAL: {p.resolve()}")
            return str(p.resolve())
        print(f"WARNING: AI_AUDIT_RUBRIC_LOCAL is set but invalid: {override}")

    default_local = PROJECT_ROOT / "data" / "datasets" / "AI-Audit-frameworks-embedded"
    if default_local.is_dir() and (default_local / "controls.json").is_file():
        print(f"Loading AI-Audit rubric from local path: {default_local}")
        return str(default_local)

    print("Downloading AI-Audit rubric from Hugging Face …")
    return snapshot_download(repo_id=EMBEDDED_REPO, repo_type="dataset", token=HF_TOKEN or None)


# ============================================================
# One-time setup: download rubric, load embedder, build NIM client
# ============================================================
RUBRIC_DIR = _resolve_rubric_dir()
sys.path.insert(0, RUBRIC_DIR)
from loader import load as load_rubric  # noqa: E402

BUNDLE = load_rubric(RUBRIC_DIR)
CONTROLS = BUNDLE["controls"]
ICAIRE_TERMS = BUNDLE["icaire_terms"]
CTRL_EMB = BUNDLE["ctrl_embeddings"]
TERM_EMB = BUNDLE["term_embeddings"]
META = BUNDLE["metadata"]
print(f"Loaded {len(CONTROLS)} controls across "
      f"{len(set(c['framework_id'] for c in CONTROLS))} frameworks")
print(f"Embedding dim: {CTRL_EMB.shape[1]}, ICAIRE terms: {len(ICAIRE_TERMS)}")

print(f"Loading embedding model {EMBEDDING_MODEL} …")
EMBEDDER = SentenceTransformer(EMBEDDING_MODEL)
print("Embedder ready")

NIM_CLIENT = OpenAI(base_url=NIM_BASE_URL, api_key=NIM_KEY) if NIM_KEY else None


def refresh_nim_client_from_env() -> None:
    """Reload `.env` and rebuild the NIM client (picks up new keys without restarting uvicorn)."""
    global NIM_CLIENT, NIM_KEY
    NIM_KEY = _get_nvidia_api_key()
    NIM_CLIENT = OpenAI(base_url=NIM_BASE_URL, api_key=NIM_KEY) if NIM_KEY else None


def audit_env_diag() -> dict:
    """Non-secret hints for debugging local key loading (used by GET /health)."""
    try:
        import importlib.util as ilu

        dot_ok = ilu.find_spec("dotenv") is not None
    except Exception:
        dot_ok = False
    return {
        "project_root": str(PROJECT_ROOT),
        "env_root_exists": (PROJECT_ROOT / ".env").is_file(),
        "env_backend_exists": (_BACKEND_DIR / ".env").is_file(),
        "nim_key_chars": len(NIM_KEY),
        "dotenv_importable": dot_ok,
    }


FRAMEWORK_IDS = sorted({c["framework_id"] for c in CONTROLS})
FRAMEWORK_NAMES = {c["framework_id"]: c["framework_name_en"] for c in CONTROLS}
FRAMEWORK_CHOICES = [(FRAMEWORK_NAMES[fid], fid) for fid in FRAMEWORK_IDS]

DOC_TYPE_CHOICES = [
    ("Project plan / PRD / procurement spec", "plan"),
    ("AI policy / charter", "policy"),
    ("System or model documentation", "system"),
]


# ============================================================
# PDF parsing + chunking (mirrors Phase 1, on the user's doc)
# ============================================================
def parse_pdf(path: str) -> list[dict[str, Any]]:
    reader = PdfReader(path)
    pages = []
    for i, page in enumerate(reader.pages):
        try:
            txt = page.extract_text() or ""
        except Exception:
            txt = ""
        txt = re.sub(r"[ \t]+", " ", txt)
        txt = re.sub(r"\n{3,}", "\n\n", txt).strip()
        pages.append({"page": i + 1, "text": txt})
    return pages


def chunk_pages(pages: list[dict], chunk_chars: int = CHUNK_CHARS,
                overlap: int = CHUNK_OVERLAP) -> list[dict]:
    full = ""
    char_to_page: list[int] = []
    for p in pages:
        marker = f"\n\n[[PAGE_{p['page']}]]\n\n"
        full += marker + p["text"]
        char_to_page.extend([p["page"]] * (len(marker) + len(p["text"])))
    chunks: list[dict] = []
    i = 0
    while i < len(full):
        end = min(i + chunk_chars, len(full))
        if end < len(full):
            cut = full.rfind("\n\n", i + chunk_chars - 1000, end)
            if cut > i + chunk_chars - 1000:
                end = cut
        text = full[i:end].strip()
        if text:
            page_nums = sorted(set(char_to_page[i:end])) if char_to_page[i:end] else []
            chunks.append({
                "text": text,
                "page_start": page_nums[0] if page_nums else None,
                "page_end": page_nums[-1] if page_nums else None,
            })
        i = end - overlap if end < len(full) else end
    return chunks


# ============================================================
# LLM evaluation per control
# ============================================================
EVAL_SYSTEM_PROMPT = """You are an expert AI governance auditor evaluating a single document against a single control from an international AI governance framework.

Your job: given a control (its intent, evidence signals, and anti-signals) and the most relevant excerpts from the user's document, judge whether the document satisfies the control.

Return a JSON object with this EXACT schema:

{
  "status": "met | partial | not_met | na",
  "confidence": 0-100,
  "evidence_quote": "<exact verbatim quote from the user's document that informed the judgement, or empty string if nothing relevant was found>",
  "evidence_page_start": <integer page number, or null>,
  "evidence_page_end": <integer page number, or null>,
  "reasoning": "<2-3 sentences explaining why this status applies, referencing the evidence_signals and anti_signals>",
  "remediation": "<1-2 sentences of concrete guidance for the user, in plain English. Use canonical ICAIRE Arabic terms in parentheses where appropriate. Empty if status is 'met'.>"
}

Status definitions:
- met: document explicitly addresses the control with concrete language matching the evidence_signals
- partial: document gestures at the control but lacks specifics (e.g. mentions concept without naming owner, cadence, or methodology)
- not_met: document fails to address the control, or actively contradicts it
- na: control does not apply to this document type or context

Confidence definitions:
- 80-100: explicit textual evidence either way
- 50-79: inferred from related text
- 0-49: limited evidence, manual review recommended

Rules:
- Quote the evidence verbatim from the document. Do not paraphrase. If nothing relevant exists, use empty string and lower confidence.
- The reasoning must reference specific evidence_signals or anti_signals from the control, not vague principles.
- Be conservative. If you cannot find evidence, use "not_met" with appropriate confidence rather than inventing compliance.
- Return ONLY the JSON object. No prose, no markdown fences.
"""


def _extract_json(text: str) -> dict:
    """Tolerant JSON extraction matching the Phase 1 utility."""
    text = re.sub(r"```(?:json)?\s*", "", text)
    text = re.sub(r"```\s*$", "", text)
    start = text.find("{")
    if start < 0:
        return {}
    depth = 0
    in_str = False
    esc = False
    for i, ch in enumerate(text[start:], start=start):
        if esc:
            esc = False
            continue
        if ch == "\\" and in_str:
            esc = True
            continue
        if ch == '"':
            in_str = not in_str
            continue
        if in_str:
            continue
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                try:
                    return json.loads(text[start:i + 1])
                except json.JSONDecodeError:
                    return {}
    return {}


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, min=4, max=20))
def call_qwen(user_prompt: str) -> str:
    if NIM_CLIENT is None:
        raise RuntimeError(
            "NVIDIA_API_KEY is not set. Add it to the environment or to .env (repo root or backend/). "
            "See backend/.env.example."
        )
    completion = NIM_CLIENT.chat.completions.create(
        model=QWEN_MODEL,
        messages=[
            {"role": "system", "content": EVAL_SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.1,
        top_p=0.95,
        max_tokens=2000,
        stream=False,
        timeout=PER_CONTROL_TIMEOUT_S,
    )
    return completion.choices[0].message.content or ""


def evaluate_one_control(control: dict, user_chunks: list[dict],
                         user_emb: np.ndarray) -> dict:
    """Score a single control against the user's document. Returns the judgement
    record with control metadata stamped onto it."""
    # Find top-K user chunks for this control
    ctrl_idx = next((i for i, c in enumerate(CONTROLS) if c["control_id"] == control["control_id"]), None)
    if ctrl_idx is None:
        return _stub_result(control, "na", "Control not found in rubric.")
    ctrl_vec = CTRL_EMB[ctrl_idx]
    sims = user_emb @ ctrl_vec
    top_idx = np.argsort(-sims)[:TOP_K_CHUNKS_PER_CONTROL]

    if len(user_chunks) == 0:
        return _stub_result(control, "na", "User document was empty after parsing.")

    # Build the prompt
    excerpts = []
    for j in top_idx:
        ch = user_chunks[int(j)]
        excerpts.append(
            f"--- excerpt (pages {ch['page_start']}-{ch['page_end']}, similarity {sims[int(j)]:.2f}) ---\n"
            f"{ch['text'][:2500]}"
        )
    excerpts_text = "\n\n".join(excerpts)

    icaire_hints = ", ".join(
        f"{t['term_en']} ({t['term_ar']})"
        for t in (control.get("related_icaire_terms") or [])[:5]
    )

    user_prompt = (
        f"FRAMEWORK: {control['framework_name_en']}\n"
        f"CONTROL ID: {control['control_id']}\n"
        f"CONTROL TITLE: {control['control_title']}\n\n"
        f"INTENT (what this control requires):\n{control['intent_summary']}\n\n"
        f"EVIDENCE SIGNALS (what compliance looks like):\n"
        + "\n".join(f"- {s}" for s in (control.get('evidence_signals') or []))
        + "\n\nANTI-SIGNALS (what non-compliance looks like):\n"
        + "\n".join(f"- {s}" for s in (control.get('evidence_anti_signals') or []))
        + f"\n\nRELATED ICAIRE TERMS (use these in remediation): {icaire_hints}\n\n"
        f"REMEDIATION TEMPLATE: {control.get('remediation_template', '')}\n\n"
        f"=== USER DOCUMENT EXCERPTS ===\n\n{excerpts_text}\n\n"
        f"Evaluate the user's document against this control. Return only the JSON object."
    )

    try:
        raw = call_qwen(user_prompt)
        result = _extract_json(raw)
    except Exception as e:
        return _stub_result(control, "na", f"LLM call failed: {e}")

    if not result or "status" not in result:
        return _stub_result(control, "na", "Could not parse LLM response.")

    # Validate + normalize
    status = result.get("status", "na")
    if status not in {"met", "partial", "not_met", "na"}:
        status = "na"
    try:
        confidence = max(0, min(100, int(result.get("confidence", 50))))
    except Exception:
        confidence = 50

    return {
        "control_id": control["control_id"],
        "framework_id": control["framework_id"],
        "framework_name_en": control["framework_name_en"],
        "control_title": control["control_title"],
        "severity": control.get("severity", "med"),
        "weight": control.get("weight", 2),
        "status": status,
        "confidence": confidence,
        "evidence_quote": str(result.get("evidence_quote", ""))[:1500],
        "evidence_page_start": result.get("evidence_page_start"),
        "evidence_page_end": result.get("evidence_page_end"),
        "reasoning": str(result.get("reasoning", ""))[:1500],
        "remediation": str(result.get("remediation", ""))[:1500],
        "control_intent": control.get("intent_summary", ""),
        "evidence_signals": control.get("evidence_signals", []),
        "evidence_anti_signals": control.get("evidence_anti_signals", []),
        "related_icaire_terms": control.get("related_icaire_terms", [])[:5],
        "source_pages": f"{control.get('source_page_start', '')}-{control.get('source_page_end', '')}",
    }


def _stub_result(control: dict, status: str, reasoning: str) -> dict:
    return {
        "control_id": control["control_id"],
        "framework_id": control["framework_id"],
        "framework_name_en": control["framework_name_en"],
        "control_title": control["control_title"],
        "severity": control.get("severity", "med"),
        "weight": control.get("weight", 2),
        "status": status,
        "confidence": 0,
        "evidence_quote": "",
        "evidence_page_start": None,
        "evidence_page_end": None,
        "reasoning": reasoning,
        "remediation": "",
        "control_intent": control.get("intent_summary", ""),
        "evidence_signals": control.get("evidence_signals", []),
        "evidence_anti_signals": control.get("evidence_anti_signals", []),
        "related_icaire_terms": control.get("related_icaire_terms", [])[:5],
        "source_pages": "",
    }


# ============================================================
# Aggregation
# ============================================================
def aggregate(results: list[dict]) -> dict:
    total = len(results)
    by_status = {"met": 0, "partial": 0, "not_met": 0, "na": 0}
    for r in results:
        by_status[r["status"]] = by_status.get(r["status"], 0) + 1

    # Weighted score: met=1.0, partial=0.5, not_met=0.0, na excluded
    scoreable = [r for r in results if r["status"] != "na"]
    if scoreable:
        weight_sum = sum(r["weight"] for r in scoreable)
        achieved = sum(
            r["weight"] * (1.0 if r["status"] == "met" else 0.5 if r["status"] == "partial" else 0.0)
            for r in scoreable
        )
        overall = round(100 * achieved / max(1, weight_sum))
    else:
        overall = 0

    # Per-framework
    per_fw: dict[str, dict] = {}
    for r in results:
        fid = r["framework_id"]
        per_fw.setdefault(fid, {
            "framework_id": fid,
            "framework_name_en": r["framework_name_en"],
            "controls": [],
        })
        per_fw[fid]["controls"].append(r)

    for fw in per_fw.values():
        cs = fw["controls"]
        fw["counts"] = {s: sum(1 for c in cs if c["status"] == s) for s in by_status}
        score_pool = [c for c in cs if c["status"] != "na"]
        if score_pool:
            wsum = sum(c["weight"] for c in score_pool)
            ach = sum(
                c["weight"] * (1.0 if c["status"] == "met" else 0.5 if c["status"] == "partial" else 0.0)
                for c in score_pool
            )
            fw["score"] = round(100 * ach / max(1, wsum))
        else:
            fw["score"] = 0

    return {
        "total_controls_evaluated": total,
        "overall_score": overall,
        "by_status": by_status,
        "by_framework": list(per_fw.values()),
        "all_results": results,
    }


# ============================================================
# Render (Markdown for Gradio)
# ============================================================
def status_emoji(status: str) -> str:
    return {"met": "🟢", "partial": "🟡", "not_met": "🔴", "na": "⚪"}.get(status, "⚪")


def severity_badge(sev: str) -> str:
    return {"high": "**HIGH**", "med": "med", "low": "low"}.get(sev, sev)


def render_dashboard_md(agg: dict, doc_name: str) -> str:
    lines = []
    score = agg["overall_score"]
    label = ("strong compliance" if score >= 75
             else "developing compliance" if score >= 50
             else "significant gaps")
    lines.append(f"# Audit complete — {label}")
    lines.append(f"_{doc_name} · {agg['total_controls_evaluated']} controls evaluated_\n")

    bs = agg["by_status"]
    lines.append("## Overall")
    lines.append(f"- **Overall score:** {score}/100")
    lines.append(f"- 🟢 Met: {bs['met']}  🟡 Partial: {bs['partial']}  🔴 Not met: {bs['not_met']}  ⚪ N/A: {bs['na']}\n")

    lines.append("## Score by framework")
    for fw in agg["by_framework"]:
        c = fw["counts"]
        lines.append(
            f"### {fw['framework_name_en']} — {fw['score']}/100\n"
            f"🟢 {c['met']}  🟡 {c['partial']}  🔴 {c['not_met']}  ⚪ {c['na']}\n"
        )

    # Top gaps: high-severity not_met, then partial
    gaps = sorted(
        [r for r in agg["all_results"] if r["status"] in {"not_met", "partial"}],
        key=lambda r: (
            0 if r["severity"] == "high" else 1 if r["severity"] == "med" else 2,
            0 if r["status"] == "not_met" else 1,
            -r["confidence"],
        ),
    )[:10]

    lines.append("## Top gaps to address")
    if not gaps:
        lines.append("_No gaps found — every control is met._")
    for g in gaps:
        lines.append(
            f"### {status_emoji(g['status'])} `{g['control_id']}` — {g['control_title']}"
        )
        lines.append(
            f"_{g['framework_name_en']} · severity {severity_badge(g['severity'])} · {g['confidence']}% confidence_"
        )
        lines.append(f"**Why:** {g['reasoning']}")
        if g["evidence_quote"]:
            ev_pages = ""
            if g["evidence_page_start"]:
                ev_pages = f" (pp. {g['evidence_page_start']}-{g['evidence_page_end']})"
            lines.append(f"**Evidence{ev_pages}:** _\"{g['evidence_quote'][:400]}\"_")
        if g["remediation"]:
            lines.append(f"**Remediation:** {g['remediation']}")
        if g["related_icaire_terms"]:
            terms = ", ".join(f"`{t['term_ar']}`" for t in g["related_icaire_terms"][:4])
            lines.append(f"**ICAIRE terms:** {terms}")
        lines.append("")

    return "\n".join(lines)


def _embed_user_chunks_batched(
    chunk_texts: list[str],
    progress: Callable[..., Any],
    embed_lo: float = 0.18,
    embed_hi: float = 0.30,
) -> np.ndarray:
    """BGE-M3 encoding in batches so progress callbacks can drive the UI stream."""
    n = len(chunk_texts)
    dim = int(EMBEDDER.get_sentence_embedding_dimension())
    if n == 0:
        return np.empty((0, dim))

    bs = max(1, EMBED_BATCH_SIZE)
    parts: list[np.ndarray] = []
    for start in range(0, n, bs):
        end = min(start + bs, n)
        batch = chunk_texts[start:end]
        emb = EMBEDDER.encode(
            batch,
            normalize_embeddings=True,
            show_progress_bar=False,
        )
        parts.append(np.asarray(emb))
        done = end / n
        pct = embed_lo + (embed_hi - embed_lo) * done
        progress(
            float(pct),
            desc=f"BGE-M3 embedding: chunk batch {end}/{n}",
            phase="embed",
        )

    return np.vstack(parts)


def pdf_file_to_chunks_dict(pdf_path: str) -> dict[str, Any]:
    """Parse + chunk a PDF on disk; used by GET-less POST /api/v1/chunk."""
    pages = parse_pdf(pdf_path)
    total_chars = sum(len(p["text"]) for p in pages)
    if total_chars < 200:
        raise ValueError(
            "The PDF appears empty or is scanned (no extractable text). Try a text-based PDF."
        )
    chunks = chunk_pages(pages)
    return {
        "pages": len(pages),
        "total_chars": total_chars,
        "chunks": chunks,
    }


def embed_plain_texts_api(chunk_texts: list[str]) -> dict[str, Any]:
    """Run BGE-M3 on chunk strings; returns JSON-serializable vectors."""

    def _noop(*args: Any, **kwargs: Any) -> None:
        pass

    arr = _embed_user_chunks_batched(chunk_texts, _noop)
    dim = int(EMBEDDER.get_sentence_embedding_dimension())
    if arr.size == 0:
        return {"dim": dim, "count": 0, "embeddings": []}
    return {
        "dim": dim,
        "count": int(arr.shape[0]),
        "embeddings": arr.astype(float).tolist(),
    }


# ============================================================
# Main audit flow (same pipeline as the Gradio Space; for FastAPI)
# ============================================================
def run_audit_sync(
    pdf_path: str,
    doc_type: str,
    selected_frameworks: list[str],
    progress: Callable[..., Any] | None = None,
) -> tuple[str, dict]:
    """Parse PDF → chunk → BGE-M3 embed → per-control LLM (NIM) → aggregate → markdown + JSON dict."""
    if progress is None:

        def progress(*args, **kwargs):
            pass

    if not selected_frameworks:
        raise ValueError("Select at least one framework.")
    refresh_nim_client_from_env()
    if NIM_CLIENT is None:
        raise RuntimeError(
            "NVIDIA_API_KEY is not set. Add it to the environment or to .env (repo root or backend/). "
            "Install python-dotenv (pip install -r requirements.txt). See backend/.env.example."
        )

    doc_name = os.path.basename(pdf_path)

    progress(0.05, desc="Parsing PDF", phase="parse")
    pages = parse_pdf(pdf_path)
    total_chars = sum(len(p["text"]) for p in pages)
    if total_chars < 200:
        raise ValueError(
            "The PDF appears empty or is scanned (no extractable text). Try a text-based PDF."
        )

    progress(0.12, desc=f"Chunking {len(pages)} pages", phase="chunk")
    user_chunks = chunk_pages(pages)

    chunk_texts = [c["text"] for c in user_chunks]
    user_emb = _embed_user_chunks_batched(chunk_texts, progress)

    in_scope = [
        c
        for c in CONTROLS
        if c["framework_id"] in selected_frameworks
        and (doc_type in (c.get("applies_to_doc_types") or []) or not c.get("applies_to_doc_types"))
    ]
    if not in_scope:
        raise ValueError("No controls in scope after filtering. Try a different document type.")

    results: list[dict] = []
    completed = 0
    progress(0.30, desc=f"Evaluating 0/{len(in_scope)} controls", phase="llm")

    with ThreadPoolExecutor(max_workers=CONCURRENCY) as ex:
        futures = {
            ex.submit(evaluate_one_control, ctrl, user_chunks, user_emb): ctrl for ctrl in in_scope
        }
        for fut in as_completed(futures):
            try:
                r = fut.result(timeout=PER_CONTROL_TIMEOUT_S + 30)
            except Exception as e:
                ctrl = futures[fut]
                r = _stub_result(ctrl, "na", f"Evaluation error: {e}")
            results.append(r)
            completed += 1
            frac = 0.30 + 0.65 * (completed / len(in_scope))
            progress(frac, desc=f"LLM (NIM): {completed}/{len(in_scope)} controls", phase="llm")

    progress(0.97, desc="Aggregating results", phase="aggregate")
    agg = aggregate(results)
    md = render_dashboard_md(agg, doc_name)

    audit = {
        "document": doc_name,
        "doc_type": doc_type,
        "frameworks": selected_frameworks,
        "summary": {
            "overall_score": agg["overall_score"],
            "by_status": agg["by_status"],
            "by_framework": [
                {"framework_id": fw["framework_id"], "score": fw["score"], "counts": fw["counts"]}
                for fw in agg["by_framework"]
            ],
        },
        "results": agg["all_results"],
    }
    progress(1.0, desc="Done", phase="done")
    return md, audit