import { c as create_ssr_component, g as escape, b as add_attribute, v as validate_component } from './handler-5880edf8.js';
import { t as toastStore } from './stores-e8b99d89.js';
import { I as Icon$1 } from './Icon-e8a169f2.js';
import { I as InputChip, S as SlideToggle } from './SlideToggle-3ae1380a.js';

const Edit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      }
    ],
    [
      "path",
      {
        "d": "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "edit" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Edit$1 = Edit;
const X_square = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2",
        "ry": "2"
      }
    ],
    ["path", { "d": "m15 9-6 6" }],
    ["path", { "d": "m9 9 6 6" }]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "x-square" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const XSquare = X_square;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  let current_post;
  if (data) {
    current_post = {
      title: data.post.title,
      description: data.post.description,
      content: data.post.content,
      category: data.post.category,
      tags: data.post.tags,
      is_draft: data.post.is_draft
    };
  }
  if (form) {
    current_post = {
      title: form.post?.title ?? "",
      description: form.post?.description ?? "",
      content: form.post?.content ?? "",
      category: form.post?.category ?? "",
      tags: form.post?.tags ?? [],
      is_draft: form.post?.is_draft ?? false
    };
  }
  let deleteButton;
  if (form) {
    if (form?.message) {
      toastStore.trigger({
        // @ts-ignore
        message: form.message,
        timeout: 5e3,
        background: "variant-glass-success"
      });
    } else {
      toastStore.trigger({
        // @ts-ignore
        message: form.error,
        timeout: 5e3,
        background: "variant-glass-error"
      });
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `${$$result.head += `<!-- HEAD_svelte-135x2r7_START -->${$$result.title = `<title>Admin : ${escape(current_post.title)}</title>`, ""}<meta name="description" content="Avishka Kavinda's Personal Blog Site: Exploring My Career Journey and Sharing Insights"><!-- HEAD_svelte-135x2r7_END -->`, ""} <p class="lg:text-9xl text-3xl font-heading-token font-extrabold ms-4 lg:mx-auto text-center" data-svelte-h="svelte-pua9lh">Admin Panel</p> <main class="w-3/5 mx-auto overflow-y-scroll"><div class="my-auto flex-col justify-center align-middle"><p class="text-5xl font-bold h1 mb-4" data-svelte-h="svelte-mozku9">Edit Post!</p> <form method="POST" action="?/edit_post"><div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6"><label class="label col-span-full"><span class="font-semibold" data-svelte-h="svelte-11ydy4y">Title</span> <input class="input variant-form-material leading-5" title="Title" name="title" type="text" placeholder="Title for the post"${add_attribute("value", current_post.title, 0)} autocomplete="off"></label> <label class="label col-span-full"><span class="font-semibold" data-svelte-h="svelte-xvmz5i">Description</span> <textarea class="textarea variant-form-material leading-5 resize-none" name="description" rows="2" placeholder="Description for the post">${escape(current_post.description, false)}</textarea></label> <label class="label col-span-full"><span class="font-semibold" data-svelte-h="svelte-uiy92z">Content</span> <textarea class="textarea variant-form-material leading-5 resize-none" name="content" rows="20" placeholder="Content for the post in Markdown">${escape(current_post.content, false)}</textarea></label> <label class="label col-span-full"><span class="font-semibold" data-svelte-h="svelte-1ccbyxs">Category</span> <input class="input variant-form-material leading-5" title="Category" name="category" type="text" placeholder="Category of the post"${add_attribute("value", current_post.category, 0)} autocomplete="off"></label> <div class="col-span-full"><label for="tags" class="block mb-1 text-sm leading-6 font-semibold" data-svelte-h="svelte-fhqmaj">Tags</label> ${validate_component(InputChip, "InputChip").$$render(
    $$result,
    {
      name: "tags",
      placeholder: "Tags for the post",
      rounded: "rounded-none",
      padding: "py-1 px-2",
      value: current_post.tags
    },
    {},
    {}
  )}</div> <div class="col-span-full flex"><label for="is_draft" class="block mb-1 text-sm font-semibold leading-6 me-4" data-svelte-h="svelte-aap7za">Draft</label> ${validate_component(SlideToggle, "SlideToggle").$$render(
    $$result,
    {
      name: "is_draft",
      label: "Draft",
      size: "sm",
      checked: current_post.is_draft
    },
    {},
    {}
  )}</div> <div class="col-span-full mb-8"><button type="submit" class="btn variant-glass-success mt-4"><span data-svelte-h="svelte-ne6z9m">Edit current_post</span> <span>${validate_component(Edit$1, "Edit").$$render($$result, { "stroke-width": "1.25", size: "18px" }, {}, {})}</span></button> <button class="btn variant-glass-error mt-4"><span data-svelte-h="svelte-h0fc4p">Delete current_post</span> <span>${validate_component(XSquare, "XSquare").$$render($$result, { "stroke-width": "1.25", size: "18px" }, {}, {})}</span></button> <form action="?/delete_post" method="post"><button class="hidden" type="submit"${add_attribute("this", deleteButton, 0)}></button></form></div></div></form></div></main>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-b54081d8.js.map
