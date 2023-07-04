import { A as API_URL } from './private-f8066d57.js';
import { a as error } from './handler-5880edf8.js';

const load = async ({ cookies, locals }) => {
  const session = cookies.get("session");
  let options = {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (session) {
    options.headers = {
      ...options.headers,
      authorization: session.toString()
    };
  }
  const response = await fetch(`${API_URL}/blog`, options);
  let json = await response.json();
  json = json.map((post) => ({
    ...post,
    searchTerms: `${post.title} ${post.description} ${post.tags.join(" ")} ${post.category}`
  }));
  if (!response.ok) {
    console.log(json[0].error);
    throw error(500);
  } else {
    return { posts: json };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 7;
const component = async () => (await import('./_page.svelte-7f6a1c47.js')).default;
const server_id = "src/routes/blog/+page.server.ts";
const imports = ["_app/immutable/nodes/7.d6dd4e7d.js","_app/immutable/chunks/scheduler.2790c315.js","_app/immutable/chunks/index.6fb2ffa8.js","_app/immutable/chunks/Icon.1a6649c9.js","_app/immutable/chunks/index.d8780abe.js","_app/immutable/chunks/eye.66b15b54.js","_app/immutable/chunks/utilities.54280924.js","_app/immutable/chunks/search.c1f95579.js"];
const stylesheets = ["_app/immutable/assets/Icon.4f1e9ba5.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-718b9435.js.map
