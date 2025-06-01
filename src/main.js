const success_res = () => new Response(JSON.stringify({
  status: "success",
}), {headers: {"Content-Type": "application/json"}});

const err_res = () => new Response(JSON.stringify({
    status: "error",
}), {status: 400, headers: {"Content-Type": "application/json"}});

const login = () => new Response("", {
  status: 302,
  headers: {
    "Set-Cookie": `__uid=${crypto.randomUUID()}; Max-Age=604800; Path=/; Secure; SameSite=Strict`,
    Location: "/welcome.html",
  }
})

  function cookie(headers, key) {
    const cookieHeader = headers.get("cookie");
    if (!cookieHeader) return null;

    const cookies = cookieHeader.split('; ');
    for (const __cookie of cookies) {
      const [k, ...v] = __cookie.split('=');
      if (k.trim() === key) return decodeURIComponent(v.join('='));
    }
    return null;
  }

async function state(env, uid) {
  return new Response((await env.KV.get(uid) ?? "{}" ),
    {headers: {"Content-Type": "application/json"}});
}

async function save(request, env, uid) {
    if (request.method !== "POST") return err_res();
    await request.json().then(v => 
      env.KV.put(uid, JSON.stringify(v)));
    return success_res();
}

export default {
  async fetch(request, env, ctx) {
    const path = (new URL(request.url)).pathname;

    const uid = cookie(request.headers, "__uid")
    if (!uid) return login();

    if (path === "/save") return await save(request, env, uid);
    else if (path === "/state") return await state(env, uid);
    else return login();  
  },
};
