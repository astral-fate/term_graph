/**
 * Server-side SSE audit compatible with backend/main.py /api/v1/audit/run/stream.
 * Runs on Cloudflare Pages only: deterministic demo (same idea as audit-view buildLocalAudit).
 * No PDF/LLM — avoids loopback and keeps the deployed site self-contained.
 */
const FW_META = {
  oecd: { framework_name_en: 'OECD Framework for the Classification of AI Systems' },
  nist_interop: { framework_name_en: 'Common Guideposts to Promote Interoperability in AI Risk Management' },
  unesco: { framework_name_en: 'UNESCO Recommendation on the Ethics of Artificial Intelligence' },
  oecd_principles: { framework_name_en: 'OECD AI Principles' }
};

const APPROX_CONTROLS = { oecd: 130, nist_interop: 120, unesco: 140, oecd_principles: 129 };

function hashSeed(parts) {
  const s = parts.join('|');
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) >>> 0;
}

function buildDemo(doc_type, frameworkIds, fileName) {
  const seed = hashSeed([doc_type, [...frameworkIds].sort().join(','), fileName || 'doc.pdf']);
  let rng = seed;
  const tick = () => {
    rng = (rng * 1103515245 + 12345) % 2147483648;
    return rng / 2147483648;
  };

  let totalEval = 0;
  frameworkIds.forEach((fid) => {
    totalEval += APPROX_CONTROLS[fid] || 100;
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
    const n = APPROX_CONTROLS[fid] || 100;
    let m = 0;
    let p = 0;
    let nm = 0;
    let x = 0;
    for (let i = 0; i < n; i++) {
      const r = tick();
      if (r < 0.22) m++;
      else if (r < 0.48) p++;
      else if (r < 0.82) nm++;
      else x++;
    }
    const sp = m + p + nm;
    const sc = sp > 0 ? Math.round((100 * (m + 0.5 * p)) / sp) : 0;
    const meta = FW_META[fid];
    byFw.push({
      framework_id: fid,
      framework_name_en: meta ? meta.framework_name_en : fid,
      score: sc,
      counts: { met: m, partial: p, not_met: nm, na: x }
    });
  });

  const label =
    overall >= 75
      ? 'strong compliance posture'
      : overall >= 50
        ? 'developing compliance'
        : 'significant gaps';

  const lines = [];
  lines.push(`# Cloud Pages demo — ${label}`);
  lines.push(`_${fileName} · ${totalEval} controls evaluated (deterministic seed)_`);
  lines.push('');
  lines.push(`## Overall`);
  lines.push(`- **Overall score:** ${overall}/100`);
  lines.push(`- Met: ${met}  Partial: ${partial}  Not met: ${not_met}  N/A: ${na}`);
  lines.push('');
  lines.push(`## Score by framework`);
  byFw.forEach((fw) => {
    const c = fw.counts;
    lines.push(`### ${fw.framework_name_en} — ${fw.score}/100`);
    lines.push(`Met: ${c.met}  Partial: ${c.partial}  Not met: ${c.not_met}  N/A: ${c.na}`);
    lines.push('');
  });
  lines.push(`_(edge demo · seed ${seed} · not LLM-scored)_`);

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
        counts: f.counts
      }))
    },
    results: [],
    _offline_demo: true,
    _edge_pages: true,
    _seed: seed
  };

  return { markdown: lines.join('\n'), audit };
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function onRequestPost(context) {
  const { request } = context;

  let form;
  try {
    form = await request.formData();
  } catch (e) {
    return Response.json({ ok: false, error: 'Invalid form data' }, { status: 400 });
  }

  const file = form.get('file');
  const doc_type = String(form.get('doc_type') || 'plan');
  let selected = [];
  try {
    selected = JSON.parse(String(form.get('frameworks') || '[]'));
  } catch {
    return Response.json({ ok: false, error: 'Invalid frameworks JSON' }, { status: 400 });
  }

  if (!Array.isArray(selected) || selected.length === 0) {
    return Response.json({ ok: false, error: 'Select at least one framework.' }, { status: 400 });
  }

  const fname = file && typeof file === 'object' && 'name' in file ? file.name : 'document.pdf';
  const suffix = String(fname).toLowerCase().slice(fname.toLowerCase().lastIndexOf('.'));
  if (suffix !== '.pdf') {
    return Response.json({ ok: false, error: 'Only PDF files are supported.' }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      };

      try {
        send({
          event: 'progress',
          pct: 0.08,
          message: 'Parse & chunk PDF (demo)',
          phase: 'parse'
        });
        await delay(120);
        send({ event: 'progress', pct: 0.35, message: 'Embedding pass (skipped in edge demo)', phase: 'embed' });
        await delay(150);
        send({
          event: 'progress',
          pct: 0.72,
          message: 'Control scoring (deterministic)',
          phase: 'llm'
        });
        await delay(130);
        send({ event: 'progress', pct: 0.92, message: 'Aggregate report', phase: 'aggregate' });
        await delay(100);

        const { markdown, audit } = buildDemo(doc_type, selected, fname);
        send({ event: 'progress', pct: 1, message: 'Done', phase: 'done' });
        send({
          event: 'complete',
          ok: true,
          markdown,
          audit
        });
      } catch (err) {
        send({
          event: 'complete',
          ok: false,
          error: err && err.message ? String(err.message) : String(err)
        });
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no'
    }
  });
}
