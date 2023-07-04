import { c as create_ssr_component, v as validate_component } from './handler-5880edf8.js';
import { I as Icon$1 } from './Icon-e8a169f2.js';

const Eye = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
      }
    ],
    ["circle", { "cx": "12", "cy": "12", "r": "3" }]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "eye" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Eye$1 = Eye;

export { Eye$1 as E };
//# sourceMappingURL=eye-cbb9ddb5.js.map
