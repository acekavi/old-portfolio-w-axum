import { c as create_ssr_component, b as add_attribute, v as validate_component, l as setContext, g as escape, d as createEventDispatcher, n as getContext, s as subscribe, w as writable, o as compute_slots } from './handler-5880edf8.js';
import { I as Icon$1 } from './Icon-e8a169f2.js';
import { A as Avatar } from './Avatar-3a0f535e.js';
import { d as description } from './config-1f567595.js';

function filter(node, filterName) {
  if (filterName === void 0)
    return;
  const applyFilter = () => {
    node.setAttribute("style", `filter: url("${filterName}")`);
  };
  applyFilter();
  return {
    update(newArgs) {
      filterName = newArgs;
      applyFilter();
    }
  };
}
const Accordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let { autocollapse = false } = $$props;
  let { duration = 200 } = $$props;
  let { width = "w-full" } = $$props;
  let { spacing = "space-y-1" } = $$props;
  let { disabled = false } = $$props;
  let { padding = "py-2 px-4" } = $$props;
  let { hover = "hover:bg-primary-hover-token" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { caretOpen = "rotate-180" } = $$props;
  let { caretClosed = "" } = $$props;
  let { regionControl = "" } = $$props;
  let { regionPanel = "space-y-4" } = $$props;
  let { regionCaret = "" } = $$props;
  const active = writable(null);
  setContext("active", active);
  setContext("autocollapse", autocollapse);
  setContext("duration", duration);
  setContext("disabled", disabled);
  setContext("padding", padding);
  setContext("hover", hover);
  setContext("rounded", rounded);
  setContext("caretOpen", caretOpen);
  setContext("caretClosed", caretClosed);
  setContext("regionControl", regionControl);
  setContext("regionPanel", regionPanel);
  setContext("regionCaret", regionCaret);
  if ($$props.autocollapse === void 0 && $$bindings.autocollapse && autocollapse !== void 0)
    $$bindings.autocollapse(autocollapse);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.caretOpen === void 0 && $$bindings.caretOpen && caretOpen !== void 0)
    $$bindings.caretOpen(caretOpen);
  if ($$props.caretClosed === void 0 && $$bindings.caretClosed && caretClosed !== void 0)
    $$bindings.caretClosed(caretClosed);
  if ($$props.regionControl === void 0 && $$bindings.regionControl && regionControl !== void 0)
    $$bindings.regionControl(regionControl);
  if ($$props.regionPanel === void 0 && $$bindings.regionPanel && regionPanel !== void 0)
    $$bindings.regionPanel(regionPanel);
  if ($$props.regionCaret === void 0 && $$bindings.regionCaret && regionCaret !== void 0)
    $$bindings.regionCaret(regionCaret);
  classesBase = `${width} ${spacing} ${$$props.class ?? ""}`;
  return ` <div class="${"accordion " + escape(classesBase, true)}" data-testid="accordion">${slots.default ? slots.default({}) : ``}</div>`;
});
const cBase = "";
const cControl = "text-left w-full flex items-center space-x-4";
const cControlCaret = "fill-current w-3 transition-transform duration-[200ms]";
const cPanel = "";
const AccordionItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let openState;
  let classesBase;
  let classesControl;
  let classesCaretState;
  let classesControlCaret;
  let classesPanel;
  let $$slots = compute_slots(slots);
  let $active, $$unsubscribe_active;
  const dispatch = createEventDispatcher();
  let { open = false } = $$props;
  let { id = String(Math.random()) } = $$props;
  let { autocollapse = getContext("autocollapse") } = $$props;
  let { active = getContext("active") } = $$props;
  $$unsubscribe_active = subscribe(active, (value) => $active = value);
  let { duration = getContext("duration") } = $$props;
  let { disabled = getContext("disabled") } = $$props;
  let { padding = getContext("padding") } = $$props;
  let { hover = getContext("hover") } = $$props;
  let { rounded = getContext("rounded") } = $$props;
  let { caretOpen = getContext("caretOpen") } = $$props;
  let { caretClosed = getContext("caretClosed") } = $$props;
  let { regionControl = getContext("regionControl") } = $$props;
  let { regionPanel = getContext("regionPanel") } = $$props;
  let { regionCaret = getContext("regionCaret") } = $$props;
  function setActive(event) {
    if (autocollapse === true) {
      active.set(id);
    } else {
      open = !open;
    }
    onToggle(event);
  }
  function onToggle(event) {
    const currentOpenState = autocollapse ? $active === id : open;
    dispatch("toggle", {
      event,
      id: `accordion-control-${id}`,
      open: currentOpenState,
      autocollapse
    });
  }
  if (autocollapse && open)
    setActive();
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.autocollapse === void 0 && $$bindings.autocollapse && autocollapse !== void 0)
    $$bindings.autocollapse(autocollapse);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.caretOpen === void 0 && $$bindings.caretOpen && caretOpen !== void 0)
    $$bindings.caretOpen(caretOpen);
  if ($$props.caretClosed === void 0 && $$bindings.caretClosed && caretClosed !== void 0)
    $$bindings.caretClosed(caretClosed);
  if ($$props.regionControl === void 0 && $$bindings.regionControl && regionControl !== void 0)
    $$bindings.regionControl(regionControl);
  if ($$props.regionPanel === void 0 && $$bindings.regionPanel && regionPanel !== void 0)
    $$bindings.regionPanel(regionPanel);
  if ($$props.regionCaret === void 0 && $$bindings.regionCaret && regionCaret !== void 0)
    $$bindings.regionCaret(regionCaret);
  {
    if (open && autocollapse)
      setActive();
  }
  openState = autocollapse ? $active === id : open;
  classesBase = `${cBase} ${$$props.class ?? ""}`;
  classesControl = `${cControl} ${padding} ${hover} ${rounded} ${regionControl}`;
  classesCaretState = openState ? caretOpen : caretClosed;
  classesControlCaret = `${cControlCaret} ${regionCaret} ${classesCaretState}`;
  classesPanel = `${cPanel} ${padding} ${rounded} ${regionPanel}`;
  $$unsubscribe_active();
  return ` <div class="${"accordion-item " + escape(classesBase, true)}" data-testid="accordion-item"> <button type="button" class="${"accordion-control " + escape(classesControl, true)}" id="${"accordion-control-" + escape(id, true)}"${add_attribute("aria-expanded", openState, 0)} aria-controls="${"accordion-panel-" + escape(id, true)}" ${disabled ? "disabled" : ""}> ${$$slots.lead ? `<div class="accordion-lead">${slots.lead ? slots.lead({}) : ``}</div>` : ``}  <div class="accordion-summary flex-1">${slots.summary ? slots.summary({}) : `(summary)`}</div>  <div class="${"accordion-summary-caret " + escape(classesControlCaret, true)}"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg></div></button>  ${openState ? `<div class="${"accordion-panel " + escape(classesPanel, true)}" id="${"accordion-panel-" + escape(id, true)}" role="region"${add_attribute("aria-hidden", !openState, 0)} aria-labelledby="${"accordion-control-" + escape(id, true)}">${slots.content ? slots.content({}) : `(content)`}</div>` : ``}</div>`;
});
const File_heart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M4 6V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H4"
      }
    ],
    ["polyline", { "points": "14 2 14 8 20 8" }],
    [
      "path",
      {
        "d": "M10.29 10.7a2.43 2.43 0 0 0-2.66-.52c-.29.12-.56.3-.78.53l-.35.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L6.5 18l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "file-heart" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const FileHeart = File_heart;
const Github = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      }
    ],
    ["path", { "d": "M9 18c-4.51 2-5-2-7-2" }]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "github" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Github$1 = Github;
