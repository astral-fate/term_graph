#!/usr/bin/env python3
"""
Build a term-only RAG reference from ICAIRE CSV exports (no definitions).

Reads:
  - AI Glossary - Dataset.xlsx - English - Arabic.csv  (English Term, Arabic Term, …)
  - AI Glossary - Dataset.xlsx - English - French.csv   (English, Arabic, French, …)

Writes:
  - data/rag_terms_index.json   — versioned JSON array + metadata
  - data/rag_terms_index.jsonl  — one JSON object per line (embeddings / vector DB ingest)

Merge key: normalized English Term (case-insensitive strip). French comes from the
trilingual file; Arabic is filled from either file with preference for non-empty values.
"""

from __future__ import annotations

import csv
import json
import re
import unicodedata
from collections import defaultdict
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parent.parent
CSV_EN_AR = REPO_ROOT / "AI Glossary - Dataset.xlsx - English - Arabic.csv"
CSV_EN_FR = REPO_ROOT / "AI Glossary - Dataset.xlsx - English - French.csv"
OUT_DIR = REPO_ROOT / "data"
OUT_JSON = OUT_DIR / "rag_terms_index.json"
OUT_JSONL = OUT_DIR / "rag_terms_index.jsonl"


def norm_en_key(s: str | None) -> str:
    if not s:
        return ""
    t = unicodedata.normalize("NFKC", s).strip().casefold()
    t = re.sub(r"\s+", " ", t)
    return t


def clean_term(s: str | None) -> str:
    if not s:
        return ""
    t = unicodedata.normalize("NFKC", str(s)).strip()
    t = re.sub(r"\s+", " ", t)
    return t


def stable_id(english_term: str) -> str:
    """Filesystem-safe id aligned with glossary folder naming (spaces -> underscores)."""
    x = english_term.strip()
    x = x.replace("/", "_").replace("\\", "_")
    x = re.sub(r"\s+", "_", x)
    x = re.sub(r"[^\w\u0600-\u06FF.-]", "", x, flags=re.UNICODE)
    x = re.sub(r"_+", "_", x).strip("_")
    return x or "unknown_term"


def read_csv_rows(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def build_merged_terms() -> tuple[list[dict], dict]:
    """Returns (terms list sorted by english, stats dict)."""
    if not CSV_EN_AR.is_file():
        raise FileNotFoundError(CSV_EN_AR)
    if not CSV_EN_FR.is_file():
        raise FileNotFoundError(CSV_EN_FR)

    rows_ar = read_csv_rows(CSV_EN_AR)
    rows_fr = read_csv_rows(CSV_EN_FR)

    # key -> {english, arabic, french, sources}
    by_key: dict[str, dict] = {}

    def upsert(key: str, en: str, ar: str = "", fr: str = "", source: str = "") -> None:
        if not key or not en:
            return
        if key not in by_key:
            by_key[key] = {
                "english_term": en,
                "arabic_term": "",
                "french_term": "",
                "_sources": [],
            }
        rec = by_key[key]
        if rec["english_term"] != en and rec["english_term"].casefold() == en.casefold():
            pass  # same key, casing variant — keep first canonical spelling
        if ar and not rec["arabic_term"]:
            rec["arabic_term"] = ar
        elif ar and rec["arabic_term"] and ar != rec["arabic_term"]:
            rec.setdefault("_arabic_variants", []).append(ar)
        if fr:
            rec["french_term"] = fr
        if source:
            rec["_sources"].append(source)

    for row in rows_ar:
        en = clean_term(row.get("English Term"))
        ar = clean_term(row.get("Arabic Term"))
        k = norm_en_key(en)
        upsert(k, en, ar=ar, source="en_ar")

    for row in rows_fr:
        en = clean_term(row.get("English Term"))
        ar = clean_term(row.get("Arabic Term"))
        fr = clean_term(row.get("French Term"))
        k = norm_en_key(en)
        upsert(k, en, ar=ar, fr=fr, source="en_fr")

    stats: dict = {
        "from_en_ar_rows": len(rows_ar),
        "from_en_fr_rows": len(rows_fr),
        "merged_unique_english_keys": len(by_key),
        "missing_arabic": 0,
        "missing_french": 0,
        "arabic_mismatch_warnings": 0,
    }

    terms: list[dict] = []
    used_ids: defaultdict[str, int] = defaultdict(int)

    for key in sorted(by_key.keys(), key=lambda k: by_key[k]["english_term"].lower()):
        rec = by_key[key]
        en = rec["english_term"]
        ar = rec["arabic_term"]
        fr = rec["french_term"]
        if not ar:
            stats["missing_arabic"] += 1
        if not fr:
            stats["missing_french"] += 1
        if rec.get("_arabic_variants"):
            stats["arabic_mismatch_warnings"] += 1

        tid = stable_id(en)
        used_ids[tid] += 1
        if used_ids[tid] > 1:
            tid = f"{tid}_{used_ids[tid]}"

        # Single string for lexical / BM25 / embedding on terms only (trilingual)
        parts = [p for p in (en, ar, fr) if p]
        retrieval_text = " | ".join(parts)
        retrieval_text_lower = retrieval_text.casefold()

        out = {
            "id": tid,
            "english_term": en,
            "arabic_term": ar,
            "french_term": fr,
            "retrieval_text": retrieval_text,
            "retrieval_text_lower": retrieval_text_lower,
        }
        if rec.get("_arabic_variants"):
            out["arabic_alternate_from_merge"] = rec["_arabic_variants"]
        terms.append(out)

    stats["total_output_terms"] = len(terms)
    return terms, stats


def main() -> None:
    terms, stats = build_merged_terms()

    payload = {
        "meta": {
            "version": "1.0",
            "purpose": "term-only RAG index (English, Arabic, French labels — no definitions)",
            "sources": {
                "en_ar": str(CSV_EN_AR.relative_to(REPO_ROOT)),
                "en_fr": str(CSV_EN_FR.relative_to(REPO_ROOT)),
            },
            "stats": stats,
        },
        "terms": terms,
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    with OUT_JSONL.open("w", encoding="utf-8") as f:
        for t in terms:
            f.write(json.dumps(t, ensure_ascii=False) + "\n")

    print(f"Wrote {OUT_JSON} ({len(terms)} terms)")
    print(f"Wrote {OUT_JSONL}")
    print("Stats:", json.dumps(stats, indent=2))


if __name__ == "__main__":
    main()
