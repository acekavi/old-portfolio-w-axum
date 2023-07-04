import { A as API_URL } from './private-f8066d57.js';
import { a as error, f as fail } from './handler-5880edf8.js';

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
  const response = await fetch(`${API_URL}/blog/all`, options);
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
const actions = {
  add_post: async ({ cookies, request }) => {
    const data = await request.formData();
    const title = data.get("title");
    const content = data.get("content");
    const description = data.get("description");
    const category = data.get("category");
    const tags = data.getAll("tags");
    const is_draft = data.get("is_draft") === null ? false : true;
    const session = cookies.get("session");
    let options = {
      method: "POST",
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
    } else {
      return fail(422, {
        error: "Nice try Bitch!"
      });
    }
    if (title && content && description && category && tags) {
      options.body = JSON.stringify({
        title: title.toString(),
        description: description.toString(),
        content: content.toString(),
        category: category.toString(),
        tags,
        is_draft
      });
    } else {
      return fail(422, {
        title: title?.toString() || "",
        description: description?.toString() || "",
        content: content?.toString() || "",
        category: category?.toString() || "",
        tags: tags || [],
        is_draft: is_draft ? true : false,
        error: "Please fill all the fields!"
      });
    }
    const response = await fetch(`${API_URL}/blog`, options);
    const json = await response.json();
    if (!response.ok) {
      if (json.error) {
        return fail(422, {
          title: title.toString() || "",
          description: description.toString() || "",
          content: content.toString() || "",
          category: category.toString() || "",
          tags: tags || [],
          is_draft: is_draft ? true : false,
          error: json.error
        });
      }
    }
    return { message: "Your post has been added!" };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 4;
const component = async () => (await import('./_page.svelte-f6fd58ef.js')).default;
const server_id = "src/routes/admin/+page.server.ts";
const imports = ["_app/immutable/nodes/4.2677b0e2.js","_app/immutable/chunks/scheduler.2790c315.js","_app/immutable/chunks/index.6fb2ffa8.js","_app/immutable/chunks/Icon.1a6649c9.js","_app/immutable/chunks/index.d8780abe.js","_app/immutable/chunks/index.78cae565.js","_app/immutable/chunks/SlideToggle.4a2dc2ec.js","_app/immutable/chunks/index.be47aef7.js","_app/immutable/chunks/forms.d64db6df.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.8444298e.js","_app/immutable/chunks/search.c1f95579.js"];
const stylesheets = ["_app/immutable/assets/Icon.4f1e9ba5.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-4574409e.js.map
