/**
 * Same-origin health for Audit AI on Cloudflare Pages (no localhost / no Python).
 * Mirrors keys the Audit UI expects from FastAPI /health where relevant.
 */
export async function onRequest(context) {
  const { request } = context;
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }
  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const body = JSON.stringify({
    ok: true,
    service: 'audit-ai-edge',
    mode: 'pages-functions',
    controls: 519,
    frameworks: 4,
    icaire_terms: 1242,
    nim_configured: false,
    edge_demo: true,
    env: { note: 'Deterministic demo scores on Pages; use local FastAPI for full BGE-M3 + NIM pipeline.' }
  });

  return new Response(body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}
