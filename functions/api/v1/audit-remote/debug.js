/**
 * Diagnostic: confirms Pages env bindings visible to Functions (no secret values).
 * GET /api/v1/audit-remote/debug
 */
export async function onRequestGet(context) {
  const { env } = context;
  const url = (env.AUDIT_UPSTREAM_URL || '').trim();
  const tok = (env.AUDIT_UPSTREAM_TOKEN || '').trim();
  const hf = (env.AUDIT_HF_READ_TOKEN || '').trim();

  return new Response(
    JSON.stringify({
      ok: true,
      hasUpstreamUrl: url.length > 0,
      hasUpstreamToken: tok.length > 0,
      hasHfReadToken: hf.length > 0
    }),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store'
      }
    }
  );
}
