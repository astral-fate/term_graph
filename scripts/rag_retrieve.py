#!/usr/bin/env python3
"""
Offline lexical RAG demo: same idea as js/rag-retrieval.js — score query tokens
against data/rag_terms_index.json (retrieval_text_lower).

Usage:
  py scripts/rag_retrieve.py "الشبكات العصبية والتعلم العميق" --k 15
  py scripts/rag_retrieve.py "neural network" --k 10 --log logs/my_run.log
"""

from __future__ import annotations

import argparse
import json
import re
import unicodedata
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parent.parent
INDEX_PATH = REPO_ROOT / "data" / "rag_terms_index.json"


def norm_token(s: str) -> str:
    t = unicodedata.normalize("NFKC", s).strip().lower()
    return re.sub(r"\s+", " ", t)


def tokenize_query(text: str) -> list[str]:
    if not text:
        return []
    s = norm_token(text)
    out: set[str] = set()
    for m in re.finditer(r"[\w\u0600-\u06FF]{2,}", s):
        out.add(m.group(0))
    for w in s.split():
        w = re.sub(r"[^\w\u0600-\u06FF]+", "", w)
        if len(w) >= 2:
            out.add(w)
    return list(out)


def score_record(rec: dict, tokens: list[str]) -> float:
    hay = rec.get("retrieval_text_lower") or ""
    if not hay:
        return 0.0
    score = 0.0
    for tok in tokens:
        if len(tok) < 2:
            continue
        if tok not in hay:
            continue
        n = 0
        pos = 0
        while True:
            idx = hay.find(tok, pos)
            if idx < 0:
                break
            n += 1
            pos = idx + max(1, len(tok))
            if n > 4:
                break
        score += min(4, n) * (1 + min(len(tok), 12) * 0.03)
    return score


def retrieve_top_k(query: str, terms: list[dict], k: int) -> list[dict]:
    if not terms or not query:
        return []
    tokens = tokenize_query(query)
    if not tokens:
        return terms[:k]
    scored = [(score_record(r, tokens), r) for r in terms]
    scored.sort(key=lambda x: x[0], reverse=True)
    positive = [(s, r) for s, r in scored if s > 0]
    if not positive:
        return terms[:k]
    return [r for _, r in positive[:k]]


def main() -> None:
    import sys
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except Exception:
            pass

    ap = argparse.ArgumentParser(description="Lexical RAG retrieve demo over rag_terms_index.json")
    ap.add_argument("query", help="User text (Arabic / English / mixed)")
    ap.add_argument("--k", type=int, default=15, help="Number of terms to return")
    ap.add_argument("--json", action="store_true", help="Print JSON instead of lines")
    ap.add_argument(
        "--log",
        metavar="PATH",
        help="Write the same output to this file as UTF-8 (avoids Windows console/pipe mojibake)",
    )
    args = ap.parse_args()

    if not INDEX_PATH.is_file():
        raise SystemExit(f"Missing index: {INDEX_PATH}\nRun: py scripts/build_rag_terms_index.py")

    data = json.loads(INDEX_PATH.read_text(encoding="utf-8"))
    terms = data.get("terms") or []
    hits = retrieve_top_k(args.query, terms, args.k)

    if args.json:
        out = json.dumps(hits, ensure_ascii=False, indent=2) + "\n"
        print(out, end="")
        if args.log:
            lp = Path(args.log)
            lp.parent.mkdir(parents=True, exist_ok=True)
            lp.write_text(out, encoding="utf-8")
        return

    lines = [
        f"Query: {args.query!r}",
        f"Top {len(hits)} hits (requested k={args.k}):",
        "",
    ]
    for i, r in enumerate(hits, 1):
        lines.append(f"{i:2}. {r.get('retrieval_text', '')}")
    text = "\n".join(lines) + "\n"
    print(text, end="")
    if args.log:
        lp = Path(args.log)
        lp.parent.mkdir(parents=True, exist_ok=True)
        lp.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    main()
