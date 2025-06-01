export default {
  async fetch(request, env, ctx) {
    return new Response("<head><script>window.location="../index.html"</script></head>");
  },
};
