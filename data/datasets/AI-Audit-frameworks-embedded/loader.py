"""Mustalih Auditor — embedded dataset loader.

Three-line usage:

    from huggingface_hub import snapshot_download
    path = snapshot_download(repo_id="FatimahEmadEldin/mustalih-frameworks-embedded", repo_type="dataset")
    bundle = load(path)
"""
from __future__ import annotations
import json, os
from pathlib import Path
from typing import Any
import numpy as np


def load(local_dir: str | os.PathLike) -> dict[str, Any]:
    """Load the full embedded bundle from a local directory.

    Returns a dict with keys:
        controls          list[dict]
        icaire_terms      list[dict]
        ctrl_embeddings   np.ndarray  (N_controls, D)
        term_embeddings   np.ndarray  (N_terms, D)
        metadata          dict
    """
    p = Path(local_dir)
    with (p / "controls.json").open(encoding="utf-8") as f:
        controls = json.load(f)["controls"]
    with (p / "icaire_terms.json").open(encoding="utf-8") as f:
        terms = json.load(f)["terms"]
    ctrl_emb = np.load(p / "ctrl_embeddings.npy")
    term_emb = np.load(p / "term_embeddings.npy")
    with (p / "embeddings_metadata.json").open(encoding="utf-8") as f:
        meta = json.load(f)
    assert ctrl_emb.shape[0] == len(controls), "ctrl_embeddings vs controls misaligned"
    assert term_emb.shape[0] == len(terms), "term_embeddings vs terms misaligned"
    return {
        "controls": controls,
        "icaire_terms": terms,
        "ctrl_embeddings": ctrl_emb,
        "term_embeddings": term_emb,
        "metadata": meta,
    }


def top_k_terms_for_query(query_embedding: np.ndarray, bundle: dict, k: int = 8) -> list[dict]:
    """Given a single normalized query vector, return the top-k ICAIRE terms by cosine similarity."""
    sims = bundle["term_embeddings"] @ query_embedding
    idx = np.argsort(-sims)[:k]
    return [{**bundle["icaire_terms"][i], "similarity": float(sims[i])} for i in idx]


def top_k_controls_for_query(query_embedding: np.ndarray, bundle: dict, k: int = 8,
                             frameworks: list[str] | None = None) -> list[dict]:
    """Given a single normalized query vector, return the top-k controls by cosine similarity.
    Optionally restrict to a subset of frameworks."""
    sims = bundle["ctrl_embeddings"] @ query_embedding
    if frameworks:
        mask = np.array([c["framework_id"] in frameworks for c in bundle["controls"]])
        sims = np.where(mask, sims, -np.inf)
    idx = np.argsort(-sims)[:k]
    return [{**bundle["controls"][i], "similarity": float(sims[i])} for i in idx]
