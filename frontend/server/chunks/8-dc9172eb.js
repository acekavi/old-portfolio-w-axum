import { A as API_URL } from './private-f8066d57.js';
import { m as markdownToHtml } from './markdownToHtml-447e9943.js';
import { a as error, f as fail } from './handler-5880edf8.js';

const load = async ({ cookies, params, parent }) => {
  const { user } = await parent();
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
  const comment_response = await fetch(`${API_URL}/blog/${params.slug}/comment`, options);
  const post = await post_response.json().then((post2) => {
    post2.html = markdownToHtml(post2.content);
    return post2;
  });
  const comments = await comment_response.json();
  if (!post_response.ok) {
    console.log("Post Response Error: " + post.error);
    throw error(404);
  }
  if (!comment_response.ok) {
    console.log("Comment Response Error: " + comments[0].error);
    throw error(500);
  }
  return {
    props: {
      post,
      comments,
      user: user ?? null
    }
  };
};
const actions = {
  like: async ({ cookies, params }) => {
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
    const response = await fetch(`${API_URL}/blog/${params.slug}/like`, options);
    const json = await response.json();
    if (!response.ok) {
      if (json.error) {
        return fail(422, {
          error: json.error
        });
      }
    }
    return { message: json.message ? "Glad you liked it!" : "You unliked the post" };
  },
  comment: async ({ cookies, params, request }) => {
    const data = await request.formData();
    const content = data.get("content");
    const parent_id = data.get("parent_id");
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
        error: "Please log in to comment on this post"
      });
    }
    if (content && parent_id) {
      options.body = JSON.stringify({
        content: content.toString(),
        is_reply: true,
        parent_id: parent_id.toString()
      });
    } else if (content && !parent_id) {
      options.body = JSON.stringify({
        content: content.toString(),
        is_reply: false
      });
    } else {
      return fail(422, {
        error: "Cannot post empty comments"
      });
    }
    const response = await fetch(`${API_URL}/blog/${params.slug}/comment`, options);
    const json = await response.json();
    if (!response.ok) {
      if (json.error) {
        return fail(422, {
          error: json.error
        });
      }
    }
    return { message: "Your comment has been added!" };
  },
  delete_comment: async ({ cookies, params, request }) => {
    const data = await request.formData();
    const session = cookies.get("session");
    const comment_id = data.get("comment_id");
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
        error: "Please log in to delete this comment"
      });
    }
    if (!comment_id) {
      return fail(422, {
        error: "You don't have permission to delete this comment"
      });
    } else {
      options.body = JSON.stringify({ comment_id: comment_id.toString() });
    }
    const response = await fetch(`${API_URL}/blog/${params.slug}/comment`, options);
    const json = await response.json();
    if (!response.ok) {
      if (json.error) {
        return fail(422, {
          error: json.error
        });
      }
    }
    return { message: "Your comment has been deleted!" };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 8;
const component = async () => (await import('./_page.svelte-826aebd5.js')).default;
const server_id = "src/routes/blog/[slug]/+page.server.ts";
const imports = ["_app/immutable/nodes/8.239d3d76.js","_app/immutable/chunks/scheduler.2790c315.js","_app/immutable/chunks/index.6fb2ffa8.js","_app/immutable/chunks/Icon.1a6649c9.js","_app/immutable/chunks/index.d8780abe.js","_app/immutable/chunks/eye.66b15b54.js","_app/immutable/chunks/utilities.54280924.js","_app/immutable/chunks/stores.f94d5c4b.js","_app/immutable/chunks/singletons.8444298e.js","_app/immutable/chunks/forms.d64db6df.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/index.78cae565.js","_app/immutable/chunks/popup.334bcd87.js","_app/immutable/chunks/config.23e6fb4d.js","_app/immutable/chunks/stores.f1aee633.js","_app/immutable/chunks/Avatar.a6c1305c.js"];
const stylesheets = ["_app/immutable/assets/Icon.4f1e9ba5.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-dc9172eb.js.map
