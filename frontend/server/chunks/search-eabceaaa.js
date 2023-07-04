import { w as writable, c as create_ssr_component, v as validate_component } from './handler-5880edf8.js';
import { I as Icon$1 } from './Icon-e8a169f2.js';

const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "11", "cy": "11", "r": "8" }],
    ["path", { "d": "m21 21-4.3-4.3" }]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "search" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Search$1 = Search;
const createSearchStore = (data) => {
  const { subscribe, set, update } = writable({
    data,
    filtered: data,
    search: ""
  });
  return {
    subscribe,
    set,
    update
  };
};
const searchHandler = (store) => {
  const searchTerm = store.search.toLowerCase() || "";
  store.filtered = store.data.filter((item) => {
    return item.searchTerms.toLowerCase().includes(searchTerm);
  });
};

export { Search$1 as S, createSearchStore as c, searchHandler as s };
//# sourceMappingURL=search-eabceaaa.js.map