const Instagram = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "20",
        "height": "20",
        "x": "2",
        "y": "2",
        "rx": "5",
        "ry": "5"
      }
    ],
    [
      "path",
      {
        "d": "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
      }
    ],
    [
      "line",
      {
        "x1": "17.5",
        "x2": "17.51",
        "y1": "6.5",
        "y2": "6.5"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "instagram" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Instagram$1 = Instagram;
const Linkedin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      }
    ],
    [
      "rect",
      {
        "width": "4",
        "height": "12",
        "x": "2",
        "y": "9"
      }
    ],
    ["circle", { "cx": "4", "cy": "4", "r": "2" }]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "linkedin" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Linkedin$1 = Linkedin;
const Mail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "20",
        "height": "16",
        "x": "2",
        "y": "4",
        "rx": "2"
      }
    ],
    [
      "path",
      {
        "d": "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "mail" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Mail$1 = Mail;
const Send = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "22",
        "x2": "11",
        "y1": "2",
        "y2": "13"
      }
    ],
    ["polygon", { "points": "22 2 15 22 11 13 2 9 22 2" }]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "send" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Send$1 = Send;
const Twitter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "twitter" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Twitter$1 = Twitter;
const css$5 = {
  code: ".gradient-aboutme.svelte-1mkk3y{-webkit-box-decoration-break:clone;box-decoration-break:clone;-webkit-background-clip:text;background-clip:text;color:transparent;background-image:linear-gradient(to bottom left, var(--tw-gradient-stops));--tw-gradient-from:#10b981 var(--tw-gradient-from-position);--tw-gradient-to:rgb(16 185 129 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-from-position:10%;--tw-gradient-to:rgb(129 140 248 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), #818cf8 var(--tw-gradient-via-position), var(--tw-gradient-to);--tw-gradient-via-position:40%;--tw-gradient-to:#c084fc var(--tw-gradient-to-position);--tw-gradient-to-position:90%\n}",
  map: null
};
const AboutMe = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$5);
  return `<div class="container my-auto flex items-center justify-evenly lg:flex-row flex-col-reverse lg:justify-center snap-always snap-center lg:h-screen"><div class="card lg:w-2/5 variant-glass w-4/5 lg:rounded-e-none lg:h-[70vh]"><header class="card-header" data-svelte-h="svelte-z5gax5"><p class="lg:text-6xl text-4xl font-serif font-extrabold relative lg:-inset-x-10 lg:-inset-y-14 gradient-aboutme pb-4 lg:p-0 svelte-1mkk3y">Who am I?</p></header> <section class="pb-8"><p class="lg:text-l text-justify px-8" data-svelte-h="svelte-1ayovqn">Hello! I&#39;m Avishka Kavinda, A fullstack developer based here in
				<a href="https://www.google.com/search?client=firefox-b-d&q=colombo+google+map#" class="skew-text" target="_blank">📍Colombo, Sri Lanka.</a>

				I have a passion for creating beautiful, intuitive and highly functional websites and
				applications. I have a strong interest in learning new technologies and frameworks and I&#39;m
				always looking for new challenges. <br> <br>The site you&#39;re currently seeing was created
				using
				<a href="https://tokio.rs/blog/2021-07-announcing-axum" class="skew-text" target="_blank">Axum</a>
				a rust backend framework and
				<a href="https://kit.svelte.dev/" class="skew-text" target="_blank">SvelteKit</a>
				a javascript frontend framework. I&#39;m currently working on a few projects and I&#39;m always looking
				for new opportunities. If you have a project you&#39;d like to discuss, feel free to contact me.</p> <div class="w-full"><button class="btn btn-sm variant-glass-surface w-full mt-8 rounded-none font-serif"><span data-svelte-h="svelte-1npzzuq">View my resume</span> <span>${validate_component(FileHeart, "FileHeart").$$render($$result, { "stroke-width": "1.25", size: "18px" }, {}, {})}</span></button></div></section> <footer class="card-footer"><div class="flex flex-row justify-evenly"><a target="_blank" href="https://www.linkedin.com/in/acekavi" class="btn-icon variant-ringed">${validate_component(Linkedin$1, "Linkedin").$$render($$result, { "stroke-width": "1.25", size: "18" }, {}, {})}</a> <a target="_blank" href="https://www.behance.net/acekavi" class="btn-icon variant-ringed" data-svelte-h="svelte-1t5sz5v"><svg xmlns="http://www.w3.org/2000/svg" height="1em" stroke="1.25px" class="fill-surface-800 dark:fill-surface-200" viewBox="0 0 576 512"><path d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z"></path></svg></a> <a target="_blank" href="https://www.instagram.com/acekavi" class="btn-icon variant-ringed">${validate_component(Instagram$1, "Instagram").$$render($$result, { "stroke-width": "1.25", size: "18" }, {}, {})}</a> <a target="_blank" href="https://github.com/acekavi" class="btn-icon variant-ringed">${validate_component(Github$1, "Github").$$render($$result, { "stroke-width": "1.25", size: "18" }, {}, {})}</a></div></footer></div> <div class="card my-16 lg:block hidden" data-svelte-h="svelte-1mk5mn8"><img src="/lg-self.png" alt="" srcset="" class="border-0 w-auto rounded-e-2xl lg:h-[70vh]"></div> <div class="card my-16 rounded-full lg:hidden block" data-svelte-h="svelte-j0kfum"><img src="/md-self.png" alt="" srcset="" class="border-0 rounded-full w-80"></div> </div>`;
});
const css$4 = {
  code: ".gradient-connect.svelte-1ksygh5{-webkit-box-decoration-break:clone;box-decoration-break:clone;-webkit-background-clip:text;background-clip:text;color:transparent;background-image:linear-gradient(to bottom left, var(--tw-gradient-stops));--tw-gradient-from:rgb(var(--color-tertiary-900) / 1) var(--tw-gradient-from-position);--tw-gradient-to:rgb(var(--color-tertiary-900) / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-from-position:0%;--tw-gradient-to:rgb(var(--color-tertiary-700) / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), rgb(var(--color-tertiary-700) / 1) var(--tw-gradient-via-position), var(--tw-gradient-to);--tw-gradient-via-position:40%;--tw-gradient-to:rgb(var(--color-tertiary-800) / 1) var(--tw-gradient-to-position);--tw-gradient-to-position:90%\n}",
  map: null
};
const ContactMe = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$4);
  return `<div class="container my-auto flex items-center justify-evenly lg:flex-row flex-col-reverse lg:justify-center snap-always snap-center lg:h-screen gap-x-32 gap-y-16"><div class="flex flex-col justify-center items-center"><p class="text-8xl font-serif gradient-connect font-semibold border-b border-gray-500/10 pb-12 svelte-1ksygh5" data-svelte-h="svelte-vbkgl8">Let&#39;s Connect!</p> <div class="flex flex-row justify-evenly pb-8 pt-16 gap-8"><a target="_blank" href="https://www.twitter.com/acekavi" class="btn-icon variant-ringed">${validate_component(Twitter$1, "Twitter").$$render($$result, { "stroke-width": "1.25", size: "18" }, {}, {})}</a> <a target="_blank" href="https://www.linkedin.com/in/acekavi" class="btn-icon variant-ringed">${validate_component(Linkedin$1, "Linkedin").$$render($$result, { "stroke-width": "1.25", size: "18" }, {}, {})}</a> <a target="_blank" href="https://www.behance.net/acekavi" class="btn-icon variant-ringed" data-svelte-h="svelte-h9a6ju"><svg xmlns="http://www.w3.org/2000/svg" height="1em" stroke="1.25px" class="fill-surface-800 dark:fill-surface-200" viewBox="0 0 576 512"><path d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z"></path></svg></a> <a target="_blank" href="https://www.instagram.com/acekavi" class="btn-icon variant-ringed">${validate_component(Instagram$1, "Instagram").$$render($$result, { "stroke-width": "1.25", size: "18" }, {}, {})}</a> <a target="_blank" href="https://github.com/acekavi" class="btn-icon variant-ringed">${validate_component(Github$1, "Github").$$render($$result, { "stroke-width": "1.25", size: "18" }, {}, {})}</a></div></div> <div class="card variant-glass py-4 lg:w-auto w-4/5"><section class="mx-8 my-4"><form method="POST" action="?/reachOut"><p class="font-sans text-2xl font-semibold leading-7" data-svelte-h="svelte-lv3ust">Lets work together!</p> <p class="mb-4 text-sm leading-6 text-neutral-500">Reach out to me ${validate_component(Mail$1, "Mail").$$render(
    $$result,
    {
      "stroke-width": "1.25",
      size: "0.75rem",
      class: "inline leading-6"
    },
    {},
    {}
  )}</p> <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6"><label class="label col-span-full" data-svelte-h="svelte-tx1w2l"><span>Name</span> <input class="input variant-form-material leading-5" title="Name" name="name" type="text" placeholder="g.host" autocomplete="off"></label> <label class="label col-span-full" data-svelte-h="svelte-nw6oya"><span>Subject</span> <input class="input variant-form-material leading-5" title="Subject" name="subject" type="text" placeholder="Work with me" autocomplete="off"></label> <label class="label col-span-full" data-svelte-h="svelte-ajc9hc"><span>Email address</span> <input class="input variant-form-material leading-5" title="Email address" name="email" type="email" placeholder="g.host@gmail.com" autocomplete="off"></label> <label class="label col-span-full" data-svelte-h="svelte-1m098zo"><span>Linkedin</span> <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] variant-form-material leading-5"><div class="input-group-shim">https://www.linkedin.com/in/</div> <input class="input rounded-none leading-5" title="Linkedin username" name="linkedin" type="text" placeholder="g.host" autocomplete="off"></div></label> <label class="label col-span-full" data-svelte-h="svelte-16qvtwy"><span>Message</span> <textarea class="textarea variant-form-material leading-5 resize-none" name="message" rows="4" placeholder="Let's work together on ..."></textarea></label> <div class="col-span-full"><button type="submit" class="btn btn-sm variant-ghost-surface my-4 float-left"><span data-svelte-h="svelte-1ayrbr9">Resume</span> <span>${validate_component(FileHeart, "FileHeart").$$render($$result, { "stroke-width": "1.25", size: "18px" }, {}, {})}</span></button> <button type="submit" class="btn btn-sm variant-filled my-4 float-right"><span data-svelte-h="svelte-14i38x8">Send</span> ${`<span>${validate_component(Send$1, "Send").$$render($$result, { "stroke-width": "1.25", size: "18px" }, {}, {})}</span>`}</button></div></div></form></section></div> </div>`;
});
const css$3 = {
  code: ".gradient-designs.svelte-gmabll{-webkit-box-decoration-break:clone;box-decoration-break:clone;-webkit-background-clip:text;background-clip:text;color:transparent;background-image:linear-gradient(to top left, var(--tw-gradient-stops));--tw-gradient-from:rgb(var(--color-primary-400) / 1) var(--tw-gradient-from-position);--tw-gradient-to:rgb(var(--color-primary-400) / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-from-position:0%;--tw-gradient-to:rgb(var(--color-primary-700) / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), rgb(var(--color-primary-700) / 1) var(--tw-gradient-via-position), var(--tw-gradient-to);--tw-gradient-via-position:40%;--tw-gradient-to:rgb(var(--color-primary-500) / 1) var(--tw-gradient-to-position);--tw-gradient-to-position:90%\n}",
  map: null
};
const Design = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<div class="container my-auto flex items-center justify-evenly lg:flex-row flex-col-reverse lg:justify-center snap-always snap-center lg:h-screen gap-x-32 gap-y-16" data-svelte-h="svelte-lg6u4r"><div class="flex flex-col lg:flex-row-reverse justify-evenly items-center h-full my-auto overflow-y-scroll lg:p-0"><div class="card lg:w-2/6 variant-glass w-4/5 rounded-none mt-8"><header class="card-header"><p class="lg:text-6xl text-4xl font-serif font-extrabold relative lg:-inset-x-10 lg:-inset-y-24 gradient-designs pb-4 lg:p-0 -rotate-12 svelte-gmabll">Designs</p></header> <section class="mx-8 pb-8 border-b border-gray-500/10"><p>With a successful track record as a graphic design freelancer since 2015, I have
					specialized in a wide range of creative projects, including brand designs, logo designs,
					digital artworks, and vector creations. Proficient in industry-standard software such as
					Illustrator, Photoshop, Figma, Blender, and Unity, I leverage these tools to bring my
					clients&#39; visions to life. <br> <br>By staying up to date with the latest design trends
					and techniques, I ensure that my work is contemporary and impactful. From concept
					development to final execution, I approach each project with attention to detail,
					creativity, and a deep understanding of my clients&#39; needs. With a passion for design and a
					commitment to excellence, I strive to deliver high-quality and visually stunning designs
					that exceed expectations.</p></section> <footer class="card-footer flex flex-row justify-evenly pb-8 pt-8"><a href="https://www.behance.net/acekavi" class="btn variant-soft-primary" target="_blank"><span><svg xmlns="http://www.w3.org/2000/svg" height="1em" stroke="1.25px" class="fill-surface-800 dark:fill-surface-200" viewBox="0 0 576 512"><path d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2.6-8.7.6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z"></path></svg></span> <span>View more on Behance</span></a></footer></div> <div class="lg:w-2/6 w-3/5 h-[80vh] lg:h-full relative lg:overflow-x-auto overflow-x-scroll"><img src="/Eminem.png" alt="Yours truly, Stan!" class="absolute rounded-full top-20 left-1/4 h-60 z-10 motion-safe:animate-reverseshuffle"> <img src="/Girl.png" alt="The girl i never met" class="absolute rounded-full top-[35%] h-64 z-30 motion-safe:animate-float"> <img src="/Shinigami.png" alt="Scapegoat" class="absolute rounded-full top-[60%] left-1/3 h-60 z-10 motion-safe:animate-shuffle"></div></div> </div>`;
});
const css$2 = {
  code: ".gradient-experience.svelte-12yqptq{-webkit-box-decoration-break:clone;box-decoration-break:clone;-webkit-background-clip:text;background-clip:text;color:transparent;background-image:linear-gradient(to bottom right, var(--tw-gradient-stops));--tw-gradient-from:#6ef195 var(--tw-gradient-from-position);--tw-gradient-to:rgb(110 241 149 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-from-position:10%;--tw-gradient-to:rgb(96 165 250 / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), #60a5fa var(--tw-gradient-via-position), var(--tw-gradient-to);--tw-gradient-via-position:50%;--tw-gradient-to:#00e3fd var(--tw-gradient-to-position);--tw-gradient-to-position:90%\n}",
  map: null
};
const Experiences = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<div class="container my-auto flex items-center justify-evenly flex-col lg:justify-center gap-x-32 gap-y-16 lg:p-0 snap-always snap-center lg:h-screen"><div class="card variant-glass w-4/5 rounded-none mt-8"><header class="card-header text-center" data-svelte-h="svelte-18r3go2"><p class="lg:text-6xl text-4xl font-serif font-extrabold relative lg:-inset-y-14 gradient-experience pb-4 lg:p-0 svelte-12yqptq">Work Experience</p></header> <section class="pb-8 flex px-8" data-svelte-h="svelte-v0uub8"><p class="lg:text-l text-justify first-letter:text-6xl first-letter:font-bold first-letter:mr-2 first-letter:float-left">I have been a freelance graphic designer since 2015. As I pursue my university studies in
				Computer Science at
				<a href="https://www.westminster.ac.uk/" class="skew-text" target="_blank">University of Westminster,</a>
				my passion has evolved into full-stack development. My internship at
				<a href="https://www.infor.com/" class="skew-text" target="_blank">Infor</a>
				in 2022-2023 provided me with valuable industrial experience, fostering team collaboration and
				business etiquettes. <br> <br>With a keen eye for aesthetics and a drive for immersive
				user experiences, I strive to blend creativity and technical expertise. Excited for the
				future of my career, I&#39;m committed to continuous growth, embracing new technologies, and
				delivering high-quality work. Let&#39;s connect and bring your ideas to life.</p></section> <footer class="card-footer flex flex-row justify-evenly pb-8"><div class="snap-mandatory snap-x flex flex-row flex-nowrap overflow-x-scroll gap-8"><div class="snap-center"><div class="card flex flex-col justify-center w-56"><header class="card-header mx-auto">${validate_component(Avatar, "Avatar").$$render(
    $$result,
    {
      src: "/Chathura.jpg",
      width: "w-16",
      rounded: "rounded-full",
      action: filter,
      actionParams: "#NoirLight"
    },
    {},
    {}
  )}</header> <section class="p-4 text-center" data-svelte-h="svelte-18u7ek8"><p class="">Chathura De Silva</p> <p class="text-xs">&#39;Project Manager, Infor&#39;</p></section> <footer class="card-footer text-sm text-center" data-svelte-h="svelte-vsnr4s">&quot;We are glad you chose Infor for your Internship, and I believe you&#39;ve learnt a lot
							about the IT industry. The work you&#39;ve engaged in was truly valuable for our product,
							and the feedback we&#39;ve received was great! I wish you all the best for your future!&quot;</footer></div></div> <div class="snap-center"><div class="card flex flex-col justify-center w-56"><header class="card-header mx-auto">${validate_component(Avatar, "Avatar").$$render(
    $$result,
    {
      src: "/Eranga.jpg",
      width: "w-16",
      rounded: "rounded-full",
      action: filter,
      actionParams: "#NoirLight"
    },
    {},
    {}
  )}</header> <section class="p-4 text-center" data-svelte-h="svelte-acv6nv"><p class="">Eranga Kapukotuwa</p> <p class="text-xs">&#39;Systems Architect, Infor&#39;</p></section> <footer class="card-footer text-sm text-center" data-svelte-h="svelte-1phpjr2">&quot;Avishka has been one of the best professional personalities I have ever seen as an
							intern in the industry. Their dedication, work ethic, and skills have truly impressed
							me. It has been a pleasure to have Avishka as part of our team during their internship
							at Infor.&quot;</footer></div></div> <div class="snap-center"><div class="card flex flex-col justify-center w-56"><header class="card-header mx-auto">${validate_component(Avatar, "Avatar").$$render(
    $$result,
    {
      src: "/Agarshan.png",
      width: "w-16",
      rounded: "rounded-full",
      action: filter,
      actionParams: "#NoirLight"
    },
    {},
    {}
  )}</header> <section class="p-4 text-center" data-svelte-h="svelte-zx3dwi"><p class="">Agarshan Senthamilpalan</p> <p class="text-xs">&#39;Software Engineer, Infor&#39;</p></section> <footer class="card-footer text-sm text-center" data-svelte-h="svelte-1bomt0i">&quot;Thank you for your valuable contribution to our QA team. Your time with us was truly
							enjoyable. Your commitment to quality have made a significant impact on our projects.
							We appreciate your hard work and attention to detail.&quot;</footer></div></div></div></footer></div> </div>`;
});
const css$1 = {
  code: ".gradient-header.svelte-1tg35s1{-webkit-box-decoration-break:clone;box-decoration-break:clone;-webkit-background-clip:text;background-clip:text;color:transparent;background-image:linear-gradient(to bottom right, var(--tw-gradient-stops));--tw-gradient-from:rgb(var(--color-primary-800) / 1) var(--tw-gradient-from-position);--tw-gradient-to:rgb(var(--color-primary-800) / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-from-position:10%;--tw-gradient-to:rgb(var(--color-primary-700) / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), rgb(var(--color-primary-700) / 1) var(--tw-gradient-via-position), var(--tw-gradient-to);--tw-gradient-via-position:40%;--tw-gradient-to:rgb(var(--color-primary-900) / 1) var(--tw-gradient-to-position);--tw-gradient-to-position:90%\n}",
  map: null
};
const MainHero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="container h-screen snap-always snap-center" data-svelte-h="svelte-hwh1cm"><div class="flex lg:flex-row flex-col-reverse justify-evenly items-center h-5/6"><div class=""><p class="lg:text-9xl font-serif font-semibold cursor-default"><span class="gradient-header svelte-1tg35s1">Designer</span></p> <p class="lg:text-9xl font-serif font-semibold cursor-default"><span class="gradient-header svelte-1tg35s1">Developer</span></p> <p class="lg:text-9xl font-serif font-semibold cursor-default"><span class="gradient-header svelte-1tg35s1">Human</span><span class="text-neutral-500 text-sm font-normal">for now...</span></p></div> <div class="motion-safe:animate-float w-4/5 lg:w-auto"><img src="/astronaut.svg" alt="" srcset="" width="400px"></div></div> <div class="flex flex-col align-middle text-center"><div><p class="font-semibold font-sans text-neutral-500">Psst! <br> Scroll down</p></div> <div class="mx-auto pt-4"><svg class="animate-bounce w-6 h-6 fill-neutral-600" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve"><path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"></path></svg></div></div> </div>`;
});
const css = {
  code: ".accordian-btn.svelte-1fxu3s8{margin-top:1rem;border-radius:9999px;--tw-bg-opacity:1;background-color:rgb(var(--color-secondary-300) / var(--tw-bg-opacity))\n}.svelte-1fxu3s8:is(.dark .accordian-btn){background-color:rgb(var(--color-secondary-600) / 0.4)\n}.tech_stack.svelte-1fxu3s8{border-radius:0.5rem;--tw-bg-opacity:1;background-color:rgb(var(--color-secondary-300) / var(--tw-bg-opacity));padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.75rem;padding-right:0.75rem;font-size:0.875rem;line-height:1.25rem\n}.svelte-1fxu3s8:is(.dark .tech_stack){background-color:rgb(var(--color-secondary-600) / 0.4)\n}.gradient-projects.svelte-1fxu3s8{-webkit-box-decoration-break:clone;box-decoration-break:clone;-webkit-background-clip:text;background-clip:text;color:transparent;background-image:linear-gradient(to bottom right, var(--tw-gradient-stops));--tw-gradient-from:rgb(var(--color-secondary-500) / 1) var(--tw-gradient-from-position);--tw-gradient-to:rgb(var(--color-secondary-500) / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-from-position:10%;--tw-gradient-to:rgb(var(--color-secondary-700) / 0)  var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), rgb(var(--color-secondary-700) / 1) var(--tw-gradient-via-position), var(--tw-gradient-to);--tw-gradient-via-position:40%;--tw-gradient-to:rgb(var(--color-secondary-500) / 1) var(--tw-gradient-to-position);--tw-gradient-to-position:90%\n}",
  map: null
};
const Projects = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="container lg:h-screen snap-always snap-center gap-x-32 gap-y-16 lg:p-0 svelte-1fxu3s8"><div class="flex flex-col lg:flex-row justify-evenly items-center h-full my-auto overflow-y-scroll svelte-1fxu3s8"><div class="card lg:w-2/6 variant-glass w-4/5 rounded-none mt-8 svelte-1fxu3s8" data-svelte-h="svelte-b38ndm"><header class="card-header text-right svelte-1fxu3s8"><p class="lg:text-6xl text-4xl font-serif font-extrabold relative lg:-inset-x-10 lg:-inset-y-14 gradient-projects pb-4 lg:p-0 svelte-1fxu3s8">Projects</p></header> <section class="pt-4 lg:p-0 svelte-1fxu3s8"><p class="text-normal px-8 svelte-1fxu3s8">In my journey as a developer, I&#39;ve gained extensive experience working with a wide range
					of technologies. From Java, Java Swing, Python, and Django to CSS preprocessors like Sass,
					frameworks like TailwindCSS and Bootstrap, and modern languages like Rust, Axum, Angular,
					Ionic, and SvelteKit, I&#39;ve explored diverse areas of software development. <br class="svelte-1fxu3s8"> <br class="svelte-1fxu3s8">These technologies have equipped me with the skills to create visually appealing,
					responsive user interfaces, develop robust and scalable backend systems, and build dynamic
					web applications. I&#39;m passionate about continuous learning and staying up-to-date with
					industry trends.</p></section> <footer class="flex flex-row lg:gap-4 gap-2 mx-10 flex-no-wrap overflow-x-scroll lg:overflow-auto lg:flex-wrap py-10 svelte-1fxu3s8"><p class="font-sans w-full pb-2 border-b border-gray-500/10 svelte-1fxu3s8">Technologies I&#39;m familiar with</p> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">Java</span></div> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">Python</span></div> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">Javascript</span></div> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">Rust</span></div> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">git</span></div> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">SvelteKit</span></div> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">ReactJS</span></div> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">Angular</span></div> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">Django</span></div> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">Axum</span></div> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">PostgreSQL</span></div> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">Docker</span></div> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">Sass</span></div> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">Bootstrap</span></div> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">TailwindCSS</span></div> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">AWS</span></div> <div class="tech_stack svelte-1fxu3s8"><span class="svelte-1fxu3s8">Digital Ocean</span></div></footer></div> <div class="card lg:w-2/6 variant-glass w-4/5 mt-8 lg:m-0 svelte-1fxu3s8">${validate_component(Accordion, "Accordion").$$render($$result, { autocollapse: true }, {}, {
    default: () => {
      return `${validate_component(AccordionItem, "AccordionItem").$$render($$result, { open: true }, {}, {
        content: () => {
          return `<p class="text-sm svelte-1fxu3s8" data-svelte-h="svelte-1m37xhj">Snake Eyes is a cutting-edge mobile application built using Kotlin. It utilizes YOLO
							v4, a state-of-the-art object detection algorithm, and integrates with TensorFlow for
							real-time snake detection. The app&#39;s primary functionality is to identify and track
							snakes through the device&#39;s camera feed. By leveraging the power of deep learning and
							computer vision, Snake Eyes provides users with accurate and instantaneous snake
							detection, enhancing safety in snake-prone areas. The Kotlin programming language
							enables efficient and concise code development, while the integration with YOLO v4 and
							TensorFlow ensures robust and reliable object recognition. Snake Eyes is a testament
							to my proficiency in Kotlin, machine learning, and mobile app development, showcasing
							my ability to leverage emerging technologies for practical and impactful solutions.</p> <button class="accordian-btn btn btn-sm svelte-1fxu3s8" data-svelte-h="svelte-1y18bqo"><a target="_blank" href="https://github.com/acekavi/SnakeEyes" class="svelte-1fxu3s8">Github</a></button> `;
        },
        summary: () => {
          return `<p class="font-sans text-xl svelte-1fxu3s8" data-svelte-h="svelte-uzg9rk">Snake Eyes</p>`;
        }
      })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
        content: () => {
          return `<p class="text-sm svelte-1fxu3s8" data-svelte-h="svelte-1axmpce">For a campus project, I developed a Formula One manager software using Java. The
							software was designed to handle various aspects of managing a Formula One team,
							including driver selection, race scheduling, and performance analysis. The graphical
							user interface (GUI) was built using JavaFX and Java Swing, providing an intuitive and
							interactive user experience. Leveraging Java&#39;s robustness and versatility, the
							software offered functionalities such as data storage, calculations, and visual
							representation of race statistics. This project allowed me to showcase my Java
							programming skills and demonstrate my ability to create user-friendly applications for
							real-world scenarios.</p> <button class="accordian-btn btn btn-sm svelte-1fxu3s8" data-svelte-h="svelte-10svpro"><a target="_blank" href="https://github.com/acekavi/coursework_oop" class="svelte-1fxu3s8">Github</a></button> `;
        },
        summary: () => {
          return `<p class="font-sans text-xl svelte-1fxu3s8" data-svelte-h="svelte-vy151v">Formula One Manager</p>`;
        }
      })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
        content: () => {
          return `<p class="text-sm svelte-1fxu3s8" data-svelte-h="svelte-1u025zx">Clarks.lk is a dynamic website developed for a campus project, serving as an
							e-commerce store dedicated to shoes. The website was crafted using JavaScript, Sass,
							and jQuery, harnessing the power of these technologies to deliver an engaging and
							user-friendly online shopping experience. With JavaScript&#39;s versatility, Sass&#39;s
							efficient styling capabilities, and jQuery&#39;s simplified DOM manipulation, the website
							offers seamless navigation, intuitive product browsing, and secure payment processing.
							Clarks.lk demonstrates my proficiency in frontend web development, highlighting my
							ability to create visually appealing and functional e-commerce platforms for
							real-world applications.</p> <button class="accordian-btn btn btn-sm svelte-1fxu3s8" data-svelte-h="svelte-1iqoj8y"><a target="_blank" href="https://acekavi.github.io/clarkslk/" class="svelte-1fxu3s8">Demo</a></button> <button class="accordian-btn btn btn-sm ms-4 svelte-1fxu3s8" data-svelte-h="svelte-byn3vg"><a target="_blank" href="https://github.com/acekavi/clarkslk" class="svelte-1fxu3s8">Github</a></button> `;
        },
        summary: () => {
          return `<p class="font-sans text-xl svelte-1fxu3s8" data-svelte-h="svelte-1ite85r">Clarks.lk</p>`;
        }
      })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
        content: () => {
          return `<p class="text-sm svelte-1fxu3s8" data-svelte-h="svelte-1i6rnx">Playah! is a vibrant web application designed for streaming music. Built using
							ReactJS, it delivers a modern and colorful user interface (UI) that enhances the
							user&#39;s music listening experience. The application provides seamless music playback,
							allowing users to explore and enjoy their favorite tracks effortlessly. Leveraging
							React&#39;s component-based architecture, Playah! offers a dynamic and responsive UI,
							ensuring smooth navigation and interactive features. Whether searching for new songs,
							creating personalized playlists, or discovering trending tracks, Playah! delivers a
							visually appealing and user-friendly platform for music enthusiasts to indulge in
							their passion for music.</p> <button class="accordian-btn btn btn-sm svelte-1fxu3s8" data-svelte-h="svelte-f7wfi6"><a target="_blank" href="https://acekavi.github.io/music-player/" class="svelte-1fxu3s8">Demo</a></button> <button class="accordian-btn btn btn-sm ms-4 svelte-1fxu3s8" data-svelte-h="svelte-vflfgd"><a target="_blank" href="https://github.com/acekavi/music-player/" class="svelte-1fxu3s8">Github</a></button> `;
        },
        summary: () => {
          return `<p class="font-sans text-xl svelte-1fxu3s8" data-svelte-h="svelte-xfkzis">Playah!</p>`;
        }
      })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
        content: () => {
          return `<p class="text-sm svelte-1fxu3s8" data-svelte-h="svelte-1iqw9r1">Mathtrix is a command-line interface (CLI) game developed using Python. It offers
							users random math problems to solve and keeps track of their high scores. The game
							serves as a practical tool for learning and reinforcing the fundamentals of Python
							programming and handling a database. By integrating Python&#39;s core functionalities,
							Mathtrix generates dynamic math challenges and provides an interactive experience for
							players. It leverages database handling techniques to store and retrieve high scores,
							allowing users to track their progress and compete with others. Through developing
							Mathtrix, I honed my Python programming skills, gaining a deeper understanding of core
							concepts and database management. This project showcases my ability to create engaging
							and educational applications using Python, fostering a fun and interactive environment
							for users to improve their math skills while exploring the fundamentals of
							programming.</p> <button class="accordian-btn btn btn-sm svelte-1fxu3s8" data-svelte-h="svelte-1wc026t"><a target="_blank" href="https://github.com/acekavi/Mathtrix" class="svelte-1fxu3s8">Github</a></button> `;
        },
        summary: () => {
          return `<p class="font-sans text-xl svelte-1fxu3s8" data-svelte-h="svelte-3ayp6p">Mathtrix</p>`;
        }
      })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
        content: () => {
          return `<p class="text-sm svelte-1fxu3s8" data-svelte-h="svelte-1s3epls">The PDF Templating web application is specifically designed for generating PDF
							documents using jsPDF and the AutoTable plugin. Developed using Angular and Ionic, the
							application seamlessly integrates with iOS devices. Leveraging Angular&#39;s powerful
							framework and Ionic&#39;s hybrid development capabilities, it offers a robust and
							efficient solution for creating dynamic PDF templates. With the integration of jsPDF
							and the AutoTable plugin, users can generate professional-looking PDFs with ease. The
							application&#39;s cross-platform compatibility ensures a smooth user experience, allowing
							iOS users to leverage the benefits of hybrid app development for PDF templating and
							document generation.</p> <button class="accordian-btn btn btn-sm svelte-1fxu3s8" data-svelte-h="svelte-o4yg2l"><a target="_blank" href="https://github.com/acekavi/pdf-template" class="svelte-1fxu3s8">Github</a></button> `;
        },
        summary: () => {
          return `<p class="font-sans text-xl svelte-1fxu3s8" data-svelte-h="svelte-1qkq1hy">PDF Exporting</p>`;
        }
      })} ${validate_component(AccordionItem, "AccordionItem").$$render($$result, {}, {}, {
        content: () => {
          return `<p class="text-sm svelte-1fxu3s8" data-svelte-h="svelte-187vhos">I developed my previous portfolio and blog using Django, following the MVC
							architecture. I utilized Jinja for templating, jQuery for enhanced functionality, and
							CSS for styling. The website includes a fully functional blog section. For deployment,
							I utilized AWS EC2 for hosting, AWS RDS for managing a PostgreSQL database, and Nginx
							for server configuration. AWS S3 was employed for handling static files, ensuring
							efficient storage and delivery. This comprehensive setup showcased my ability to
							develop and deploy dynamic web applications using Django, while leveraging various AWS
							services for a reliable and scalable hosting solution.</p> <button class="accordian-btn btn btn-sm svelte-1fxu3s8" data-svelte-h="svelte-1q5y99g"><a target="_blank" href="https://github.com/acekavi/django-portfo" class="svelte-1fxu3s8">Github</a></button> `;
        },
        summary: () => {
          return `<p class="font-sans text-xl svelte-1fxu3s8" data-svelte-h="svelte-kv7luu">Portfolio</p>`;
        }
      })}`;
    }
  })}</div></div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1vfgklb_START -->${$$result.title = `<title>Home Page</title>`, ""}<meta name="description"${add_attribute("content", description, 0)}><!-- HEAD_svelte-1vfgklb_END -->`, ""} <div class="lg:max-h-screen overflow-y-scroll snap snap-y snap-mandatory scroll-smooth bg-scales-light dark:bg-scales-dark bg-contain bg-center bg-fixed">${validate_component(MainHero, "MainHero").$$render($$result, {}, {}, {})} ${validate_component(AboutMe, "AboutMe").$$render($$result, {}, {}, {})} ${validate_component(Experiences, "Experiences").$$render($$result, {}, {}, {})} ${validate_component(Projects, "Projects").$$render($$result, {}, {}, {})} ${validate_component(Design, "Design").$$render($$result, {}, {}, {})} ${validate_component(ContactMe, "ContactMe").$$render($$result, {}, {}, {})}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-6801a886.js.map
