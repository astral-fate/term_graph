/**
 * Diagnostic: confirms Pages env bindings visible to Functions.
 * Masks secrets to prevent exposure while allowing verification.
 * GET /api/v1/audit-remote/debug
 */
export async function onRequestGet(context) {
  const { env } = context;
  
  function mask(s) {
    if (!s) return "(empty)";
    const val = String(s).trim();
    if (val.length <= 4) return "****";
    return val.slice(0, 2) + "..." + val.slice(-2) + " (" + val.length + " chars)";
  }

  const allKeys = Object.keys(env).sort();
  
  return new Response(
    JSON.stringify({
      ok: true,
      timestamp: new Date().toISOString(),
      environment: {
        keysFound: allKeys,
        count: allKeys.length
      },
      expectedVariables: {
        AUDIT_UPSTREAM_URL: env.AUDIT_UPSTREAM_URL ? env.AUDIT_UPSTREAM_URL.replace(/(https?:\/\/)(.*)/, "$1***") : "(missing)",
        AUDIT_UPSTREAM_TOKEN: mask(env.AUDIT_UPSTREAM_TOKEN),
        AUDIT_HF_READ_TOKEN: mask(env.AUDIT_HF_READ_TOKEN)
      },
      check: {
        hasBase: !!(env.AUDIT_UPSTREAM_URL && env.AUDIT_UPSTREAM_URL.trim()),
        hasToken: !!(env.AUDIT_UPSTREAM_TOKEN && env.AUDIT_UPSTREAM_TOKEN.trim()),
        willFail: !(env.AUDIT_UPSTREAM_URL && env.AUDIT_UPSTREAM_TOKEN)
      }
    }),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store'
      }
    }
  );
}
