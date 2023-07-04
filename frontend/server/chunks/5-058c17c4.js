import { A as API_URL } from './private-f8066d57.js';
import { a as error, f as fail, r as redirect } from './handler-5880edf8.js';
import { m as markdownToHtml } from './markdownToHtml-447e9943.js';

const load = async ({ cookies, params, parent }) => {
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
  const post_response = await fetch(`${API_URL}/blog/${params.slug}`, options);
  let post = await post_response.json().then((post2) => {
    markdownToHtml(post2.content);
    return post2;
  });
  if (!post_response.ok) {
    console.log(post.error);
    throw error(404);
  }
  return { post };
};
const actions = {
  edit_post: async ({ cookies, request, params }) => {
    const data = await request.formData();
    const title = data.get("title");
    const content = data.get("content");
    const description = data.get("description");
    const category = data.get("category");
    const tags = data.getAll("tags");
    const is_draft = data.get("is_draft") === null ? false : true;
    const session = cookies.get("session");
    let options = {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    };
    let body = {
      title: title?.toString(),
      description: description?.toString(),
      content: content?.toString(),
      category: category?.toString(),
      tags: tags.map((tag) => String(tag)),
      is_draft
    };
    if (session) {
      options.headers = {
        ...options.headers,
        authorization: session
      };
    } else {
      return fail(422, {
        post: body,
        error: "Please log in to update this post!"
      });
    }
    options.body = JSON.stringify(body);
    const response = await fetch(`${API_URL}/blog/${params.slug}`, options);
    const json = await response.json();
    if (!response.ok) {
      if (json.error) {
        return fail(422, {
          post: body,
          error: json.error
        });
      }
    }
    return {
      post: body,
      message: "Your post has been updated!"
    };
  },
  delete_post: async ({ cookies, params, request }) => {
    const session = cookies.get("session");
    let options = {
      method: "DELETE",
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
    const response = await fetch(`${API_URL}/blog/${params.slug}`, options);
    const json = await response.json();
    if (!response.ok) {
      if (json.error) {
        return fail(422, {
          error: json.error
        });
      }
    }
    throw redirect(302, "/admin");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 5;
const component = async () => (await import('./_page.svelte-b54081d8.js')).default;
const server_id = "src/routes/admin/[slug]/+page.server.ts";
const imports = ["_app/immutable/nodes/5.d612da23.js","_app/immutable/chunks/scheduler.2790c315.js","_app/immutable/chunks/index.6fb2ffa8.js","_app/immutable/chunks/stores.f1aee633.js","_app/immutable/chunks/index.d8780abe.js","_app/immutable/chunks/index.78cae565.js","_app/immutable/chunks/Icon.1a6649c9.js","_app/immutable/chunks/SlideToggle.4a2dc2ec.js","_app/immutable/chunks/index.be47aef7.js"];
const stylesheets = ["_app/immutable/assets/Icon.4f1e9ba5.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-058c17c4.js.map
