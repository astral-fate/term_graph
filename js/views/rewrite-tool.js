/**
 * Rewrite-with-correction view: RAG (lexical) over data/rag_terms_index.json, then NVIDIA streaming.
 * Mount once; call applyLabels(dict) from setLanguage.
 */
(function (global) {
  /** NVIDIA Integrate OpenAI-compatible model id (same as Python OpenAI base_url integrate host). */
  const MODEL = 'qwen/qwen3-coder-480b-a35b-instruct';
  const RAG_TOP_K = 28;

  /** Always same-origin (Pages Function). Never call NVIDIA's integrate chat URL from the browser — CORS will block. */
  function chatApiUrl() {
    try {
      if (typeof location !== 'undefined' && location.origin && location.protocol !== 'file:') {
        return new URL('/api/v1/chat/completions', location.origin).href;
      }
    } catch (e) {}
    return '/api/v1/chat/completions';
  }

  let state = {
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
    state.terms = (opts && opts.terms) || [];
    state.getLang = (opts && opts.getLang) || function () { return 'en'; };
    state.ragTerms = null;

    root.innerHTML = `
<div class="view-header">
  <h2 id="rewrite-view-h2">Rewrite with correction</h2>
  <p id="rewrite-view-p">Paste Arabic AI/ML text. Matching glossary triplets (en|ar|fr) are retrieved, then the model revises the text (streaming).</p>
</div>

<section class="rewrite-admin-reference" aria-label="Illustrative UI template">
  <div class="rewrite-ref-banner">
    <span id="rewrite-ref-kicker">Design reference · admin template (illustrative)</span>
  </div>
  <div class="rewrite-grid">
    <div class="rewrite-pane rewrite-pane--ref">
      <div class="pane-head">
        <h4 id="rewrite-ref-h-before">Before · original text</h4>
        <span id="rewrite-ref-mock-flags" class="rewrite-ref-badge rewrite-ref-badge--warn">4 flags</span>
      </div>
      <div class="pane-body">
        <p>تستخدم الشبكات <span class="flag" title="Non-canonical · suggest: الشبكات العصبية">العصبونية</span> تقنية <span class="flag" title="Non-canonical · suggest: الانحدار التدريجي">الدفع المتدرج</span> لتدريب النموذج.</p>
        <p>كما أنّ <span class="flag" title="Non-canonical · suggest: التعلم غير الخاضع للإشراف">التعلم غير الموجه</span> يُستخدم لاكتشاف الأنماط من البيانات دون تسميات.</p>
        <p>الـ<span class="flag" title="Untranslated · suggest: نموذج اللغة الكبير">LLM</span> قد يُنتج هلوسات عند غياب البيانات الكافية.</p>
      </div>
      <div class="pane-footer">
        <span class="dot-indicator" style="background: var(--amber);"></span>
        <span id="rewrite-ref-footer-before">4 terms flagged · 3 non-canonical, 1 untranslated</span>
      </div>
    </div>
    <div class="rewrite-pane rewrite-pane--ref">
      <div class="pane-head">
        <h4 id="rewrite-ref-h-after">After · ICAIRE canonical</h4>
        <span id="rewrite-ref-mock-fixed" class="rewrite-ref-badge rewrite-ref-badge--ok">✓ 4 fixes applied</span>
      </div>
      <div class="pane-body">
        <p>تستخدم <span class="fix">الشبكات العصبية</span> تقنية <span class="fix">الانحدار التدريجي</span> لتدريب النموذج.</p>
        <p>كما أنّ <span class="fix">التعلم غير الخاضع للإشراف</span> يُستخدم لاكتشاف الأنماط من البيانات دون تسميات.</p>
        <p>الـ<span class="fix">نموذج اللغة الكبير</span> قد يُنتج هلوسات عند غياب البيانات الكافية.</p>
      </div>
      <div class="pane-footer">
        <span class="dot-indicator" style="background: var(--teal);"></span>
        <span id="rewrite-ref-footer-after">All terms aligned with ICAIRE glossary</span>
      </div>
    </div>
  </div>
  <div class="rewrite-ref-actions">
    <div class="rewrite-ref-actions-row">
      <button type="button" class="btn" style="width:auto;" id="rewrite-ref-btn-changelog" disabled title="Template only">View change log</button>
      <button type="button" class="btn" style="width:auto;" id="rewrite-ref-btn-export" disabled title="Template only">Export .docx</button>
      <button type="button" class="btn" style="width:auto;" id="rewrite-ref-btn-report" disabled title="Template only">Consistency report</button>
      <button type="button" class="btn primary" style="width:auto;" id="rewrite-ref-btn-apply" disabled title="Template only">Apply all fixes</button>
    </div>
    <p id="rewrite-ref-actions-note" class="rewrite-ref-actions-note">Demo actions — inactive (template only).</p>
  </div>
</section>

<div class="rewrite-live-region">
  <h3 id="rewrite-live-heading" class="rewrite-live-heading">Try your own text</h3>
  <p id="rewrite-live-sub" class="rewrite-live-sub">Paste a paragraph below, then Run for streamed output (RAG + NVIDIA proxy).</p>
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
        const response = await fetch(chatApiUrl(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
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
        const msg = e && typeof e.message === 'string' ? e.message : String(e);
        output.textContent = (labels.rewrite_err) ? labels.rewrite_err + msg : ('Error: ' + msg);
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

    const rk = root.querySelector('#rewrite-ref-kicker');
    if (rk && dict.rewrite_ref_kicker) rk.textContent = dict.rewrite_ref_kicker;
    const rb = root.querySelector('#rewrite-ref-h-before');
    if (rb && dict.rewrite_ref_h_before) rb.textContent = dict.rewrite_ref_h_before;
    const ra = root.querySelector('#rewrite-ref-h-after');
    if (ra && dict.rewrite_ref_h_after) ra.textContent = dict.rewrite_ref_h_after;
    const rf = root.querySelector('#rewrite-ref-mock-flags');
    if (rf && dict.rewrite_ref_mock_flags) rf.textContent = dict.rewrite_ref_mock_flags;
    const rx = root.querySelector('#rewrite-ref-mock-fixed');
    if (rx && dict.rewrite_ref_mock_fixed) rx.textContent = dict.rewrite_ref_mock_fixed;
    const rfb = root.querySelector('#rewrite-ref-footer-before');
    if (rfb && dict.rewrite_ref_mock_footer_before) rfb.textContent = dict.rewrite_ref_mock_footer_before;
    const rfa = root.querySelector('#rewrite-ref-footer-after');
    if (rfa && dict.rewrite_ref_mock_footer_after) rfa.textContent = dict.rewrite_ref_mock_footer_after;
    const b1 = root.querySelector('#rewrite-ref-btn-changelog');
    if (b1 && dict.rewrite_ref_btn_changelog) b1.textContent = dict.rewrite_ref_btn_changelog;
    const b2 = root.querySelector('#rewrite-ref-btn-export');
    if (b2 && dict.rewrite_ref_btn_export) b2.textContent = dict.rewrite_ref_btn_export;
    const b3 = root.querySelector('#rewrite-ref-btn-report');
    if (b3 && dict.rewrite_ref_btn_report) b3.textContent = dict.rewrite_ref_btn_report;
    const b4 = root.querySelector('#rewrite-ref-btn-apply');
    if (b4 && dict.rewrite_ref_btn_apply) b4.textContent = dict.rewrite_ref_btn_apply;
    const rn = root.querySelector('#rewrite-ref-actions-note');
    if (rn && dict.rewrite_ref_actions_note) rn.textContent = dict.rewrite_ref_actions_note;
    const lh = root.querySelector('#rewrite-live-heading');
    if (lh && dict.rewrite_live_heading) lh.textContent = dict.rewrite_live_heading;
    const ls = root.querySelector('#rewrite-live-sub');
    if (ls && dict.rewrite_live_sub) ls.textContent = dict.rewrite_live_sub;
  }

  global.RewriteToolView = { mount, applyLabels };
})(typeof window !== 'undefined' ? window : this);
