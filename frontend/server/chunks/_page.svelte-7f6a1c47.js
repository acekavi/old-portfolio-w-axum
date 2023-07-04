import { c as create_ssr_component, q as onDestroy, v as validate_component, b as add_attribute, k as each, s as subscribe, g as escape, y as noop } from './handler-5880edf8.js';
import { E as Eye$1 } from './eye-cbb9ddb5.js';
import { f as formatDate, H as Heart$1, a as Hash$1 } from './utilities-2c60c4f2.js';
import { c as createSearchStore, s as searchHandler, S as Search$1 } from './search-eabceaaa.js';

const PostLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let updated_at;
  let { post } = $$props;
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  updated_at = formatDate(post.updated_at);
  return `<a${add_attribute("href", `/blog/${post.slug}`, 0)} class="border-b border-gray-500/10" data-sveltekit-preload-data="off"><div class="w-full hover:bg-primary-500 p-4"><p class="text-4xl font-bold font-serif mb-2">${escape(post.title)}</p> <div class="flex flex-wrap gap-2 lg:gap-0"><div class="flex border-e border-gray-500/50 pe-2">${validate_component(Eye$1, "Eye").$$render($$result, { size: "16px" }, {}, {})} <p class="ps-1 text-sm leading-4">${escape(post.views)}</p></div> <div class="flex border-e border-gray-500/50 px-2">${validate_component(Heart$1, "Heart").$$render($$result, { size: "16px" }, {}, {})} <p class="ps-1 text-sm leading-4">${escape(post.like_count)}</p></div> <p class="text-sm leading-4 border-e border-gray-500/50 px-2">${escape(updated_at)}</p> <p class="text-sm px-2 leading-4">${escape(post.category)}</p></div> <p class="text-xl font-monospace line-clamp-3 my-2">${escape(post.description)}</p> <div class="flex">${each(post.tags, (tag) => {
    return `<span class="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-blue-700/10 mx-1">${validate_component(Hash$1, "Hash").$$render($$result, { size: "12px" }, {}, {})}${escape(tag)}</span>`;
  })}</div></div></a>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let searchStore;
  let unsubscribe;
  let $searchStore, $$unsubscribe_searchStore = noop, $$subscribe_searchStore = () => ($$unsubscribe_searchStore(), $$unsubscribe_searchStore = subscribe(searchStore, ($$value) => $searchStore = $$value), searchStore);
  let { data } = $$props;
  onDestroy(() => {
    unsubscribe();
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$subscribe_searchStore(searchStore = createSearchStore(data.posts));
  unsubscribe = searchStore.subscribe((model) => searchHandler(model));
  $$unsubscribe_searchStore();
  return `${$$result.head += `<!-- HEAD_svelte-1nq2itw_START -->${$$result.title = `<title>Personal Blog</title>`, ""}<meta name="description" content="Avishka Kavinda's Personal Blog Site: Exploring My Career Journey and Sharing Insights"><!-- HEAD_svelte-1nq2itw_END -->`, ""} <p class="lg:text-9xl text-3xl font-heading-token font-extrabold mx-auto" data-svelte-h="svelte-1751xg1">Join the journey</p> <div class="flex flex-row">${data.posts ? `<div class="flex flex-col justify-center lg:w-3/5 w-4/5 mx-auto"><label class="label my-8"><div class="input-group input-group-divider grid-cols-[auto_1fr_auto] variant-form-material"><div class="input-group-shim">${validate_component(Search$1, "Search").$$render($$result, {}, {}, {})}</div> <input type="search" placeholder="Search..."${add_attribute("value", $searchStore.search, 0)}></div></label> ${$searchStore.filtered.length ? each($searchStore.filtered, (post) => {
    return `${validate_component(PostLink, "PostLink").$$render($$result, { post }, {}, {})}`;
  }) : ` <p class="text-5xl font-sans my-auto text-center" data-svelte-h="svelte-jfcrqb">No blog posts availabe at the time<br>Come back later.
				</p>`}</div>` : ``}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-7f6a1c47.js.map
