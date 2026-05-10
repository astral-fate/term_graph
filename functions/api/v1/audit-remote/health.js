/**
 * Same-origin health → upstream `/health`.
 * Secrets (Pages / .dev.vars): AUDIT_UPSTREAM_URL, AUDIT_UPSTREAM_TOKEN (= AUDIT_API_SECRET on HF).
 * Private HF Space gateway: set AUDIT_HF_READ_TOKEN (hf_*); app secret is sent as X-Audit-Secret (see backend middleware).
 */
function upstreamAuthHeaders(env) {
  const app = (env.AUDIT_UPSTREAM_TOKEN || '').trim();
  const hfRead = (env.AUDIT_HF_READ_TOKEN || '').trim();
  if (!app) return null;
  if (hfRead) {
    return {
      Authorization: `Bearer ${hfRead}`,
      'X-Audit-Secret': `Bearer ${app}`
    };
  }
  return { Authorization: `Bearer ${app}` };
}

export async function onRequestGet(context) {
  const { env } = context;
  const base = (env.AUDIT_UPSTREAM_URL || '').trim().replace(/\/$/, '');
  const authHeaders = upstreamAuthHeaders(env);

  if (!base || !authHeaders) {
    return new Response(
      JSON.stringify({
        ok: false,
        error:
          'Configure AUDIT_UPSTREAM_URL and AUDIT_UPSTREAM_TOKEN in Pages → Settings → Environment variables (or .dev.vars locally).'
      }),
      { status: 503, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );
  }

  const res = await fetch(`${base}/health`, {
    headers: authHeaders
  });
  const ct = res.headers.get('Content-Type') || 'application/json; charset=utf-8';
  return new Response(res.body, {
    status: res.status,
    headers: { 'Content-Type': ct, 'Cache-Control': 'no-store' }
  });
}
