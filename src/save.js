export default {
  async fetch(request, env, ctx) {
    let uid = null;
    for (const cookie of request.headers.get("cookie")) {
        const [k, v] = cookie.split('=');
        if (k === "__uid") uid = JSON.parse(decodeURIComponent(v));
    }
    await request.json().then(v => env.KV.put(uid, JSON.stringify(v)));
    return new Response(JSON.stringify({status: uid ? "success" : "error"}));
  },
};
