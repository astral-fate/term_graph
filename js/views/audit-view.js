/**
 * Audit AI — FastAPI (`backend/main.py`): BGE-M3 + NIM. UI inspired by Mustalih Auditor mock; data from live API JSON.
 */
(function (global) {
  let frameworksList = [];
  let selectedFrameworks = new Set();

  function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }

  /**
   * Remote proxy (HTTPS Pages → `/api/v1/audit-remote/*` → Hugging Face FastAPI; token only on Cloudflare).
   * Overrides: localStorage `mustalih_audit_api`, then `MUSTALIH_AUDIT_API`, then mode / localhost / edge.
   */
  function auditUseRemoteProxy() {
    try {
      if (localStorage.getItem('mustalih_audit_api')) return false;
    } catch (e) {}
    if (typeof global.MUSTALIH_AUDIT_API === 'string' && global.MUSTALIH_AUDIT_API.trim()) return false;
    if (global.MUSTALIH_AUDIT_MODE === 'local') return false;
    if (global.MUSTALIH_AUDIT_MODE === 'proxy') return true;
    /* Local Wrangler + .dev.vars: localStorage.mustalih_hf_proxy = "1" → same-origin /api/v1/audit-remote → HF */
    try {
      if (localStorage.getItem('mustalih_hf_proxy') === '1') return true;
    } catch (e) {}
    try {
      const loc = global.location;
      const h = loc.hostname || '';
      if (loc.protocol === 'https:' && (h.endsWith('.pages.dev') || h.endsWith('.cloudflarepages.app')))
        return true;
    } catch (e) {}
    return false;
  }

  function auditApiBase() {
    try {
      const u = localStorage.getItem('mustalih_audit_api');
      if (u && u.trim()) return u.replace(/\/$/, '');
    } catch (e) {}
    if (typeof global.MUSTALIH_AUDIT_API === 'string' && global.MUSTALIH_AUDIT_API.trim()) {
      return global.MUSTALIH_AUDIT_API.replace(/\/$/, '');
    }
    if (auditUseRemoteProxy()) return '';

    try {
      const loc = global.location;
      const h = loc.hostname || '';
      const p = String(loc.port || '');
      const loop = h === 'localhost' || h === '127.0.0.1';
      /* `npm run dev` → wrangler pages dev on :8788 serves dist + Functions (edge audit SSE); no uvicorn. */
      if (loop && p === '8788') return '';
    } catch (e) {}

    try {
      const loc = global.location;
      if (global.MUSTALIH_EDGE_AUDIT === true) {
        const h = loc.hostname || '';
        const p = String(loc.port || '');
        const loop = h === 'localhost' || h === '127.0.0.1';
        if (loc.protocol === 'https:' && h !== 'localhost' && h !== '127.0.0.1') return '';
        if (loop && p === '8788') return '';
        if (loc.protocol === 'https:') return '';
      }
    } catch (e) {}

    return 'http://127.0.0.1:8788';
  }

  function auditHealthUrl(base) {
    const b = base || '';
    if (auditUseRemoteProxy()) return b + '/api/v1/audit-remote/health';
    return b + '/health';
  }

  function auditStreamUrl(base) {
    const b = base || '';
    if (auditUseRemoteProxy()) return b + '/api/v1/audit-remote/stream';
    return b + '/api/v1/audit/run/stream';
  }

  function isUpstreamConfigError(status, errRaw) {
    if (status === 503) return true;
    const s = (errRaw || '').toLowerCase();
    return (
      s.includes('audit_upstream') ||
      s.includes('.dev.vars') ||
      s.includes('configure audit') ||
      s.includes('environment variables')
    );
  }

  /** Single-language message — avoids English API text + Arabic suffix mismatch. */
  function formatAuditHttpError(status, data, dict) {
    const raw = data && (data.error || data.message) ? String(data.error || data.message) : '';
    if (isUpstreamConfigError(status, raw)) {
      return t(dict, 'audit_upstream_not_configured', 'Server unavailable.');
    }
    const errText = raw || t(dict, 'audit_err', 'Audit failed.');
    return errText + ' ' + t(dict, 'audit_try_offline', 'Try Offline demo only — not real scoring.');
  }

  function t(dict, key, fallback) {
    if (!dict) return fallback;
    const v = dict[key];
    return v != null ? v : fallback;
  }

  function dictFromWindow() {
    return typeof window !== 'undefined' && window.__mustalih_ui_dict ? window.__mustalih_ui_dict : {};
  }

  function hashSeed(parts) {
    const s = parts.join('|');
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return Math.abs(h) >>> 0;
  }

  function frameworkLabel(fw, lang) {
    if (!fw) return '';
    if (lang === 'ar') return fw.framework_name_ar || fw.framework_name_en || fw.framework_id;
    if (lang === 'fr') return fw.framework_name_en || fw.framework_id;
    return fw.framework_name_en || fw.framework_id;
  }

  /** Deterministic demo — not real LLM scoring. */
  function buildLocalAudit(doc_type, frameworkIds, fileName, dict, lang) {
    const seed = hashSeed([doc_type, frameworkIds.sort().join(','), fileName || 'doc.pdf']);
    let rng = seed;
    const tick = () => {
      rng = (rng * 1103515245 + 12345) % 2147483648;
      return rng / 2147483648;
    };

    const approxControlsPerFw = { oecd: 130, nist_interop: 120, unesco: 140, oecd_principles: 129 };
    let totalEval = 0;
    frameworkIds.forEach((fid) => {
      totalEval += approxControlsPerFw[fid] || 100;
    });

    let met = 0;
    let partial = 0;
    let not_met = 0;
    let na = 0;
    for (let i = 0; i < totalEval; i++) {
      const r = tick();
      if (r < 0.22) met++;
      else if (r < 0.48) partial++;
      else if (r < 0.82) not_met++;
      else na++;
    }

    const scoreable = met + partial + not_met;
    const overall =
      scoreable > 0 ? Math.round((100 * (met + 0.5 * partial)) / scoreable) : 0;

    const byFw = [];
    frameworkIds.forEach((fid) => {
      const fw = frameworksList.find((f) => f.framework_id === fid);
      const n = approxControlsPerFw[fid] || 100;
      let m = 0,
        p = 0,
        nm = 0,
        x = 0;
      for (let i = 0; i < n; i++) {
        const r = tick();
        if (r < 0.22) m++;
        else if (r < 0.48) p++;
        else if (r < 0.82) nm++;
        else x++;
      }
      const sp = m + p + nm;
      const sc = sp > 0 ? Math.round((100 * (m + 0.5 * p)) / sp) : 0;
      byFw.push({
        framework_id: fid,
        framework_name_en: fw ? fw.framework_name_en : fid,
        score: sc,
        counts: { met: m, partial: p, not_met: nm, na: x },
      });
    });

    const label =
      overall >= 75
        ? t(dict, 'audit_label_strong', 'strong compliance posture')
        : overall >= 50
          ? t(dict, 'audit_label_mid', 'developing compliance')
          : t(dict, 'audit_label_weak', 'significant gaps');

    const lines = [];
    lines.push(`# ${t(dict, 'audit_md_offline', 'Offline demo')} — ${label}`);
    lines.push(`_${fileName} · ${totalEval} ${t(dict, 'audit_md_controls', 'controls evaluated')}_`);
    lines.push('');
    lines.push(`## ${t(dict, 'audit_md_overall', 'Overall')}`);
    lines.push(`- **${t(dict, 'audit_md_score_word', 'Overall score')}:** ${overall}/100`);
    lines.push(
      `- ${t(dict, 'audit_md_met', 'Met')}: ${met}  ${t(dict, 'audit_md_partial', 'Partial')}: ${partial}  ${t(dict, 'audit_md_not_met', 'Not met')}: ${not_met}  ${t(dict, 'audit_md_na', 'N/A')}: ${na}`
    );
    lines.push('');
    lines.push(`## ${t(dict, 'audit_md_by_fw', 'Score by framework')}`);
    byFw.forEach((fw) => {
      const nm = frameworksList.find((f) => f.framework_id === fw.framework_id);
      const title =
        lang === 'ar' && nm
          ? nm.framework_name_ar || nm.framework_name_en
          : nm
            ? nm.framework_name_en
            : fw.framework_id;
      const c = fw.counts;
      lines.push(`### ${title} — ${fw.score}/100`);
      lines.push(
        `${t(dict, 'audit_md_met', 'Met')}: ${c.met}  ${t(dict, 'audit_md_partial', 'Partial')}: ${c.partial}  ${t(dict, 'audit_md_not_met', 'Not met')}: ${c.not_met}  ${t(dict, 'audit_md_na', 'N/A')}: ${c.na}`
      );
      lines.push('');
    });
    lines.push(`_(demo seed ${seed})_`);

    const audit = {
      document: fileName,
      doc_type,
      frameworks: frameworkIds,
      summary: {
        overall_score: overall,
        by_status: { met, partial, not_met, na },
        by_framework: byFw.map((f) => ({
          framework_id: f.framework_id,
          score: f.score,
          counts: f.counts,
        })),
      },
      results: [],
      _offline_demo: true,
      _seed: seed,
    };

    return { markdown: lines.join('\n'), audit };
  }

  function phaseToStepIndex(phase) {
    const p = (phase || '').toLowerCase();
    if (p === 'parse' || p === 'chunk') return 0;
    if (p === 'embed') return 1;
    if (p === 'llm') return 2;
    if (p === 'aggregate' || p === 'done') return 3;
    return 0;
  }

  function updateSteps(root, phase, done, dict) {
    const idx = phaseToStepIndex(phase);
    root.querySelectorAll('.audit-step').forEach((el, i) => {
      el.classList.remove('done', 'active');
      if (done) el.classList.add('done');
      else if (i < idx) el.classList.add('done');
      else if (i === idx) el.classList.add('active');
    });
  }

  function showAuditPage(root, page) {
    const upload = root.querySelector('#audit-page-upload');
    const proc = root.querySelector('#audit-page-process');
    const res = root.querySelector('#audit-page-results');
    if (upload) {
      upload.hidden = page !== 'upload';
      upload.classList.toggle('audit-page-show', page === 'upload');
    }
    if (proc) {
      proc.hidden = page !== 'process';
      proc.classList.toggle('audit-page-show', page === 'process');
    }
    if (res) {
      res.hidden = page !== 'results';
      res.classList.toggle('audit-page-show', page === 'results');
    }
    setCrumbs(root, page);
  }

  function setCrumbs(root, page) {
    const a = { upload: 'audit-crumb-upload', process: 'audit-crumb-process', results: 'audit-crumb-report' };
    Object.keys(a).forEach((p) => {
      const el = root.querySelector('#' + a[p]);
      if (el) el.classList.toggle('active', p === page);
    });
  }

  function scoreTierClass(score) {
    const s = Number(score) || 0;
    if (s >= 75) return 'ok';
    if (s >= 50) return 'warn';
    return 'bad';
  }

  function severityClass(sev) {
    const s = (sev || 'med').toLowerCase();
    if (s === 'high') return 'audit-sev-high';
    if (s === 'low') return 'audit-sev-low';
    return 'audit-sev-med';
  }

  function renderDashboardHTML(audit, dict) {
    let lang = 'en';
    try {
      lang = localStorage.getItem('mustalih_lang') || 'en';
    } catch (e) {}
    const summ = audit.summary || {};
    const overall = summ.overall_score ?? 0;
    const bs = summ.by_status || { met: 0, partial: 0, not_met: 0, na: 0 };
    const byFw = summ.by_framework || [];
    const results = Array.isArray(audit.results) ? audit.results : [];

    const sevOrder = { high: 0, med: 1, low: 2 };
    const gaps = results
      .filter((r) => r.status === 'not_met' || r.status === 'partial')
      .sort(
        (a, b) =>
          (sevOrder[(a.severity || 'med').toLowerCase()] ?? 9) -
          (sevOrder[(b.severity || 'med').toLowerCase()] ?? 9)
      )
      .slice(0, 8);

    const docName = escapeHtml(audit.document || 'document.pdf');
    const snap = escapeHtml(t(dict, 'audit_dash_snapshot', 'Compliance snapshot'));
    const topGaps = escapeHtml(t(dict, 'audit_top_gaps', 'Top gaps & partials'));
    const metL = escapeHtml(t(dict, 'audit_md_met', 'Met'));
    const partL = escapeHtml(t(dict, 'audit_md_partial', 'Partial'));
    const nmL = escapeHtml(t(dict, 'audit_md_not_met', 'Not met'));
    const naL = escapeHtml(t(dict, 'audit_md_na', 'N/A'));
    const stub = escapeHtml(t(dict, 'audit_md_gaps_stub', 'Review the JSON export for detail.'));

    let fwHtml = '';
    byFw.forEach((fw) => {
      const c = fw.counts || { met: 0, partial: 0, not_met: 0, na: 0 };
      const total = c.met + c.partial + c.not_met + c.na;
      const pct = (n) => (total > 0 ? Math.round((n / total) * 1000) / 10 : 0);
      const w = (n) => (total > 0 ? (n / total) * 100 : 0);
      const metaFw = frameworksList.find((x) => x.framework_id === fw.framework_id);
      const name = escapeHtml(
        (metaFw && frameworkLabel(metaFw, lang)) || fw.framework_name_en || fw.framework_id || ''
      );
      const sc = fw.score ?? 0;
      fwHtml += `
        <div class="audit-fw-dash">
          <div class="audit-fw-dash-head">
            <span class="audit-fw-dash-name">${name}</span>
            <span class="audit-fw-dash-score">${escapeHtml(String(sc))}</span>
          </div>
          <div class="audit-fw-segbar">
            <div class="seg-met" style="width:${w(c.met)}%"></div>
            <div class="seg-partial" style="width:${w(c.partial)}%"></div>
            <div class="seg-not_met" style="width:${w(c.not_met)}%"></div>
            <div class="seg-na" style="width:${w(c.na)}%"></div>
          </div>
          <div class="audit-fw-legend">
            <span><i class="audit-dot" style="background:#2e7d32"></i> ${metL} ${pct(c.met)}%</span>
            <span><i class="audit-dot" style="background:#b45309"></i> ${partL} ${pct(c.partial)}%</span>
            <span><i class="audit-dot" style="background:#c53030"></i> ${nmL} ${pct(c.not_met)}%</span>
            <span><i class="audit-dot" style="background:var(--text-tertiary)"></i> ${naL} ${pct(c.na)}%</span>
          </div>
        </div>`;
    });

    let gapsHtml = '';
    if (gaps.length === 0) {
      gapsHtml = `<p class="audit-muted">${stub}</p>`;
    } else {
      gaps.forEach((g) => {
        const stLabel =
          g.status === 'partial'
            ? t(dict, 'audit_md_partial', 'Partial')
            : t(dict, 'audit_md_not_met', 'Not met');
        const sev = escapeHtml((g.severity || 'med').toUpperCase());
        const title = escapeHtml(g.control_title || g.control_id || '');
        const cid = escapeHtml(g.control_id || '');
        const quote = escapeHtml((g.evidence_quote || '').trim());
        const reason = escapeHtml((g.reasoning || '').trim());
        const remLabel = escapeHtml(t(dict, 'audit_md_remediation', 'Remediation'));
        const evLabel = escapeHtml(t(dict, 'audit_md_evidence', 'Evidence'));
        const rem = escapeHtml((g.remediation || '').trim());
        gapsHtml += `
          <details class="audit-gap">
            <summary>
              <div class="audit-gap-head">
                <div>
                  <span class="audit-gap-id">${cid}</span>
                  <div class="audit-gap-title">${title}</div>
                  <div class="audit-gap-meta">
                    <span class="audit-sev ${severityClass(g.severity)}">${sev}</span>
                    <span>${escapeHtml(stLabel)}</span>
                  </div>
                </div>
              </div>
            </summary>
            <div class="audit-gap-body">
              ${reason ? `<p>${reason}</p>` : ''}
              ${quote ? `<div class="audit-evidence"><strong>${evLabel}:</strong> ${quote}</div>` : ''}
              ${rem ? `<p><strong>${remLabel}:</strong> ${rem}</p>` : ''}
            </div>
          </details>`;
      });
    }

    const ovClass = scoreTierClass(overall);
    const labelOverall = escapeHtml(t(dict, 'audit_md_score_word', 'Overall score'));

    return `
      <div class="audit-dash-header">
        <div class="audit-dash-title">
          <h2>${snap}</h2>
          <div class="audit-doc-chip"><i class="ti ti-file-text"></i> ${docName}</div>
        </div>
      </div>
      <div class="audit-score-grid">
        <div class="audit-score-card ${ovClass}">
          <div class="lbl">${labelOverall}</div>
          <div class="val">${escapeHtml(String(overall))}</div>
          <div class="sub">/ 100</div>
        </div>
        <div class="audit-score-card ok">
          <div class="lbl">${metL}</div>
          <div class="val">${escapeHtml(String(bs.met ?? 0))}</div>
        </div>
        <div class="audit-score-card warn">
          <div class="lbl">${partL}</div>
          <div class="val">${escapeHtml(String(bs.partial ?? 0))}</div>
        </div>
        <div class="audit-score-card bad">
          <div class="lbl">${nmL}</div>
          <div class="val">${escapeHtml(String(bs.not_met ?? 0))}</div>
        </div>
        <div class="audit-score-card">
          <div class="lbl">${naL}</div>
          <div class="val">${escapeHtml(String(bs.na ?? 0))}</div>
        </div>
      </div>
      <h3 class="audit-card-title" style="margin-top:0">${escapeHtml(t(dict, 'audit_md_by_fw', 'Score by framework'))}</h3>
      <div class="audit-fw-dash-list">${fwHtml || `<p class="audit-muted">${stub}</p>`}</div>
      <h3 class="audit-card-title">${topGaps}</h3>
      <div class="audit-gap-list">${gapsHtml}</div>`;
  }

  let lastAuditPayload = null;

  function renderForm(root, dict, lang) {
    const docTypes = [
      {
        value: 'plan',
        icon: 'ti-cpu',
        label: t(dict, 'audit_doc_plan', 'Project plan / PRD'),
        sub: t(dict, 'audit_doc_plan_sub', 'Roadmaps, procurement, delivery plans'),
      },
      {
        value: 'policy',
        icon: 'ti-shield-check',
        label: t(dict, 'audit_doc_policy', 'AI policy / charter'),
        sub: t(dict, 'audit_doc_policy_sub', 'Charters, governance statements'),
      },
      {
        value: 'system',
        icon: 'ti-clipboard-text',
        label: t(dict, 'audit_doc_system', 'System documentation'),
        sub: t(dict, 'audit_doc_system_sub', 'Model cards, system documentation'),
      },
    ];

    const fwRows = frameworksList
      .map((fw) => {
        const id = fw.framework_id;
        const sel = selectedFrameworks.has(id) ? 'sel' : '';
        const checked = selectedFrameworks.has(id) ? 'checked' : '';
        const meta = escapeHtml(fw.framework_id);
        const lbl = escapeHtml(frameworkLabel(fw, lang));
        return `
        <label class="audit-fw-card ${sel}" data-fw-id="${escapeHtml(id)}">
          <input type="checkbox" name="fw" value="${escapeHtml(id)}" ${checked}/>
          <span class="check"><i class="ti ti-check"></i></span>
          <span class="audit-fw-text">
            <span class="audit-fw-name">${lbl}</span>
            <span class="audit-fw-meta">${meta}</span>
          </span>
        </label>`;
      })
      .join('');

    root.innerHTML = `
      <div class="audit-layout audit-shell" id="audit-shell">
        <div class="audit-demo-banner" id="audit-nim-banner" hidden></div>

        <div class="audit-topbar">
          <div class="audit-brand">
            <span class="audit-brand-mark">A</span>
            <span id="audit-brand-text">${escapeHtml(t(dict, 'audit_brand', 'Audit AI'))}</span>
          </div>
          <div class="audit-crumbs" id="audit-crumbs">
            <span class="audit-crumb active" id="audit-crumb-upload">${escapeHtml(t(dict, 'audit_crumb_upload', 'Upload'))}</span>
            <span aria-hidden="true">·</span>
            <span class="audit-crumb" id="audit-crumb-process">${escapeHtml(t(dict, 'audit_crumb_process', 'Processing'))}</span>
            <span aria-hidden="true">·</span>
            <span class="audit-crumb" id="audit-crumb-report">${escapeHtml(t(dict, 'audit_crumb_report', 'Report'))}</span>
          </div>
        </div>

        <div id="audit-page-upload">
          <h1 class="audit-hero-title" id="audit-view-title">${escapeHtml(t(dict, 'audit_h', 'Audit AI'))}</h1>
          <p class="audit-lede" id="audit-view-desc">${escapeHtml(
            t(dict, 'audit_p', 'Evaluate your AI documents against global and local governance frameworks in a secure, private workspace.')
          )}</p>

          <div class="audit-section">
            <div class="audit-section-label">
              <span class="audit-section-num">1</span>
              <span id="audit-sec1-label">${escapeHtml(t(dict, 'audit_sec1', '1. Document type'))}</span>
            </div>
            <div class="audit-doctype-grid" role="radiogroup" aria-label="${escapeHtml(t(dict, 'audit_sec1', 'Document type'))}">
              ${docTypes
                .map(
                  (d, i) => `
              <label class="audit-doctype ${i === 0 ? 'sel' : ''}" data-doc-type="${d.value}">
                <input type="radio" name="doc_type" value="${d.value}" ${i === 0 ? 'checked' : ''} />
                <i class="ti ${d.icon}"></i>
                <div class="t">${escapeHtml(d.label)}</div>
                <div class="s">${escapeHtml(d.sub)}</div>
              </label>`
                )
                .join('')}
            </div>
          </div>

          <div class="audit-section">
            <div class="audit-section-label">
              <span class="audit-section-num">2</span>
              <span id="audit-sec2-label">${escapeHtml(t(dict, 'audit_sec2', '2. Frameworks'))}</span>
            </div>
            <div class="audit-fw-grid" id="audit-fw-box">
              ${fwRows || '<p class="audit-muted" id="audit-fw-loading-msg">' + escapeHtml(t(dict, 'audit_fw_loading', 'Loading frameworks…')) + '</p>'}
            </div>
          </div>

          <div class="audit-section">
            <div class="audit-section-label">
              <span class="audit-section-num">3</span>
              <span id="audit-sec3-label">${escapeHtml(t(dict, 'audit_sec3', '3. Document (PDF)'))}</span>
            </div>
            <div class="audit-dropzone" id="audit-dropzone" role="button" tabindex="0">
              <input type="file" id="audit-file" accept="application/pdf,.pdf" class="audit-file-input sr-only-audit" />
              <div class="audit-dropzone-inner" id="audit-dropzone-ui">
                <i class="ti ti-upload audit-dz-icon"></i>
                <div class="main" id="audit-dz-main">${escapeHtml(t(dict, 'audit_dz_main', 'Drop PDF here or click to browse'))}</div>
                <div class="sub" id="audit-dz-sub">${escapeHtml(
                  t(dict, 'audit_dz_sub', 'Max ~20 MB · text is processed locally when the API runs on your machine')
                )}</div>
                <span class="audit-file-name" id="audit-file-name"></span>
              </div>
            </div>
          </div>

          <div class="audit-actions-bar">
            <button type="button" class="btn primary" id="audit-run">${escapeHtml(t(dict, 'audit_run', 'Run audit'))}</button>
            <button type="button" class="btn" id="audit-offline-demo">${escapeHtml(t(dict, 'audit_offline_btn', 'Offline demo only'))}</button>
          </div>
          <p class="audit-status" id="audit-status" role="status" aria-live="polite"></p>
        </div>

        <div id="audit-page-process" hidden>
          <div class="audit-proc-wrap">
            <p class="audit-proc-status" id="audit-proc-label">${escapeHtml(t(dict, 'audit_proc_running', 'Running audit pipeline'))}</p>
            <p class="audit-proc-doc" id="audit-proc-docname"></p>
            <div class="audit-bar"><div class="audit-bar-fill" id="audit-progress-fill"></div></div>
            <p class="audit-proc-pct" id="audit-progress-detail"></p>
            <div class="audit-steps" id="audit-steps">
              ${[0, 1, 2, 3]
                .map(
                  (i) => `
              <div class="audit-step" id="audit-step-${i}">
                <span class="icon"><i class="ti ti-${i === 3 ? 'clipboard-check' : i === 2 ? 'sparkles' : i === 1 ? 'affiliate' : 'files'}"></i></span>
                <span class="audit-step-txt" id="audit-step-label-${i}"></span>
              </div>`
                )
                .join('')}
            </div>
          </div>
        </div>

        <div id="audit-page-results" hidden>
          <p class="audit-muted" id="audit-result-msg" style="margin:0 0 18px;"></p>
          <div id="audit-dashboard-mount"></div>
          <details class="audit-report-details" open>
            <summary id="audit-report-summary">${escapeHtml(t(dict, 'audit_report_md_summary', 'Markdown report'))}</summary>
            <article class="audit-report" id="audit-report-md"></article>
          </details>
          <div class="audit-results-actions">
            <a href="#" class="btn" id="audit-dl-json">${escapeHtml(t(dict, 'audit_dl_json', 'Download JSON'))}</a>
            <button type="button" class="btn ghost" id="audit-new-run">${escapeHtml(t(dict, 'audit_new_audit', 'New audit'))}</button>
          </div>
        </div>
      </div>`;

    fillStepLabels(root, dict);
    showAuditPage(root, 'upload');

    const apiIn = root.querySelector('#audit-api-input');
    const apiSave = root.querySelector('#audit-api-save');
    if (apiSave && apiIn) {
      apiSave.addEventListener('click', () => {
        try {
          localStorage.setItem('mustalih_audit_api', apiIn.value.trim() || 'http://127.0.0.1:8788');
        } catch (e) {}
        const st = root.querySelector('#audit-status');
        if (st) st.textContent = t(dict, 'audit_api_saved', 'Saved API URL.');
      });
    }

    root.querySelectorAll('.audit-doctype').forEach((label) => {
      label.addEventListener('click', (e) => {
        if (e.target.closest('input')) return;
        const inp = label.querySelector('input[name="doc_type"]');
        if (inp) {
          inp.checked = true;
          inp.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });

    function syncDoctypeSel() {
      root.querySelectorAll('.audit-doctype').forEach((lab) => {
        const r = lab.querySelector('input[name="doc_type"]');
        lab.classList.toggle('sel', !!(r && r.checked));
      });
    }

    root.querySelectorAll('input[name="doc_type"]').forEach((inp) => {
      inp.addEventListener('change', syncDoctypeSel);
    });
    syncDoctypeSel();

    root.querySelectorAll('.audit-fw-card').forEach((lab) => {
      lab.addEventListener('click', (e) => {
        if (e.target.closest('input[type="checkbox"]')) return;
        const inp = lab.querySelector('input[type="checkbox"]');
        if (inp) {
          inp.checked = !inp.checked;
          inp.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });

    root.querySelectorAll('input[name="fw"]').forEach((el) => {
      el.addEventListener('change', () => {
        if (el.checked) selectedFrameworks.add(el.value);
        else selectedFrameworks.delete(el.value);
        const lab = el.closest('.audit-fw-card');
        if (lab) lab.classList.toggle('sel', el.checked);
      });
    });

    const fileIn = root.querySelector('#audit-file');
    const fname = root.querySelector('#audit-file-name');
    const dz = root.querySelector('#audit-dropzone');
    const dzInner = root.querySelector('#audit-dropzone-ui');
    function syncFileState() {
      const has = fileIn && fileIn.files && fileIn.files[0];
      if (dz) dz.classList.toggle('has-file', !!has);
      if (fname) fname.textContent = has ? fileIn.files[0].name : '';
    }
    if (fileIn) {
      fileIn.addEventListener('change', syncFileState);
    }
    if (dz && fileIn) {
      dz.addEventListener('click', () => fileIn.click());
      dz.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          fileIn.click();
        }
      });
      dz.addEventListener('dragover', (e) => {
        e.preventDefault();
        dz.classList.add('drag');
      });
      dz.addEventListener('dragleave', () => dz.classList.remove('drag'));
      dz.addEventListener('drop', (e) => {
        e.preventDefault();
        dz.classList.remove('drag');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          fileIn.files = e.dataTransfer.files;
          syncFileState();
        }
      });
    }

    const runBtn = root.querySelector('#audit-run');
    if (runBtn) runBtn.addEventListener('click', () => runAuditApi(root, dict, lang));
    const offBtn = root.querySelector('#audit-offline-demo');
    if (offBtn) offBtn.addEventListener('click', () => runAuditOffline(root, dict, lang));

    const dl = root.querySelector('#audit-dl-json');
    if (dl) dl.addEventListener('click', (e) => e.preventDefault());

    const newRun = root.querySelector('#audit-new-run');
    if (newRun) newRun.addEventListener('click', () => resetAuditSession(root, dict, lang));

    updateSteps(root, 'parse', false, dict);
  }

  function fillStepLabels(root, dict) {
    const keys = ['audit_step_1', 'audit_step_2', 'audit_step_3', 'audit_step_4'];
    const fall = [
      'Parse & chunk the PDF',
      'Embed passages & retrieve context',
      'Evaluate each control (LLM)',
      'Aggregate scores & markdown report',
    ];
    keys.forEach((k, i) => {
      const el = root.querySelector('#audit-step-label-' + i);
      if (el) el.textContent = t(dict, k, fall[i]);
    });
  }

  function resetAuditSession(root, dict, lang) {
    lastAuditPayload = null;
    const fileIn = root.querySelector('#audit-file');
    if (fileIn) fileIn.value = '';
    const dz = root.querySelector('#audit-dropzone');
    if (dz) dz.classList.remove('has-file');
    const fn = root.querySelector('#audit-file-name');
    if (fn) fn.textContent = '';
    const st = root.querySelector('#audit-status');
    if (st) st.textContent = '';
    const mount = root.querySelector('#audit-dashboard-mount');
    if (mount) mount.innerHTML = '';
    const rep = root.querySelector('#audit-report-md');
    if (rep) rep.innerHTML = '';
    const rm = root.querySelector('#audit-result-msg');
    if (rm) rm.textContent = '';
    const fill = root.querySelector('#audit-progress-fill');
    if (fill) fill.style.width = '0%';
    showAuditPage(root, 'upload');
    updateSteps(root, 'parse', false, dict);
  }

  function displayResult(root, markdown, audit, dict, doneMsg) {
    const statusEl = root.querySelector('#audit-status');
    const out = root.querySelector('#audit-report-md');
    const mount = root.querySelector('#audit-dashboard-mount');
    const resultMsg = root.querySelector('#audit-result-msg');
    if (statusEl) statusEl.textContent = doneMsg;
    if (resultMsg) resultMsg.textContent = doneMsg || '';
    if (mount && audit) mount.innerHTML = renderDashboardHTML(audit, dict);
    if (out) {
      if (typeof marked !== 'undefined' && typeof marked.parse === 'function') {
        out.innerHTML = marked.parse(markdown || '');
        // Attach click listeners for terms
        out.querySelectorAll('a[href^="#term="]').forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const term = link.getAttribute('href').split('=')[1];
            if (term && global.MustalihApp && global.MustalihApp.openTerm) {
              global.MustalihApp.openTerm(decodeURIComponent(term));
            } else if (term && typeof findAndRender === 'function') {
              // Fallback for direct global call
              findAndRender(decodeURIComponent(term));
              if (typeof goto === 'function') goto('detail');
            }
          });
        });
      } else {
        out.textContent = markdown || '';
      }
    }
    const dl = root.querySelector('#audit-dl-json');
    if (dl && audit) {
      dl.onclick = (e) => {
        e.preventDefault();
        const blob = new Blob([JSON.stringify(audit, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = audit._offline_demo ? 'audit-ai-demo.json' : 'audit-ai-result.json';
        a.click();
        URL.revokeObjectURL(a.href);
      };
    }
    lastAuditPayload = audit;
    showAuditPage(root, 'results');
  }

  function runAuditOffline(root, dict0, lang) {
    const dict = dictFromWindow() || dict0 || {};
    const statusEl = root.querySelector('#audit-status');
    const fileIn = root.querySelector('#audit-file');
    const runBtn = root.querySelector('#audit-offline-demo');
    const docTypeEl = root.querySelector('input[name="doc_type"]:checked');
    const doc_type = docTypeEl ? docTypeEl.value : 'plan';
    const fwSelected = Array.from(root.querySelectorAll('input[name="fw"]:checked')).map((x) => x.value);

    if (!fileIn || !fileIn.files || !fileIn.files[0]) {
      if (statusEl) statusEl.textContent = t(dict, 'audit_need_pdf', 'Upload a PDF first.');
      return;
    }
    if (fwSelected.length === 0) {
      if (statusEl) statusEl.textContent = t(dict, 'audit_need_fw', 'Select at least one framework.');
      return;
    }

    if (statusEl) statusEl.textContent = t(dict, 'audit_running_demo', 'Generating offline demo…');
    if (runBtn) runBtn.disabled = true;

    const fileName = fileIn.files[0].name || 'document.pdf';
    window.setTimeout(() => {
      try {
        const { markdown, audit } = buildLocalAudit(doc_type, fwSelected, fileName, dict, lang);
        displayResult(
          root,
          markdown,
          audit,
          dict,
          t(dict, 'audit_done_demo', 'Offline demo ready (not real LLM scoring).')
        );
      } catch (err) {
        console.error(err);
        if (statusEl) statusEl.textContent = t(dict, 'audit_err', 'Something went wrong.');
      } finally {
        if (runBtn) runBtn.disabled = false;
      }
    }, 280);
  }

  function runAuditApi(root, dict0, lang) {
    const dict = dictFromWindow() || dict0 || {};
    const statusEl = root.querySelector('#audit-status');
    const out = root.querySelector('#audit-report-md');
    const mount = root.querySelector('#audit-dashboard-mount');
    const fileIn = root.querySelector('#audit-file');
    const runBtn = root.querySelector('#audit-run');

    const docTypeEl = root.querySelector('input[name="doc_type"]:checked');
    const doc_type = docTypeEl ? docTypeEl.value : 'plan';
    const fwSelected = Array.from(root.querySelectorAll('input[name="fw"]:checked')).map((x) => x.value);

    if (!fileIn || !fileIn.files || !fileIn.files[0]) {
      if (statusEl) statusEl.textContent = t(dict, 'audit_need_pdf', 'Upload a PDF first.');
      return;
    }
    if (fwSelected.length === 0) {
      if (statusEl) statusEl.textContent = t(dict, 'audit_need_fw', 'Select at least one framework.');
      return;
    }

    const base = (root.querySelector('#audit-api-input') && root.querySelector('#audit-api-input').value.trim()) || auditApiBase();
    const url = auditStreamUrl(base);
    const progressFill = root.querySelector('#audit-progress-fill');
    const progressDetail = root.querySelector('#audit-progress-detail');
    const procDoc = root.querySelector('#audit-proc-docname');
    const procLabel = root.querySelector('#audit-proc-label');

    if (statusEl) statusEl.textContent = t(dict, 'audit_running', 'Running full audit… this may take many minutes.');
    if (out) out.textContent = '';
    if (mount) mount.innerHTML = '';
    lastAuditPayload = null;
    if (runBtn) runBtn.disabled = true;
    if (progressFill) progressFill.style.width = '0%';
    if (progressDetail) progressDetail.textContent = '';
    if (procDoc) procDoc.textContent = fileIn.files[0].name || '';
    if (procLabel) procLabel.textContent = t(dict, 'audit_proc_running', 'Running audit pipeline');

    showAuditPage(root, 'process');
    updateSteps(root, 'parse', false, dict);

    const fd = new FormData();
    fd.append('file', fileIn.files[0], fileIn.files[0].name);
    fd.append('doc_type', doc_type);
    fd.append('frameworks', JSON.stringify(fwSelected));
    fd.append('lang', lang || 'en');

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 7200000);

    (async function () {
      try {
        const res = await fetch(url, { method: 'POST', body: fd, signal: ctrl.signal });
        clearTimeout(timer);

        const ct = res.headers.get('content-type') || '';
        if (!res.ok || ct.indexOf('application/json') !== -1) {
          const data = await res.json().catch(() => ({}));
          showAuditPage(root, 'upload');
          if (statusEl) statusEl.textContent = formatAuditHttpError(res.status, data, dict);
          return;
        }

        const reader = res.body && res.body.getReader();
        if (!reader) {
          throw new Error('Streaming response not supported in this browser.');
        }

        const dec = new TextDecoder();
        let buf = '';
        let sawComplete = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          let sep;
          while ((sep = buf.indexOf('\n\n')) >= 0) {
            const block = buf.slice(0, sep).trim();
            buf = buf.slice(sep + 2);
            if (!block.startsWith('data: ')) continue;
            const line = block.slice('data: '.length).trim();
            let ev;
            try {
              ev = JSON.parse(line);
            } catch (e) {
              continue;
            }
            if (ev.event === 'progress') {
              const pct = typeof ev.pct === 'number' ? ev.pct : 0;
              const w = Math.max(0, Math.min(1, pct));
              if (progressFill) progressFill.style.width = Math.round(w * 100) + '%';
              const detailText = Math.round(w * 100) + '% — ' + (ev.message || ev.phase || '');
              if (progressDetail) progressDetail.textContent = detailText;
              if (statusEl) statusEl.textContent = ev.message || detailText;
              const ph = ev.phase || '';
              updateSteps(root, ph, ph === 'done', dict);
            } else if (ev.event === 'complete') {
              sawComplete = true;
              if (!ev.ok) {
                const errText = ev.error || t(dict, 'audit_err', 'Audit failed.');
                showAuditPage(root, 'upload');
                if (statusEl) {
                  statusEl.textContent =
                    errText + ' ' + t(dict, 'audit_try_offline', 'You can try “Offline demo only” — no real scoring.');
                }
                return;
              }
              updateSteps(root, 'done', true, dict);
              if (progressFill) progressFill.style.width = '100%';
              displayResult(root, ev.markdown || '', ev.audit, dict, t(dict, 'audit_done', 'Audit complete.'));
              return;
            }
          }
        }
        if (!sawComplete) {
          showAuditPage(root, 'upload');
          if (statusEl) statusEl.textContent = t(dict, 'audit_err', 'Stream ended unexpectedly.');
        }
      } catch (err) {
        clearTimeout(timer);
        showAuditPage(root, 'upload');
        if (statusEl) {
          statusEl.classList.add('err');
          const isTimeout = err && err.name === 'AbortError';
          statusEl.textContent = isTimeout 
            ? t(dict, 'audit_timeout', 'Request timed out.')
            : t(dict, 'audit_upstream_not_configured', 'The compliance server is currently unavailable. Please try again later.');
        }
      } finally {
        if (runBtn) runBtn.disabled = false;
      }
    })();
  }

  async function maybeShowNimBanner(root) {
    const banner = root.querySelector('#audit-nim-banner');
    if (!banner) return;
    const base = auditApiBase();
    try {
      const res = await fetch(auditHealthUrl(base), { method: 'GET' });
      const data = await res.json().catch(() => ({}));
      if (data.edge_demo) {
        banner.hidden = true;
      } else if (data.ok && data.nim_configured === false) {
        banner.hidden = false;
        banner.textContent = t(
          dictFromWindow(),
          'audit_nim_banner',
          'NVIDIA NIM is not configured — add NVIDIA_API_KEY to backend/.env for full LLM scoring.'
        );
      } else {
        banner.hidden = true;
      }
    } catch (e) {
      banner.hidden = true;
    }
  }

  function applyLabels(dict) {
    const lang = (function () {
      try {
        return localStorage.getItem('mustalih_lang') || 'en';
      } catch (e) {
        return 'en';
      }
    })();
    const root = document.getElementById('audit-view-root');
    if (!root) return;
    const t2 = (k, fb) => (dict && dict[k] != null ? dict[k] : fb);

    const set = (id, key, fb) => {
      const el = document.getElementById(id);
      if (el) el.textContent = t2(key, fb);
    };

    set('audit-view-title', 'audit_h', 'Audit AI');
    set('audit-view-desc', 'audit_p', '');
    set('audit-brand-text', 'audit_brand', 'Audit AI');
    set('audit-crumb-upload', 'audit_crumb_upload', 'Upload');
    set('audit-crumb-process', 'audit_crumb_process', 'Processing');
    set('audit-crumb-report', 'audit_crumb_report', 'Report');
    set('audit-dz-main', 'audit_dz_main', '');
    set('audit-dz-sub', 'audit_dz_sub', '');
    set('audit-sec1-label', 'audit_sec1', '');
    set('audit-sec2-label', 'audit_sec2', '');
    set('audit-sec3-label', 'audit_sec3', '');
    set('audit-report-summary', 'audit_report_md_summary', '');
    fillStepLabels(root, dict);

    const run = document.getElementById('audit-run');
    if (run) run.textContent = t2('audit_run', run.textContent);
    const offBtn = document.getElementById('audit-offline-demo');
    if (offBtn) offBtn.textContent = t2('audit_offline_btn', offBtn.textContent);
    const dl = document.getElementById('audit-dl-json');
    if (dl) dl.textContent = t2('audit_dl_json', dl.textContent);
    const newRun = document.getElementById('audit-new-run');
    if (newRun) newRun.textContent = t2('audit_new_audit', newRun.textContent);
    set('audit-proc-label', 'audit_proc_running', '');

    const docSubs = [
      ['audit_doc_plan_sub', 'Roadmaps, procurement, delivery plans'],
      ['audit_doc_policy_sub', 'Charters, governance statements'],
      ['audit_doc_system_sub', 'Model cards, system documentation'],
    ];
    root.querySelectorAll('.audit-doctype .s').forEach((el, i) => {
      if (docSubs[i]) el.textContent = t2(docSubs[i][0], docSubs[i][1]);
    });
    const docMain = [
      ['audit_doc_plan', 'Project plan / PRD'],
      ['audit_doc_policy', 'AI policy / charter'],
      ['audit_doc_system', 'System documentation'],
    ];
    root.querySelectorAll('.audit-doctype .t').forEach((el, i) => {
      if (docMain[i]) el.textContent = t2(docMain[i][0], docMain[i][1]);
    });

    const box = document.getElementById('audit-fw-box');
    if (box && frameworksList.length) {
      const fwRows = frameworksList
        .map((fw) => {
          const id = fw.framework_id;
          const sel = selectedFrameworks.has(id) ? 'sel' : '';
          const checked = selectedFrameworks.has(id) ? 'checked' : '';
          const meta = escapeHtml(fw.framework_id);
          const lbl = escapeHtml(frameworkLabel(fw, lang));
          return `
        <label class="audit-fw-card ${sel}" data-fw-id="${escapeHtml(id)}">
          <input type="checkbox" name="fw" value="${escapeHtml(id)}" ${checked}/>
          <span class="check"><i class="ti ti-check"></i></span>
          <span class="audit-fw-text">
            <span class="audit-fw-name">${lbl}</span>
            <span class="audit-fw-meta">${meta}</span>
          </span>
        </label>`;
        })
        .join('');
      box.innerHTML = fwRows;
      box.querySelectorAll('input[name="fw"]').forEach((el) => {
        el.addEventListener('change', () => {
          if (el.checked) selectedFrameworks.add(el.value);
          else selectedFrameworks.delete(el.value);
          const lab = el.closest('.audit-fw-card');
          if (lab) lab.classList.toggle('sel', el.checked);
        });
      });
      box.querySelectorAll('.audit-fw-card').forEach((lab) => {
        lab.addEventListener('click', (e) => {
          if (e.target.closest('input[type="checkbox"]')) return;
          const inp = lab.querySelector('input[type="checkbox"]');
          if (inp) {
            inp.checked = !inp.checked;
            inp.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      });
    }

    const nb = root.querySelector('#audit-nim-banner');
    if (nb && !nb.hidden && dict && dict.audit_nim_banner) nb.textContent = dict.audit_nim_banner;
  }

  async function mount(host) {
    if (!host) return;

    const res = await fetch('data/audit_frameworks.json').catch(() => null);
    if (res && res.ok) {
      const data = await res.json();
      frameworksList = data.frameworks || [];
    }
    if (frameworksList.length) {
      const firstN = Math.min(3, frameworksList.length);
      selectedFrameworks = new Set(frameworksList.slice(0, firstN).map((f) => f.framework_id));
    }

    let lang = 'en';
    try {
      lang = localStorage.getItem('mustalih_lang') || 'en';
    } catch (e) {}
    const dict = {};

    renderForm(host, dict, lang);
    applyLabels(dictFromWindow());
    maybeShowNimBanner(host);
  }

  global.AuditView = { mount, applyLabels };
})(typeof window !== 'undefined' ? window : this);
