# Audit AI API — Hugging Face Spaces (Docker SDK).
# This folder is the Space repo root (push contents to HF Space `audit-proxy`).
#
# Local test:  docker build -t audit-api . && docker run -p 7860:7860 -e NVIDIA_API_KEY=... audit-api

FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

COPY backend /app/backend

COPY data/datasets/AI-Audit-frameworks-embedded /app/data/datasets/AI-Audit-frameworks-embedded

WORKDIR /app/backend

ENV PYTHONUNBUFFERED=1
ENV PORT=7860

EXPOSE 7860

CMD ["sh", "-c", "exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-7860}"]
