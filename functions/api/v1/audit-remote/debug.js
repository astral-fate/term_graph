/**
 * Diagnostic: confirms Pages env bindings visible to Functions.
 * Masks secrets to prevent exposure while allowing verification.
 * GET /api/v1/audit-remote/debug
 */
export async function onRequestGet(context) {
  const { env } = context;
  
  function getEnv(key) {
    if (env[key] !== undefined) return { val: env[key], exact: true };
    const trimmed = key.trim();
    for (const k in env) {
      if (k.trim() === trimmed) return { val: env[k], exact: false, keyFound: k };
    }
    return { val: undefined, exact: false };
  }

  function mask(s) {
    if (!s) return "(empty)";
    const val = String(s).trim();
    if (val.length <= 4) return "****";
    return val.slice(0, 2) + "..." + val.slice(-2) + " (" + val.length + " chars)";
  }

  const allKeys = Object.keys(env).sort();
  const urlRes = getEnv('AUDIT_UPSTREAM_URL');
  const tokRes = getEnv('AUDIT_UPSTREAM_TOKEN');
  const hfRes = getEnv('AUDIT_HF_READ_TOKEN');
  
  return new Response(
    JSON.stringify({
      ok: true,
      timestamp: new Date().toISOString(),
      environment: {
        keysFound: allKeys,
        count: allKeys.length
      },
      expectedVariables: {
        AUDIT_UPSTREAM_URL: urlRes.val ? urlRes.val.replace(/(https?:\/\/)(.*)/, "$1***") : "(missing)",
        AUDIT_UPSTREAM_URL_EXACT: urlRes.exact,
        AUDIT_UPSTREAM_URL_KEY: urlRes.keyFound || 'AUDIT_UPSTREAM_URL',
        AUDIT_UPSTREAM_TOKEN: mask(tokRes.val),
        AUDIT_UPSTREAM_TOKEN_EXACT: tokRes.exact,
        AUDIT_HF_READ_TOKEN: mask(hfRes.val)
      },
      check: {
        hasBase: !!(urlRes.val && urlRes.val.trim()),
        hasToken: !!(tokRes.val && tokRes.val.trim()),
        willFail: !(urlRes.val && tokRes.val)
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
