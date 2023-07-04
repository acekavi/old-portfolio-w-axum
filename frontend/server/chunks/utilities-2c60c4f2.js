import { c as create_ssr_component, v as validate_component } from './handler-5880edf8.js';
import { I as Icon$1 } from './Icon-e8a169f2.js';

const Hash = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "9",
        "y2": "9"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "15",
        "y2": "15"
      }
    ],
    [
      "line",
      {
        "x1": "10",
        "x2": "8",
        "y1": "3",
        "y2": "21"
      }
    ],
    [
      "line",
      {
        "x1": "16",
        "x2": "14",
        "y1": "3",
        "y2": "21"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "hash" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Hash$1 = Hash;
const Heart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "heart" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Heart$1 = Heart;
function formatDate(epochTime) {
  const date = new Date(epochTime * 1e3);
  return date.toLocaleDateString("en-GB", { timeZone: "UTC", dateStyle: "long" });
}

export { Heart$1 as H, Hash$1 as a, formatDate as f };
//# sourceMappingURL=utilities-2c60c4f2.js.map
