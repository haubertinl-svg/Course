// Cloudflare Worker : échange le code Strava contre un token sans exposer le secret.
// Variables à définir : CLIENT_ID, CLIENT_SECRET (secret), ALLOWED_ORIGIN (ex. https://pseudo.github.io)
export default {
  async fetch(req, env) {
    const o = env.ALLOWED_ORIGIN;
    const h = {
      'Access-Control-Allow-Origin': o,
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Content-Type': 'application/json'
    };
    if (req.method === 'OPTIONS') return new Response(null, { headers: h });
    if (req.method !== 'POST' || req.headers.get('Origin') !== o)
      return new Response('{}', { status: 403, headers: h });
    const p = new URL(req.url).pathname;
    const b = await req.json();
    let body;
    if (p === '/token') body = { grant_type: 'authorization_code', code: b.code };
    else if (p === '/refresh') body = { grant_type: 'refresh_token', refresh_token: b.refresh_token };
    else return new Response('{}', { status: 404, headers: h });
    const r = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: env.CLIENT_ID, client_secret: env.CLIENT_SECRET, ...body })
    });
    const j = await r.json();
    return new Response(JSON.stringify({
      access_token: j.access_token, refresh_token: j.refresh_token, expires_at: j.expires_at
    }), { status: r.status, headers: h });
  }
};
