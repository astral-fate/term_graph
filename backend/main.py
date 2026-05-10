"""Audit AI — FastAPI service wrapping the same pipeline as the Gradio Space (audit_engine)."""

from __future__ import annotations

import asyncio
import json
import os
import queue
import tempfile
import threading
from pathlib import Path

from fastapi import FastAPI, File, Form, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from starlette.middleware.base import BaseHTTPMiddleware

# Load `.env` before importing audit_engine (same paths as audit_engine._load_env_files).
try:
    from dotenv import load_dotenv

    _root = Path(__file__).resolve().parent.parent
    _bd = Path(__file__).resolve().parent
    load_dotenv(_root / ".env", override=True)
    load_dotenv(_bd / ".env", override=True)
except ImportError:
    pass

from pydantic import BaseModel, Field

from audit_engine import (
    CONTROLS,
    FRAMEWORK_IDS,
    ICAIRE_TERMS,
    NIM_CLIENT,
    audit_env_diag,
    embed_plain_texts_api,
    pdf_file_to_chunks_dict,
    refresh_nim_client_from_env,
    run_audit_sync,
)

app = FastAPI(title="Audit AI API", version="1.0.0", description="PDF → BGE-M3 → NIM/Qwen per-control scoring")


def _audit_secret_matches(request: Request, secret: str) -> bool:
    """Accept Authorization: Bearer <secret>, or HF read token in Authorization + X-Audit-Secret: Bearer <secret>."""
    x = (request.headers.get("x-audit-secret") or "").strip()
    if x.startswith("Bearer "):
        x = x[7:].strip()
    if x and x == secret:
        return True
    auth = (request.headers.get("authorization") or "").strip()
    if auth.startswith("Bearer "):
        auth = auth[7:].strip()
    return auth == secret


class AuditBearerMiddleware(BaseHTTPMiddleware):
    """When AUDIT_API_SECRET is set, require Bearer secret or X-Audit-Secret (used when HF gateway holds hf_* in Authorization)."""

    async def dispatch(self, request: Request, call_next):
        secret = (os.environ.get("AUDIT_API_SECRET") or "").strip()
        if not secret:
            return await call_next(request)
        if request.method == "OPTIONS":
            return await call_next(request)
        path = request.url.path
        # Public root — HF / proxies may probe GET / (avoids noisy 404 in Space logs)
        if path in ("/", "/docs", "/redoc", "/openapi.json", "/favicon.ico"):
            return await call_next(request)
        if not _audit_secret_matches(request, secret):
            return JSONResponse({"detail": "Unauthorized"}, status_code=401)
        return await call_next(request)


# Order: CORS is added below (runs outer → OPTIONS first). Bearer sits inner.
app.add_middleware(AuditBearerMiddleware)

# Local dev: every port is a different origin (Live Server, Vite, etc.). Override with CORS_ORIGINS in prod.
_DEV_PORTS = (3000, 4000, 4173, 5000, 5173, 5500, 8000, 8080, 8081, 8888, 8787)
_DEV_HOSTS = ("127.0.0.1", "localhost")
_default_origins = ",".join(f"http://{h}:{p}" for h in _DEV_HOSTS for p in _DEV_PORTS)
_cors = os.environ.get("CORS_ORIGINS", _default_origins).strip()
_cors_list = [o.strip() for o in _cors.split(",") if o.strip()]
# Optional: allow any http(s) localhost port when developing (set CORS_LOCAL_REGEX=1)
_cors_regex = os.environ.get("CORS_LOCAL_REGEX", "1").strip().lower() in ("1", "true", "yes")
_origin_regex = r"https?://(127\.0\.0\.1|localhost)(:\d+)?" if _cors_regex else None
app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_list,
    allow_origin_regex=_origin_regex,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    """Minimal landing so Hugging Face / browser probes on `/` get 200 instead of 404."""
    return {
        "service": "audit-ai",
        "health": "/health",
        "docs": "/docs",
        "openapi": "/openapi.json",
    }


@app.get("/health")
def health():
    refresh_nim_client_from_env()
    d = audit_env_diag()
    return {
        "ok": True,
        "service": "audit-ai",
        "controls": len(CONTROLS),
        "frameworks": len(FRAMEWORK_IDS),
        "icaire_terms": len(ICAIRE_TERMS),
        "nim_configured": NIM_CLIENT is not None,
        "env": d,
    }


class EmbedBody(BaseModel):
    """JSON body for POST /api/v1/embed — same chunk texts produced by /api/v1/chunk."""

    chunks: list[str] = Field(default_factory=list, max_length=512)


@app.post("/api/v1/chunk")
async def api_chunk_pdf(file: UploadFile = File(...)):
    """
    Multipart: `file` = PDF. Returns structured chunks (text + page range), no embeddings.
    Hugging Face public URL base is https://<your-space-subdomain>.hf.space — not huggingface.co/spaces/…/api/…
    """
    suffix = Path(file.filename or "document.pdf").suffix.lower()
    if suffix != ".pdf":
        return JSONResponse({"ok": False, "error": "Only PDF files are supported."}, status_code=400)

    raw = await file.read()
    fd, tmp_path = tempfile.mkstemp(suffix=".pdf")
    try:
        os.write(fd, raw)
    finally:
        os.close(fd)

    try:
        out = pdf_file_to_chunks_dict(tmp_path)
        out["ok"] = True
        return out
    except ValueError as e:
        return JSONResponse({"ok": False, "error": str(e)}, status_code=400)
    finally:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass


