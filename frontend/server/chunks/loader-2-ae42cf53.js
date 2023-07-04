import { c as create_ssr_component, v as validate_component } from './handler-5880edf8.js';
import { I as Icon$1 } from './Icon-e8a169f2.js';

const Loader_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M21 12a9 9 0 1 1-6.219-8.56" }]];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "loader-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Loader2 = Loader_2;

export { Loader2 as L };
//# sourceMappingURL=loader-2-ae42cf53.js.map
