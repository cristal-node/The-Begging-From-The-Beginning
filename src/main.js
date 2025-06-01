const success_res = () => new Response(JSON.stringify({
  status: "success",
}));

const err_res = () => new Response(JSON.stringify({
    status: "error",
}), {status: 400});

const login = () => new Response("", {
  headers: {
    "Set-Cookie": `__uid=${crypto.randomUUID()}; HttpOnly; Max-Age=604800; Path=/; Secure`,
    Location: "/welcome.html",
  }
})

function cookie(headers, key) {
  for (const __cookie of headers.get("cookie")) {
    const [k, v] = __cookie.split('=');
    if (k === key) return decodeURIComponent(v);
  }
  return null;
}

async function state(request) {
  return new Response((await env.KV.get(uid)) ?? JSON.stringify({}));
}

async function save(request, env) {
    if (request.method !== "POST") return err_res();
    await request.json().then(v => env.KV.put(uid, JSON.stringify(v)));
    return success_res();
}

export default {
  async fetch(request, env, ctx) {
    if (!cookie(request.headers, "__uid")) return login();
    const path = (new URL(request.url)).pathname;
    if (path === "/save") return await save(request, env);
    else if (path === "/state") return await state(request, env);
    else return login();  
  },
};
