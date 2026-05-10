---
license: cc-by-4.0
language:
  - en
  - ar
tags:
  - ai-governance
  - compliance
  - ai-ethics
  - icaire
  - arabic
  - rag
size_categories:
  - n<1K
pretty_name: "AI-Audit Frameworks (raw rubric)"
---

# AI-Audit Frameworks — Raw Rubric

Structured control records extracted from international and regional AI governance frameworks, with each control linked to canonical Arabic terminology from the ICAIRE AI Glossary.

This dataset is the **human-readable rubric** powering the [AI-Audit AI Compliance Auditor](https://github.com/) — a Track 1 submission to the ICAIRE AI Glossary Challenge under UNESCO patronage.

## At a glance

- **519 structured controls** across **4 governance frameworks**
- **1242 ICAIRE glossary terms** with bidirectional links into the controls
- **Bilingual** Arabic + English throughout
- Severity-tagged: 300 high, 214 medium, 5 low
- Each control includes verbatim source text, plain-English intent summary, evidence signals, anti-signals, and remediation template

## Frameworks covered

| Framework ID | Name | Controls |
|---|---|---|
| `oecd` | OECD Framework for the Classification of AI Systems | 52 |
| `nist_interop` | Common Guideposts to Promote Interoperability in AI Risk Management | 56 |
| `unesco` | UNESCO Recommendation on the Ethics of Artificial Intelligence | 331 |
| `oecd_principles` | OECD AI Principles | 80 |

## Files

- `controls.json` — all controls, all frameworks, in one file
- `controls_by_framework/<id>.json` — same data sliced per framework
- `icaire_terms.json` — ICAIRE glossary terms with reverse-links to controls
- `controls_review.csv` — flat tabular view (browse in the HF dataset viewer)

## Schema

Each control record contains:

```json
{
  "control_id": "unesco::PRINCIPLE-3",
  "framework_id": "unesco",
  "framework_name_en": "UNESCO Recommendation on the Ethics of AI",
  "framework_name_ar": "توصية اليونسكو بشأن أخلاقيات الذكاء الاصطناعي",
  "control_title": "Fairness and non-discrimination",
  "control_text_full": "<verbatim, capped at 600 chars with [...] marker if longer>",
  "intent_summary": "<2 sentences in plain English>",
  "evidence_signals": ["<observable indicator of compliance>", "..."],
  "evidence_anti_signals": ["<indicator of non-compliance>", "..."],
  "applies_to_doc_types": ["system", "policy", "plan"],
  "weight": 3,
  "severity": "high",
  "remediation_template": "<sentence-form guidance>",
  "source_page_start": 18,
  "source_page_end": 21,
  "related_icaire_terms": [
    {"term_id": "icaire_0117", "term_en": "...", "term_ar": "...", "similarity": 0.78},
    "..."
  ]
}
```

The `applies_to_doc_types` field marks which document types this control evaluates: `system` (model card / technical doc), `policy` (AI policy or charter), `plan` (project plan / PRD / procurement spec).

## How this was built

1. Source PDFs (UNESCO Recommendation, OECD Framework, OECD AI Principles, NIST AI Interoperability) parsed page-by-page with `pypdf`.
2. Cleaned text chunked into ~12K-character windows with 1.5K overlap.
3. Each chunk passed to **Qwen3-Next-80B** via NVIDIA NIM with a structured-extraction prompt asking for the schema above.
4. Records normalized, validated, and deduplicated by content hash.
5. Each control linked to its top-K most semantically similar ICAIRE glossary terms via **BGE-M3** embeddings (cosine similarity ≥ 0.45).

## Honest caveats

- The intent summaries, signals, and remediation templates are LLM-generated. They have been spot-checked but are not exhaustively human-reviewed.
- The framework↔ICAIRE mapping uses embedding similarity only; some links may be loose. Treat similarity scores as a guide, not ground truth.
- Source page numbers refer to the parsed PDF pages, which may differ slightly from a printed edition's page numbering.
- This is a research aid for compliance reviewers, not legal advice.

## Companion dataset

For the embeddings and a Python loader, see [`FatimahEmadEldin/AI-Audit-frameworks-embedded`](https://huggingface.co/datasets/FatimahEmadEldin/AI-Audit-frameworks-embedded).

## Citation

```bibtex
@dataset{AI-Audit_frameworks_raw,
  author = {Emad Eldin, Fatimah},
  title = {AI-Audit Frameworks: ICAIRE-Grounded AI Governance Rubric},
  year = {2026},
  publisher = {Hugging Face},
  howpublished = {\url{https://huggingface.co/datasets/FatimahEmadEldin/AI-Audit-frameworks-raw}}
}
```

## License

CC-BY-4.0. The underlying source frameworks (UNESCO, OECD, NIST) are publicly available; this dataset adds structured analysis and ICAIRE linkage on top.
