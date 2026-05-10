---
license: cc-by-sa-4.0
language:
- ar
- en
- fr
pretty_name: ICAIRE AI Glossary — Enriched
size_categories:
- 1K<n<10K
task_categories:
- text-generation
- question-answering
- feature-extraction
tags:
- arabic
- glossary
- ai-terminology
- knowledge-graph
- multilingual
- icaire
- unesco
configs:
- config_name: default
  data_files:
  - split: all
    path: glossary.jsonl
---

# ICAIRE AI Glossary — Enriched (Term Graph - بيان المصطلح)

Bilingual Arabic-English AI glossary based on the ICAIRE canonical vocabulary,
enriched through a multi-layer LLM pipeline into a fully structured
multimodal dataset: metaphors, detailed explanations, UML diagrams, typed
knowledge-graph edges, and narrator-voice story-track assignments.

## Dataset structure

Each term (1,242 total) is one JSON record with these fields:

| Field | Type | Description |
|---|---|---|
| `english_term` | string | Canonical English term (from ICAIRE) |
| `arabic_term` | string | Canonical Arabic term (from ICAIRE) |
| `english_def` | string | Source English definition |
| `arabic_def` | string | Source Arabic definition |
| `one_sentence_feel` | object | `{ar, en}` — everyday metaphor in narrator voice |
| `detailed_explanation` | object | `{ar, en}` — 3-4 sentences |
| `examples` | object | `{ar: [], en: []}` — real-world examples |
| `flashcard_distractors` | object | `{ar: [3 wrong defs], en: [3]}` |
| `common_misconceptions` | object | `{ar: [], en: []}` |
| `difficulty` | string | beginner / intermediate / advanced / research |
| `primary_cluster` | string | One of 50+ fine-grained clusters |
| `secondary_clusters` | list | Other relevant clusters |
| `architecture_role` | string | Where the concept lives in an AI pipeline |
| `ai_mermaid` | string | Auto-generated Mermaid UML diagram code |
| `graph_raw` | object | Typed relationships to other AI concepts |
| `story_assignments_v2` | object | Placements in the 7 learning tracks |

## Story tracks

The corpus is organized into 7 chronological learning tracks:

1. **Data Foundations** — collection, quality, governance (~230 terms)
2. **How a Model Learns** — training lifecycle (~200 terms)
3. **Neural Networks & Deep Learning** — from neurons to transformers (~150)
4. **Classical ML & Statistics** — regression, trees, Bayesian (~140)
5. **Applied AI** — NLP, vision, RL, generative, agents (~240)
6. **Trustworthy AI** — ethics, fairness, privacy, safety (~80)
7. **AI Infrastructure** — hardware, cloud, MLOps, deployment (~100)

## Usage

```python
from datasets import load_dataset
ds = load_dataset("FatimahEmadEldin/icaire-ai-glossary-enriched", split="all")
print(ds[0])
```

Or load the master JSON directly:

```python
import json
from huggingface_hub import hf_hub_download

path = hf_hub_download(repo_id="FatimahEmadEldin/icaire-ai-glossary-enriched",
                      filename="glossary_enriched.json",
                      repo_type="dataset")
with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)
```

## License

Released under CC-BY-SA 4.0, building on ICAIRE's public AI Glossary.
The source ICAIRE glossary terms and definitions remain attributable to
ICAIRE / UNESCO.

## Citation

If you use this dataset, please cite:

```
@dataset{mustalih2026,
  title  = {Term Graph - بيان المصطلح: Multimodal Arabic-First AI Glossary},
  author = {Emad Eldin, Fatimah and El-Marghni, Asmaa},
  year   = {2026},
  url    = {https://huggingface.co/datasets/FatimahEmadEldin/icaire-ai-glossary-enriched}
}
```

## Methodology summary

1. **Source**: ICAIRE bilingual AI Glossary (Arabic/English, 1,242 terms)
2. **Layer 0**: Mermaid UML diagrams generated per term (local Qwen2.5-7B)
3. **Layer 1**: Bilingual enrichment — metaphors, explanations, distractors,
   difficulty, cluster assignment (Qwen3-Next-80B via NVIDIA NIM)
4. **Layer 2**: Story-track assignment with narrator-voice hooks (NIM)
5. **Layer 3**: Typed graph-edge extraction (NIM)
6. **Layer 4**: Graph analysis — PageRank, Louvain community detection (local)
7. **Validation**: Language-leakage detection, Mermaid syntactic + render
   testing, CJK-stripping pass

Built for the UNESCO / ICAIRE AI Glossary Challenge (Track 2: Dataset Creation).
