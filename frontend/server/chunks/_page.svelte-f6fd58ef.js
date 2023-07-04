import { c as create_ssr_component, s as subscribe, q as onDestroy, b as add_attribute, g as escape, v as validate_component, k as each } from './handler-5880edf8.js';
import { I as Icon$1 } from './Icon-e8a169f2.js';
import { I as InputChip, S as SlideToggle } from './SlideToggle-3ae1380a.js';
import { L as Loader2 } from './loader-2-ae42cf53.js';
import { c as createSearchStore, s as searchHandler, S as Search$1 } from './search-eabceaaa.js';

const Plus_square = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "8",
        "y2": "16"
      }
    ],
    [
      "line",
      {
        "x1": "8",
        "x2": "16",
        "y1": "12",
        "y2": "12"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "plus-square" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const PlusSquare = Plus_square;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isLoading;
  let $searchStore, $$unsubscribe_searchStore;
  let { data } = $$props;
  let { form } = $$props;
  const searchStore = createSearchStore(data.posts);
  $$unsubscribe_searchStore = subscribe(searchStore, (value) => $searchStore = value);
  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));
  onDestroy(() => {
    unsubscribe();
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  isLoading = false;
  $$unsubscribe_searchStore();
  return `${$$result.head += `<!-- HEAD_svelte-1dluu7j_START -->${$$result.title = `<title>Admin Panel</title>`, ""}<meta name="description" content="Avishka Kavinda's Personal Blog Site: Exploring My Career Journey and Sharing Insights"><!-- HEAD_svelte-1dluu7j_END -->`, ""} <p class="lg:text-9xl text-3xl font-heading-token font-extrabold ms-4 lg:mx-auto text-center" data-svelte-h="svelte-pua9lh">Admin Panel</p> <div class="lg:grid lg:grid-flow-col lg:grid-rows-1 lg:grid-cols-2 flex flex-col gap-8 my-8"><main class="w-4/5 mx-auto overflow-y-scroll"><div class="my-auto flex-col justify-center align-middle"><p class="text-5xl font-bold h1 mb-4" data-svelte-h="svelte-k5c5d1">Add a new Post!</p> <form method="POST" action="?/add_post"><div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6"><label class="label col-span-full"><span class="font-semibold" data-svelte-h="svelte-11ydy4y">Title</span> <input class="input variant-form-material leading-5" title="Title" name="title" type="text" placeholder="Title for the post"${add_attribute("value", form?.title || "", 0)} autocomplete="off"></label> <label class="label col-span-full"><span class="font-semibold" data-svelte-h="svelte-xvmz5i">Description</span> <textarea class="textarea variant-form-material leading-5 resize-none" name="description" rows="2" placeholder="Description for the post">${escape(form?.description || "", false)}</textarea></label> <label class="label col-span-full"><span class="font-semibold" data-svelte-h="svelte-uiy92z">Content</span> <textarea class="textarea variant-form-material leading-5 resize-none" name="content" rows="20" placeholder="Content for the post in Markdown">${escape(form?.content || "", false)}</textarea></label> <label class="label col-span-full"><span class="font-semibold" data-svelte-h="svelte-1ccbyxs">Category</span> <input class="input variant-form-material leading-5" title="Category" name="category" type="text" placeholder="Category of the post"${add_attribute("value", form?.category || "", 0)} autocomplete="off"></label> <div class="col-span-full"><label for="tags" class="block mb-1 text-sm font-semibold leading-6" data-svelte-h="svelte-r3loyz">Tags</label> ${validate_component(InputChip, "InputChip").$$render(
    $$result,
    {
      name: "tags",
      placeholder: "Tags for the post",
      rounded: "rounded-none",
      padding: "py-1 px-2",
      value: form?.tags || []
    },
    {},
    {}
  )}</div> <div class="col-span-full flex"><label for="is_draft" class="block mb-1 text-sm font-semibold leading-6 me-4" data-svelte-h="svelte-7oskjw">Draft</label> ${validate_component(SlideToggle, "SlideToggle").$$render(
    $$result,
    {
      name: "is_draft",
      label: "Draft",
      size: "sm",
      checked: form?.is_draft || false
    },
    {},
    {}
  )}</div> <div class="col-span-full"><button type="submit" class="btn variant-glass-primary mt-4"><span data-svelte-h="svelte-1qrnjzd">Add Post</span> ${isLoading ? `${validate_component(Loader2, "Loader2").$$render($$result, { class: "animate-spin" }, {}, {})}` : `<span>${validate_component(PlusSquare, "PlusSquare").$$render($$result, { "stroke-width": "1.25", size: "18px" }, {}, {})}</span>`}</button></div></div></form></div></main> ${data.posts ? `<div class="flex flex-col"><label class="label my-8"><div class="input-group input-group-divider grid-cols-[auto_1fr_auto] variant-form-material"><div class="input-group-shim">${validate_component(Search$1, "Search").$$render($$result, {}, {}, {})}</div> <input type="search" placeholder="Search..."${add_attribute("value", $searchStore.search, 0)}></div></label> ${$searchStore.filtered.length ? each($searchStore.filtered, (post) => {
    return `<a${add_attribute("href", `/admin/${post.slug}`, 0)} class="border-b border-gray-500/10" data-sveltekit-preload-data="off"><div class="w-full hover:bg-primary-500 p-4"><p class="text-4xl font-bold font-serif mb-2">${escape(post.title)}</p> <p class="text-xl font-monospace line-clamp-3 my-2">${escape(post.description)}</p></div> </a>`;
  }) : ` <div class="flex flex-row h-screen justify-center text-center" data-svelte-h="svelte-15tppu8"><p class="text-5xl font-sans my-auto">No blog posts availabe at the time<br>Come back later.</p> </div>`}</div>` : ``}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-f6fd58ef.js.map
