/**
 * Client-side lexical RAG over data/rag_terms_index.json (en | ar | fr retrieval_text).
 * Loads once; retrieveTopK scores query tokens against retrieval_text_lower.
 */
(function (global) {
  let cachedTerms = null;
  let loadPromise = null;

  const INDEX_URL = 'data/rag_terms_index.json';

  function tokenizeQuery(text) {
    if (!text) return [];
    const s = String(text).toLowerCase();
    const out = new Set();
    const re = /[\w\u0600-\u06FF]{2,}/g;
    let m;
    while ((m = re.exec(s)) !== null) out.add(m[0]);
    s.split(/\s+/).forEach((w) => {
      const t = w.replace(/[^\w\u0600-\u06FF]+/g, '');
      if (t.length >= 2) out.add(t);
    });
    return Array.from(out);
  }

  function scoreRecord(rec, tokens) {
    const hay = rec.retrieval_text_lower || '';
    if (!hay) return 0;
    let score = 0;
    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i];
      if (!tok || tok.length < 2) continue;
      if (!hay.includes(tok)) continue;
      let n = 0;
      let pos = 0;
      while (true) {
        const idx = hay.indexOf(tok, pos);
        if (idx === -1) break;
        n++;
        pos = idx + Math.max(1, tok.length);
        if (n > 4) break;
      }
      score += Math.min(4, n) * (1 + Math.min(tok.length, 12) * 0.03);
    }
    return score;
  }

  function loadIndex(url) {
    const u = url || INDEX_URL;
    if (cachedTerms) return Promise.resolve(cachedTerms);
    if (loadPromise) return loadPromise;
    loadPromise = fetch(u)
      .then((r) => {
        if (!r.ok) throw new Error('RAG index fetch failed: ' + r.status);
        return r.json();
      })
      .then((data) => {
        cachedTerms = data.terms || [];
        return cachedTerms;
      })
      .catch((e) => {
        loadPromise = null;
        throw e;
      });
    return loadPromise;
  }

  function retrieveTopK(query, terms, k) {
    const pool = terms && terms.length ? terms : cachedTerms || [];
    if (!pool.length || !query) return [];
    const kk = Math.max(1, k || 25);
    const tokens = tokenizeQuery(query);
    if (!tokens.length) return pool.slice(0, kk);
    const scored = pool.map((rec) => ({ rec, s: scoreRecord(rec, tokens) }));
    scored.sort((a, b) => b.s - a.s);
    const positive = scored.filter((x) => x.s > 0);
    if (positive.length === 0) return pool.slice(0, kk);
    return positive.slice(0, kk).map((x) => x.rec);
  }

  /** Plain-text block for system prompt (trilingual rows). */
  function formatRagContext(records) {
    if (!records || !records.length) return '';
    const lines = records.map((r, i) => {
      const en = r.english_term || '';
      const ar = r.arabic_term || '';
      const fr = r.french_term || '';
      return `${i + 1}. EN: ${en} | AR: ${ar} | FR: ${fr}`;
    });
    return [
      'Retrieved canonical term triplets from the ICAIRE glossary (term-only index). Prefer these Arabic labels when they fit the user meaning.',
      '---',
      ...lines,
      '---'
    ].join('\n');
  }

  function clearCache() {
    cachedTerms = null;
    loadPromise = null;
  }

  global.RagRetrieval = {
    loadIndex,
    retrieveTopK,
    formatRagContext,
    tokenizeQuery,
    clearCache
  };
})(typeof window !== 'undefined' ? window : this);