@app.post("/api/v1/embed")
async def api_embed_chunks(body: EmbedBody):
    """JSON: `{ \"chunks\": [\"text\", ...] }` — BGE-M3 vectors (same model as full audit)."""
    if not body.chunks:
        return JSONResponse({"ok": False, "error": "Provide a non-empty chunks array."}, status_code=400)
    try:
        out = embed_plain_texts_api(body.chunks)
        out["ok"] = True
        return out
    except Exception as e:
        return JSONResponse({"ok": False, "error": f"{type(e).__name__}: {e}"}, status_code=500)


@app.post("/api/v1/audit/run")
async def audit_run(
    file: UploadFile = File(...),
    doc_type: str = Form(...),
    frameworks: str = Form(...),
):
    """
    Multipart form:
      file: PDF
      doc_type: plan | policy | system
      frameworks: JSON array of framework_id strings, e.g. ["oecd","unesco"]
    """
    try:
        selected = json.loads(frameworks)
    except json.JSONDecodeError:
        return {"ok": False, "error": "Invalid frameworks JSON", "markdown": "", "audit": None}

    if not isinstance(selected, list) or not selected:
        return {"ok": False, "error": "Select at least one framework.", "markdown": "", "audit": None}

    suffix = Path(file.filename or "document.pdf").suffix.lower()
    if suffix != ".pdf":
        return {"ok": False, "error": "Only PDF files are supported.", "markdown": "", "audit": None}

    raw = await file.read()
    fd, tmp_path = tempfile.mkstemp(suffix=".pdf")
    try:
        os.write(fd, raw)
    finally:
        os.close(fd)

    try:

        def _progress(p, desc=None, **kwargs):
            pass

        md, audit = await asyncio.to_thread(
            run_audit_sync, tmp_path, doc_type, selected, _progress
        )
        return {"ok": True, "error": None, "markdown": md, "audit": audit}
    except ValueError as e:
        return {"ok": False, "error": str(e), "markdown": "", "audit": None}
    except RuntimeError as e:
        return {"ok": False, "error": str(e), "markdown": "", "audit": None}
    except Exception as e:
        return {"ok": False, "error": f"{type(e).__name__}: {e}", "markdown": "", "audit": None}
    finally:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass


@app.post("/api/v1/audit/run/stream")
async def audit_run_stream(
    file: UploadFile = File(...),
    doc_type: str = Form(...),
    frameworks: str = Form(...),
):
    """
    Same inputs as /api/v1/audit/run; returns Server-Sent Events (SSE) with progress
    (including BGE-M3 batch embedding) and a final JSON line with markdown + audit.
    """
    try:
        selected = json.loads(frameworks)
    except json.JSONDecodeError:
        return JSONResponse(
            {"ok": False, "error": "Invalid frameworks JSON", "markdown": "", "audit": None},
            status_code=400,
        )

    if not isinstance(selected, list) or not selected:
        return JSONResponse(
            {"ok": False, "error": "Select at least one framework.", "markdown": "", "audit": None},
            status_code=400,
        )

    suffix = Path(file.filename or "document.pdf").suffix.lower()
    if suffix != ".pdf":
        return JSONResponse(
            {"ok": False, "error": "Only PDF files are supported.", "markdown": "", "audit": None},
            status_code=400,
        )

    raw = await file.read()
    fd, tmp_path = tempfile.mkstemp(suffix=".pdf")
    try:
        os.write(fd, raw)
    finally:
        os.close(fd)

    progress_q: queue.Queue = queue.Queue()

    def on_progress(p, desc=None, **kwargs):
        phase = kwargs.get("phase") or "run"
        progress_q.put(
            {
                "event": "progress",
                "pct": float(p),
                "message": desc or "",
                "phase": str(phase),
            }
        )

    def worker():
        try:
            md, audit = run_audit_sync(tmp_path, doc_type, selected, on_progress)
            progress_q.put({"event": "complete", "ok": True, "markdown": md, "audit": audit})
        except (ValueError, RuntimeError) as e:
            progress_q.put({"event": "complete", "ok": False, "error": str(e)})
        except Exception as e:
            progress_q.put({"event": "complete", "ok": False, "error": f"{type(e).__name__}: {e}"})
        finally:
            progress_q.put(None)

    thread = threading.Thread(target=worker, daemon=True)
    thread.start()

    async def event_stream():
        try:
            while True:
                item = await asyncio.to_thread(progress_q.get)
                if item is None:
                    break
                yield "data: " + json.dumps(item, ensure_ascii=False) + "\n\n"
        finally:
            thread.join(timeout=7200.0)
            try:
                os.unlink(tmp_path)
            except OSError:
                pass

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


# For `uvicorn main:app` with cwd = backend/
