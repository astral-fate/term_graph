/**
 * Proxies POST /api/v1/chat/completions → NVIDIA Integrate OpenAI-compatible API
 * (same host as Python: OpenAI(base_url="https://integrate.api.nvidia.com/v1", api_key=...)).
 *
 * Set NVIDIA_API_KEY in Cloudflare Pages → Settings → Environment variables (encrypted),
 * or in .dev.vars for local: `npx wrangler pages dev` from repo root (see wrangler.toml).
 *
 * The browser must only call same-origin `/api/v1/chat/completions` — never embed the key in JS.
 */
export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': request.headers.get('Origin') || '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const key = env.NVIDIA_API_KEY;
  if (!key || typeof key !== 'string') {
    return new Response(
      JSON.stringify({
        error: 'NVIDIA_API_KEY is not configured on the server. Add it in Pages env or .dev.vars.'
      }),
      { status: 503, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
    );
  }

  const body = await request.arrayBuffer();
  const contentType = request.headers.get('Content-Type') || 'application/json';
  const accept = request.headers.get('Accept') || '*/*';

  const upstream = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
      Authorization: `Bearer ${key}`,
      Accept: accept
    },
    body
  });

  const outHeaders = new Headers();
  const ct = upstream.headers.get('Content-Type');
  if (ct) outHeaders.set('Content-Type', ct);
  const cc = upstream.headers.get('Cache-Control');
  if (cc) outHeaders.set('Cache-Control', cc);

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: outHeaders
  });
}
