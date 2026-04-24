/**
 * Rewrite-with-correction view: RAG (lexical) over data/rag_terms_index.json, then NVIDIA streaming.
 * Mount once; call applyLabels(dict) from setLanguage.
 */
(function (global) {
  const MODEL = 'deepseek-ai/deepseek-v3';
  const API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
  const RAG_TOP_K = 28;

  let state = {
    apiKey: '',
    terms: [],
    ragTerms: null,
    getLang: function () { return 'en'; }
  };

  function buildSystemPrompt(ragContextBlock) {
    const rag = ragContextBlock && ragContextBlock.trim()
      ? ragContextBlock.trim()
      : 'No glossary index was loaded; align Arabic AI/ML wording with standard usage.';
    return [
      'You are an Arabic technical editor for an ML/AI glossary (ICAIRE).',
      'The user pastes Arabic text about AI/ML.',
      '',
      rag,
      '',
      'Tasks: (1) Note where the user text can align with the retrieved EN | AR | FR triplets (use AR column for canonical Arabic when it matches the meaning).',
      '(2) Suggest fixes for non-standard or inconsistent phrasing.',
      '(3) Output a revised Arabic paragraph; short English glosses in parentheses are allowed.',
      'If a retrieved term does not fit the sentence meaning, do not force it.'
    ].join('\n');
  }

  function mount(root, opts) {
    if (!root || root.dataset.mounted === '1') return;
    state.apiKey = (opts && opts.apiKey) || '';
    state.terms = (opts && opts.terms) || [];
    state.getLang = (opts && opts.getLang) || function () { return 'en'; };
    state.ragTerms = null;

    root.innerHTML = `
<div class="view-header">
  <h2 id="rewrite-view-h2">Rewrite with correction</h2>
  <p id="rewrite-view-p">Paste Arabic AI/ML text. Matching glossary triplets (en|ar|fr) are retrieved, then the model revises the text (streaming).</p>
</div>
<div class="rewrite-toolbar" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;align-items:center;">
  <button type="button" class="btn primary" id="rewrite-run-btn" style="width:auto;">Run</button>
  <button type="button" class="btn" id="rewrite-clear-btn" style="width:auto;">Clear</button>
  <span id="rewrite-status" style="font-size:12px;color:var(--text-secondary);"></span>
</div>
<div class="rewrite-grid">
  <div class="rewrite-pane">
    <div class="pane-head">
      <h4 id="rewrite-before-h">Before</h4>
    </div>
    <textarea id="rewrite-input" class="rewrite-textarea" dir="rtl" rows="14" style="width:100%;box-sizing:border-box;padding:12px;border-radius:var(--radius-lg);border:0.5px solid var(--border);background:var(--surface);color:inherit;font-family:var(--font-ar);font-size:14px;line-height:1.6;resize:vertical;" placeholder=""></textarea>
  </div>
  <div class="rewrite-pane">
    <div class="pane-head">
      <h4 id="rewrite-after-h">After · model output</h4>
    </div>
    <div id="rewrite-output" class="pane-body" dir="rtl" style="min-height:280px;white-space:pre-wrap;font-family:var(--font-ar);font-size:14px;line-height:1.7;color:var(--text);"></div>
    <div class="pane-footer" id="rewrite-footer-hint" style="font-size:11px;color:var(--text-tertiary);"></div>
  </div>
</div>`;

    root.dataset.mounted = '1';

    if (global.RagRetrieval && typeof global.RagRetrieval.loadIndex === 'function') {
      global.RagRetrieval.loadIndex().then(function (terms) {
        state.ragTerms = terms;
      }).catch(function () {
        state.ragTerms = [];
      });
    }

    const runBtn = root.querySelector('#rewrite-run-btn');
    const clearBtn = root.querySelector('#rewrite-clear-btn');
    const input = root.querySelector('#rewrite-input');
    const output = root.querySelector('#rewrite-output');
    const statusEl = root.querySelector('#rewrite-status');

    clearBtn.addEventListener('click', () => {
      if (input) input.value = '';
      if (output) output.textContent = '';
      if (statusEl) statusEl.textContent = '';
    });

    runBtn.addEventListener('click', async () => {
      const text = (input && input.value) ? input.value.trim() : '';
      if (!text) {
        if (statusEl) statusEl.textContent = state._labels ? state._labels.rewrite_need_text : 'Paste text first.';
        return;
      }
      if (!state.apiKey) {
        if (statusEl) statusEl.textContent = 'API key not configured.';
        return;
      }
      output.textContent = '';
      runBtn.disabled = true;
      const labels = state._labels || {};
      if (statusEl) statusEl.textContent = labels.rewrite_matching_glossary || 'Matching glossary…';

      let ragTerms = state.ragTerms;
      if (global.RagRetrieval && typeof global.RagRetrieval.loadIndex === 'function') {
        try {
          if (!ragTerms || !ragTerms.length) {
            ragTerms = await global.RagRetrieval.loadIndex();
            state.ragTerms = ragTerms;
          }
        } catch (e) {
          ragTerms = [];
        }
      } else {
        ragTerms = [];
      }

      let ragBlock = '';
      if (ragTerms && ragTerms.length && global.RagRetrieval) {
        const retrieved = global.RagRetrieval.retrieveTopK(text, ragTerms, RAG_TOP_K);
        ragBlock = global.RagRetrieval.formatRagContext(retrieved);
      }

      const system = buildSystemPrompt(ragBlock);
      const userContent = 'النص:\n\n' + text;

      if (statusEl) statusEl.textContent = labels.rewrite_streaming || '…';

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.apiKey
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [
              { role: 'system', content: system },
              { role: 'user', content: userContent }
            ],
            temperature: 0.4,
            max_tokens: 4096,
            stream: true
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(errText || response.statusText);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const dataStr = line.slice(6);
            if (dataStr === '[DONE]') break;
            try {
              const data = JSON.parse(dataStr);
              const delta = data.choices && data.choices[0] && data.choices[0].delta;
              if (delta && delta.content) output.textContent += delta.content;
            } catch (e) { /* partial JSON */ }
          }
        }
        if (statusEl) statusEl.textContent = labels.rewrite_done || 'Done';
      } catch (e) {
        output.textContent = (labels.rewrite_err) ? labels.rewrite_err + e.message : ('Error: ' + e.message);
        if (statusEl) statusEl.textContent = '';
      } finally {
        runBtn.disabled = false;
      }
    });
  }

  function applyLabels(dict) {
    state._labels = dict;
    const root = document.getElementById('rewrite-tool-root');
    if (!root) return;
    const h2 = root.querySelector('#rewrite-view-h2');
    const p = root.querySelector('#rewrite-view-p');
    const b = root.querySelector('#rewrite-before-h');
    const a = root.querySelector('#rewrite-after-h');
    const ph = root.querySelector('#rewrite-input');
    const run = root.querySelector('#rewrite-run-btn');
    const clr = root.querySelector('#rewrite-clear-btn');
    const foot = root.querySelector('#rewrite-footer-hint');
    if (h2 && dict.rewrite_view_h) h2.textContent = dict.rewrite_view_h;
    if (p && dict.rewrite_view_p) p.textContent = dict.rewrite_view_p;
    if (b && dict.rewrite_before_h) b.textContent = dict.rewrite_before_h;
    if (a && dict.rewrite_after_h) a.textContent = dict.rewrite_after_h;
    if (ph && dict.rewrite_placeholder) ph.setAttribute('placeholder', dict.rewrite_placeholder);
    if (run && dict.rewrite_run) run.textContent = dict.rewrite_run;
    if (clr && dict.rewrite_clear) clr.textContent = dict.rewrite_clear;
    if (foot && dict.rewrite_footer_hint) foot.textContent = dict.rewrite_footer_hint;
  }

  global.RewriteToolView = { mount, applyLabels };
})(typeof window !== 'undefined' ? window : this);
