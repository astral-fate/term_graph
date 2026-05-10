---
license: cc-by-4.0
language:
  - en
  - ar
tags:
  - ai-governance
  - embeddings
  - rag
  - bge-m3
  - icaire
size_categories:
  - n<1K
pretty_name: "AI-Audit Frameworks (embedded)"
---

# AI-Audit Frameworks — Embedded

Runtime artifact for the [AI-Audit AI Compliance Auditor](https://github.com/). Bundles 519 governance controls and 1242 ICAIRE glossary terms with their pre-computed BGE-M3 embeddings and a Python loader.

For the human-readable version (without binary embeddings), see [`FatimahEmadEldin/AI-Audit-frameworks-raw`](https://huggingface.co/datasets/FatimahEmadEldin/AI-Audit-frameworks-raw).

## Quick start

```python
from huggingface_hub import snapshot_download
import sys

local = snapshot_download(repo_id="FatimahEmadEldin/AI-Audit-frameworks-embedded", repo_type="dataset")
sys.path.insert(0, local)
from loader import load

bundle = load(local)
print(len(bundle["controls"]), "controls")
print(bundle["ctrl_embeddings"].shape)
```

To find the top-8 controls most relevant to a passage from a user's AI policy:

```python
from sentence_transformers import SentenceTransformer
from loader import top_k_controls_for_query

model = SentenceTransformer("BAAI/bge-m3")
query_text = "Our AI system uses internal customer transcripts for training without an explicit licensing review."
query_emb = model.encode(query_text, normalize_embeddings=True)

hits = top_k_controls_for_query(query_emb, bundle, k=8)
for h in hits:
    print(f"{h['similarity']:.2f}  {h['control_id']}  {h['control_title']}")
```

## Files

- `controls.json` — control records (same content as the raw dataset)
- `icaire_terms.json` — ICAIRE glossary terms
- `ctrl_embeddings.npy` — `(N_controls, 1024)` float32 matrix
- `term_embeddings.npy` — `(N_terms, 1024)` float32 matrix
- `embeddings_metadata.json` — model name, dimension, normalization
- `loader.py` — load + similarity helpers

## Embedding model

- **Model:** `BAAI/bge-m3`
- **Dimension:** 1024
- **Normalized:** yes (cosine == dot product)
- **Languages:** multilingual; Arabic and English specifically validated for this dataset

Row alignment: row `i` of `ctrl_embeddings.npy` corresponds to `bundle["controls"][i]`. Same for terms.

## Reproducing the embeddings

```python
from sentence_transformers import SentenceTransformer
m = SentenceTransformer("BAAI/bge-m3")
texts = [f"{c['control_title']}. {c['intent_summary']}. {c['control_text_full'][:1000]}" for c in controls]
emb = m.encode(texts, normalize_embeddings=True)
```

## License

CC-BY-4.0. See the [companion raw dataset](https://huggingface.co/datasets/FatimahEmadEldin/AI-Audit-frameworks-raw) for full provenance.
