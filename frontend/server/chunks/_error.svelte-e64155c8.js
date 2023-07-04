import { c as create_ssr_component, s as subscribe, g as escape, b as add_attribute } from './handler-5880edf8.js';
import { p as page } from './stores2-fc3510c9.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1gbuk8t_START -->${$$result.title = `<title>Error : ${escape($page.status)}</title>`, ""}<meta name="description"${add_attribute("content", $page.error?.message, 0)}><!-- HEAD_svelte-1gbuk8t_END -->`, ""} <div class="bg-scales-light dark:bg-scales-dark bg-contain bg-center bg-fixed h-screen w-screen flex flex-col justify-center overflow-hidden"><div class="motion-safe:animate-float mx-auto" data-svelte-h="svelte-rjazpm"><img src="/astronaut_confused.svg" alt="Astronaut in space" srcset="" width="200px"></div> <div class="text-center"><p class="text-9xl font-mono font-extrabold">${escape($page.status)}</p> ${$page.status === 404 ? `<p class="text-5xl uppercase font-serif font-semibold" data-svelte-h="svelte-p3v6fo">Are you lost baby girl?</p>` : `<p class="text-5xl uppercase font-serif font-semibold">${escape($page.error?.message)}</p>`}</div> <div class="flex flex-row justify-center pt-8" data-svelte-h="svelte-1iikwa"><a href="/" target="_self" class="btn btn-sm rounded variant-ghost-surface m-4 uppercase">Let&#39;s get you home</a> <a href="/blog" target="_self" class="btn btn-sm rounded variant-ghost-surface m-4 uppercase">Or read my blog</a></div></div>`;
});

export { Error as default };
//# sourceMappingURL=_error.svelte-e64155c8.js.map
