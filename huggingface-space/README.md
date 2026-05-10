---
title: Audit AI API
emoji: 🔍
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
license: apache-2.0
---

# Audit AI (FastAPI)

Docker Space for the ICAIRE audit pipeline (`backend/main.py`): PDF → BGE-M3 → NVIDIA NIM.

## This Space (`FatimahEmadEldin/audit-proxy`)

This repository folder contains:

- `Dockerfile` — builds from **this directory** as context (`backend/` + `data/datasets/…` are copied in).
- `backend/` — FastAPI app (mirror of monorepo `backend/`).
- `data/datasets/AI-Audit-frameworks-embedded/` — embedded rubric bundle for faster cold starts.

### Secrets (Space → Settings → Secrets)

Never commit tokens. Set:

| Variable | Required |
|----------|----------|
| `NVIDIA_API_KEY` | Yes (LLM scoring) |
| `AUDIT_API_SECRET` | Recommended — must match `AUDIT_UPSTREAM_TOKEN` on Cloudflare Pages |
| `HF_TOKEN` | If hub downloads need auth |
| `CORS_ORIGINS` | e.g. `https://term-graph.pages.dev` |

Optional:

- `CORS_LOCAL_REGEX=0` in production.

### API base URL (static app endpoint)

Spaces expose HTTP under **`<slug>.hf.space`**, not under `huggingface.co/spaces/.../api/...`.

Example (confirm on **Space → App**):

`https://FatimahEmadEldin-audit-proxy.hf.space`

Then:

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/health` | Liveness + rubric stats |
| `POST` | `/api/v1/chunk` | multipart `file` = PDF → page chunks (no embeddings) |
| `POST` | `/api/v1/embed` | JSON `{"chunks":["text",...]}` → BGE-M3 vectors |
| `POST` | `/api/v1/audit/run/stream` | Full audit (SSE) |

Same **`AUDIT_API_SECRET`**: header `Authorization: Bearer …` on every call when the secret is set.

Set **`AUDIT_UPSTREAM_URL`** on Cloudflare Pages to the **`https://….hf.space`** base only (no trailing slash).

### Rotate leaked tokens

If an API token was ever pasted in chat or committed, **revoke it** in Hugging Face → Settings → Access Tokens and create a new one.
