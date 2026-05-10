/**
 * Proxies multipart POST → upstream `/api/v1/audit/run/stream` (SSE). Secrets never reach the browser.
 */
function getEnv(env, key) {
  if (env[key] !== undefined) return env[key];
  const trimmed = key.trim();
  for (const k in env) {
    if (k.trim() === trimmed) return env[k];
  }
  return undefined;
}

function upstreamAuthHeaders(env, extra = {}) {
  const app = (getEnv(env, 'AUDIT_UPSTREAM_TOKEN') || '').trim();
  const hfRead = (getEnv(env, 'AUDIT_HF_READ_TOKEN') || '').trim();
  if (!app) return null;
  if (hfRead) {
    return {
      ...extra,
      Authorization: `Bearer ${hfRead}`,
      'X-Audit-Secret': `Bearer ${app}`
    };
  }
  return { ...extra, Authorization: `Bearer ${app}` };
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const base = (getEnv(env, 'AUDIT_UPSTREAM_URL') || '').trim().replace(/\/$/, '');
  const ctIn = request.headers.get('Content-Type') || '';

  const headers = upstreamAuthHeaders(env, ctIn ? { 'Content-Type': ctIn } : {});
  if (!base || !headers) {
    return new Response(
      JSON.stringify({
        ok: false,
        error:
          'Configure AUDIT_UPSTREAM_URL and AUDIT_UPSTREAM_TOKEN in Pages → Settings → Environment variables (or .dev.vars locally).'
      }),
      { status: 503, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );
  }

  if (!ctIn.includes('multipart/form-data')) {
    return new Response(JSON.stringify({ ok: false, error: 'Expected multipart form upload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }

  const res = await fetch(`${base}/api/v1/audit/run/stream`, {
    method: 'POST',
    headers,
    body: request.body
  });

  const out = new Headers();
  const ctOut = res.headers.get('Content-Type');
  if (ctOut) out.set('Content-Type', ctOut);
  out.set('Cache-Control', 'no-cache');
  out.set('Connection', 'keep-alive');
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers: out });
}
