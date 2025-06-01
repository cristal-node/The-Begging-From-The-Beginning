export default {
  async fetch(request, env, ctx) {
    let uid = null;
    for (const cookie of request.headers.get("cookie")) {
        const [k, v] = cookie.split('=');
        if (k === "__uid") uid = decodeURIComponent(v);
    }
    if (uid) return new Response(await env.KV.get(uid));
    else return new Response(JSON.stringify({status: "error"}), {status: 400});
  },
};
