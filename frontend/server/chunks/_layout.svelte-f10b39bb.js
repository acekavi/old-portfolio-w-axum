import { c as create_ssr_component, b as add_attribute, v as validate_component, w as writable, s as subscribe, d as createEventDispatcher, g as escape, i as spread, j as escape_object, m as missing_component, k as each } from './handler-5880edf8.js';
import { m as modeCurrent, s as setInitialClassState, I as Icon$1 } from './Icon-e8a169f2.js';
import { t as toastStore } from './stores-e8b99d89.js';
import { E as Eye$1 } from './eye-cbb9ddb5.js';
import { L as Loader2 } from './loader-2-ae42cf53.js';
import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
import { t as title, a as author } from './config-1f567595.js';

const storePopup = writable(void 0);
function modalService() {
  const { subscribe: subscribe2, set, update } = writable([]);
  return {
    subscribe: subscribe2,
    set,
    update,
    /** Append to end of queue. */
    trigger: (modal) => update((mStore) => {
      mStore.push(modal);
      return mStore;
    }),
    /**  Remove first item in queue. */
    close: () => update((mStore) => {
      if (mStore.length > 0)
        mStore.shift();
      return mStore;
    }),
    /** Remove all items from queue. */
    clear: () => set([])
  };
}
const modalStore = modalService();
const cBackdrop = "fixed top-0 left-0 right-0 bottom-0";
const cTransitionLayer = "w-full h-full p-4 overflow-y-auto flex justify-center";
const cModal = "block";
const cModalImage = "w-full h-auto";
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cPosition;
  let classesBackdrop;
  let classesTransitionLayer;
  let classesModal;
  let parent;
  let $modalStore, $$unsubscribe_modalStore;
  $$unsubscribe_modalStore = subscribe(modalStore, (value) => $modalStore = value);
  createEventDispatcher();
  let { position = "items-center" } = $$props;
  let { components = {} } = $$props;
  let { duration = 150 } = $$props;
  let { flyOpacity = 0 } = $$props;
  let { flyX = 0 } = $$props;
  let { flyY = 100 } = $$props;
  let { background = "bg-surface-100-800-token" } = $$props;
  let { width = "w-modal" } = $$props;
  let { height = "h-auto" } = $$props;
  let { padding = "p-4" } = $$props;
  let { spacing = "space-y-4" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { shadow = "shadow-xl" } = $$props;
  let { zIndex = "z-[999]" } = $$props;
  let { buttonNeutral = "variant-ghost-surface" } = $$props;
  let { buttonPositive = "variant-filled" } = $$props;
  let { buttonTextCancel = "Cancel" } = $$props;
  let { buttonTextConfirm = "Confirm" } = $$props;
  let { buttonTextSubmit = "Submit" } = $$props;
  let { regionBackdrop = "bg-surface-backdrop-token" } = $$props;
  let { regionHeader = "text-2xl font-bold" } = $$props;
  let { regionBody = "max-h-[200px] overflow-hidden" } = $$props;
  let { regionFooter = "flex justify-end space-x-2" } = $$props;
  let promptValue;
  const buttonTextDefaults = {
    buttonTextCancel,
    buttonTextConfirm,
    buttonTextSubmit
  };
  let currentComponent;
  modalStore.subscribe((modals) => {
    if (!modals.length)
      return;
    if (modals[0].type === "prompt")
      promptValue = modals[0].value;
    buttonTextCancel = modals[0].buttonTextCancel || buttonTextDefaults.buttonTextCancel;
    buttonTextConfirm = modals[0].buttonTextConfirm || buttonTextDefaults.buttonTextConfirm;
    buttonTextSubmit = modals[0].buttonTextSubmit || buttonTextDefaults.buttonTextSubmit;
    currentComponent = typeof modals[0].component === "string" ? components[modals[0].component] : modals[0].component;
  });
  function onClose() {
    if ($modalStore[0].response)
      $modalStore[0].response(false);
    modalStore.close();
  }
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.flyOpacity === void 0 && $$bindings.flyOpacity && flyOpacity !== void 0)
    $$bindings.flyOpacity(flyOpacity);
  if ($$props.flyX === void 0 && $$bindings.flyX && flyX !== void 0)
    $$bindings.flyX(flyX);
  if ($$props.flyY === void 0 && $$bindings.flyY && flyY !== void 0)
    $$bindings.flyY(flyY);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
    $$bindings.shadow(shadow);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
    $$bindings.zIndex(zIndex);
  if ($$props.buttonNeutral === void 0 && $$bindings.buttonNeutral && buttonNeutral !== void 0)
    $$bindings.buttonNeutral(buttonNeutral);
  if ($$props.buttonPositive === void 0 && $$bindings.buttonPositive && buttonPositive !== void 0)
    $$bindings.buttonPositive(buttonPositive);
  if ($$props.buttonTextCancel === void 0 && $$bindings.buttonTextCancel && buttonTextCancel !== void 0)
    $$bindings.buttonTextCancel(buttonTextCancel);
  if ($$props.buttonTextConfirm === void 0 && $$bindings.buttonTextConfirm && buttonTextConfirm !== void 0)
    $$bindings.buttonTextConfirm(buttonTextConfirm);
  if ($$props.buttonTextSubmit === void 0 && $$bindings.buttonTextSubmit && buttonTextSubmit !== void 0)
    $$bindings.buttonTextSubmit(buttonTextSubmit);
  if ($$props.regionBackdrop === void 0 && $$bindings.regionBackdrop && regionBackdrop !== void 0)
    $$bindings.regionBackdrop(regionBackdrop);
  if ($$props.regionHeader === void 0 && $$bindings.regionHeader && regionHeader !== void 0)
    $$bindings.regionHeader(regionHeader);
  if ($$props.regionBody === void 0 && $$bindings.regionBody && regionBody !== void 0)
    $$bindings.regionBody(regionBody);
  if ($$props.regionFooter === void 0 && $$bindings.regionFooter && regionFooter !== void 0)
    $$bindings.regionFooter(regionFooter);
  cPosition = $modalStore[0]?.position ?? position;
  classesBackdrop = `${cBackdrop} ${regionBackdrop} ${zIndex} ${$$props.class ?? ""} ${$modalStore[0]?.backdropClasses ?? ""}`;
  classesTransitionLayer = `${cTransitionLayer} ${cPosition ?? ""}`;
  classesModal = `${cModal} ${background} ${width} ${height} ${padding} ${spacing} ${rounded} ${shadow} ${$modalStore[0]?.modalClasses ?? ""}`;
  parent = {
    position,
    // ---
    duration,
    flyOpacity,
    flyX,
    flyY,
    // ---
    background,
    width,
    height,
    padding,
    spacing,
    rounded,
    shadow,
    // ---
    buttonNeutral,
    buttonPositive,
    buttonTextCancel,
    buttonTextConfirm,
    buttonTextSubmit,
    // ---
    regionBackdrop,
    regionHeader,
    regionBody,
    regionFooter,
    // ---
    onClose
  };
  $$unsubscribe_modalStore();
  return ` ${$modalStore.length > 0 ? ` <div class="${"modal-backdrop " + escape(classesBackdrop, true)}" data-testid="modal-backdrop"> <div class="${"modal-transition " + escape(classesTransitionLayer, true)}">${$modalStore[0].type !== "component" ? ` <div class="${"modal " + escape(classesModal, true)}" data-testid="modal" role="dialog" aria-modal="true"${add_attribute("aria-label", $modalStore[0].title ?? "", 0)}> ${$modalStore[0]?.title ? `<header class="${"modal-header " + escape(regionHeader, true)}"><!-- HTML_TAG_START -->${$modalStore[0].title}<!-- HTML_TAG_END --></header>` : ``}  ${$modalStore[0]?.body ? `<article class="${"modal-body " + escape(regionBody, true)}"><!-- HTML_TAG_START -->${$modalStore[0].body}<!-- HTML_TAG_END --></article>` : ``}  ${$modalStore[0]?.image && typeof $modalStore[0]?.image === "string" ? `<img class="${"modal-image " + escape(cModalImage, true)}"${add_attribute("src", $modalStore[0]?.image, 0)} alt="Modal">` : ``}  ${$modalStore[0].type === "alert" ? ` <footer class="${"modal-footer " + escape(regionFooter, true)}"><button type="button" class="${"btn " + escape(buttonNeutral, true)}">${escape(buttonTextCancel)}</button></footer>` : `${$modalStore[0].type === "confirm" ? ` <footer class="${"modal-footer " + escape(regionFooter, true)}"><button type="button" class="${"btn " + escape(buttonNeutral, true)}">${escape(buttonTextCancel)}</button> <button type="button" class="${"btn " + escape(buttonPositive, true)}">${escape(buttonTextConfirm)}</button></footer>` : `${$modalStore[0].type === "prompt" ? ` <form class="space-y-4"><input${spread(
    [
      { class: "modal-prompt-input input" },
      { name: "prompt" },
      { type: "text" },
      escape_object($modalStore[0].valueAttr)
    ],
    {}
  )}${add_attribute("value", promptValue, 0)}> <footer class="${"modal-footer " + escape(regionFooter, true)}"><button type="button" class="${"btn " + escape(buttonNeutral, true)}">${escape(buttonTextCancel)}</button> <button type="submit" class="${"btn " + escape(buttonPositive, true)}">${escape(buttonTextSubmit)}</button></footer></form>` : ``}`}`}</div>` : `  <div class="${"modal contents " + escape($modalStore[0]?.modalClasses ?? "", true)}" data-testid="modal-component" role="dialog" aria-modal="true"${add_attribute("aria-label", $modalStore[0].title ?? "", 0)}>${validate_component(currentComponent?.ref || missing_component, "svelte:component").$$render($$result, Object.assign({}, currentComponent?.props, { parent }), {}, {
    default: () => {
      return `${currentComponent?.slot ? `<!-- HTML_TAG_START -->${currentComponent?.slot}<!-- HTML_TAG_END -->` : ``}`;
    }
  })}</div>`}</div></div>` : ``}`;
});
const cTrack = "cursor-pointer";
const cThumb = "aspect-square scale-[0.8] flex justify-center items-center";
const cIcon = "w-[70%] aspect-square";
const LightSwitch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let trackBg;
  let thumbBg;
  let thumbPosition;
  let iconFill;
  let classesTrack;
  let classesThumb;
  let classesIcon;
  let $modeCurrent, $$unsubscribe_modeCurrent;
  $$unsubscribe_modeCurrent = subscribe(modeCurrent, (value) => $modeCurrent = value);
  let { bgLight = "bg-surface-50" } = $$props;
  let { bgDark = "bg-surface-900" } = $$props;
  let { fillLight = "fill-surface-50" } = $$props;
  let { fillDark = "fill-surface-900" } = $$props;
  let { width = "w-12" } = $$props;
  let { height = "h-6" } = $$props;
  let { ring = "ring-[1px] ring-surface-500/30" } = $$props;
  let { rounded = "rounded-token" } = $$props;
  const cTransition = `transition-all duration-[200ms]`;
  const svgPath = {
    sun: "M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM352 256c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zm32 0c0-70.7-57.3-128-128-128s-128 57.3-128 128s57.3 128 128 128s128-57.3 128-128z",
    moon: "M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
  };
  if ($$props.bgLight === void 0 && $$bindings.bgLight && bgLight !== void 0)
    $$bindings.bgLight(bgLight);
  if ($$props.bgDark === void 0 && $$bindings.bgDark && bgDark !== void 0)
    $$bindings.bgDark(bgDark);
  if ($$props.fillLight === void 0 && $$bindings.fillLight && fillLight !== void 0)
    $$bindings.fillLight(fillLight);
  if ($$props.fillDark === void 0 && $$bindings.fillDark && fillDark !== void 0)
    $$bindings.fillDark(fillDark);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.ring === void 0 && $$bindings.ring && ring !== void 0)
    $$bindings.ring(ring);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  trackBg = $modeCurrent === true ? bgLight : bgDark;
  thumbBg = $modeCurrent === true ? bgDark : bgLight;
  thumbPosition = $modeCurrent === true ? "translate-x-[100%]" : "";
  iconFill = $modeCurrent === true ? fillLight : fillDark;
  classesTrack = `${cTrack} ${cTransition} ${width} ${height} ${ring} ${rounded} ${trackBg} ${$$props.class ?? ""}`;
  classesThumb = `${cThumb} ${cTransition} ${height} ${rounded} ${thumbBg} ${thumbPosition}`;
  classesIcon = `${cIcon} ${iconFill}`;
  $$unsubscribe_modeCurrent();
  return `${$$result.head += `<!-- HEAD_svelte-gewkj4_START --><!-- HTML_TAG_START -->${`<script nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();<\/script>`}<!-- HTML_TAG_END --><!-- HEAD_svelte-gewkj4_END -->`, ""} <div class="${"lightswitch-track " + escape(classesTrack, true)}" role="switch" aria-label="Light Switch"${add_attribute("aria-checked", $modeCurrent, 0)} title="${"Toggle " + escape($modeCurrent === true ? "Dark" : "Light", true) + " Mode"}" tabindex="0"> <div class="${"lightswitch-thumb " + escape(classesThumb, true)}"> <svg class="${"lightswitch-icon " + escape(classesIcon, true)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path${add_attribute("d", $modeCurrent ? svgPath.sun : svgPath.moon, 0)}></path></svg></div></div>`;
});
const cWrapper = "flex fixed top-0 left-0 right-0 bottom-0 pointer-events-none";
const cSnackbar = "flex flex-col gap-y-2";
const cToast = "flex justify-between items-center pointer-events-auto";
const cToastActions = "flex items-center space-x-2";
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesWrapper;
  let classesSnackbar;
  let classesToast;
  let filteredToasts;
  let $toastStore, $$unsubscribe_toastStore;
  $$unsubscribe_toastStore = subscribe(toastStore, (value) => $toastStore = value);
  let { position = "b" } = $$props;
  let { max = 3 } = $$props;
  let { duration = 250 } = $$props;
  let { background = "variant-filled-secondary" } = $$props;
  let { width = "max-w-[640px]" } = $$props;
  let { color = "" } = $$props;
  let { padding = "p-4" } = $$props;
  let { spacing = "space-x-4" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { shadow = "shadow-lg" } = $$props;
  let { zIndex = "z-[888]" } = $$props;
  let { buttonAction = "btn variant-filled" } = $$props;
  let { buttonDismiss = "btn-icon btn-icon-sm variant-filled" } = $$props;
  let { buttonDismissLabel = "✕" } = $$props;
  let cPosition;
  let cAlign;
  switch (position) {
    case "t":
      cPosition = "justify-center items-start";
      cAlign = "items-center";
      break;
    case "b":
      cPosition = "justify-center items-end";
      cAlign = "items-center";
      break;
    case "l":
      cPosition = "justify-start items-center";
      cAlign = "items-start";
      break;
    case "r":
      cPosition = "justify-end items-center";
      cAlign = "items-end";
      break;
    case "tl":
      cPosition = "justify-start items-start";
      cAlign = "items-start";
      break;
    case "tr":
      cPosition = "justify-end items-start";
      cAlign = "items-end";
      break;
    case "bl":
      cPosition = "justify-start items-end";
      cAlign = "items-start";
      break;
    case "br":
      cPosition = "justify-end items-end";
      cAlign = "items-end";
      break;
  }
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
    $$bindings.shadow(shadow);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
    $$bindings.zIndex(zIndex);
  if ($$props.buttonAction === void 0 && $$bindings.buttonAction && buttonAction !== void 0)
    $$bindings.buttonAction(buttonAction);
  if ($$props.buttonDismiss === void 0 && $$bindings.buttonDismiss && buttonDismiss !== void 0)
    $$bindings.buttonDismiss(buttonDismiss);
  if ($$props.buttonDismissLabel === void 0 && $$bindings.buttonDismissLabel && buttonDismissLabel !== void 0)
    $$bindings.buttonDismissLabel(buttonDismissLabel);
  classesWrapper = `${cWrapper} ${cPosition} ${zIndex} ${$$props.class || ""}`;
  classesSnackbar = `${cSnackbar} ${cAlign} ${padding}`;
  classesToast = `${cToast} ${width} ${color} ${padding} ${spacing} ${rounded} ${shadow}`;
  filteredToasts = Array.from($toastStore).slice(0, max);
  $$unsubscribe_toastStore();
  return `${$toastStore.length ? ` <div class="${"snackbar-wrapper " + escape(classesWrapper, true)}" data-testid="snackbar-wrapper"> <div class="${"snackbar " + escape(classesSnackbar, true)}">${each(filteredToasts, (t, i) => {
    return `<div> <div class="${"toast " + escape(classesToast, true) + " " + escape(t.background ?? background, true) + " " + escape(t.classes ?? "", true)}" role="alert" aria-live="polite" data-testid="toast"><div class="text-base"><!-- HTML_TAG_START -->${t.message}<!-- HTML_TAG_END --></div> ${t.action || !t.hideDismiss ? `<div class="${"toast-actions " + escape(cToastActions, true)}">${t.action ? `<button${add_attribute("class", buttonAction, 0)}><!-- HTML_TAG_START -->${t.action.label}<!-- HTML_TAG_END --></button>` : ``} ${!t.hideDismiss ? `<button${add_attribute("class", buttonDismiss, 0)}>${escape(buttonDismissLabel)}</button>` : ``} </div>` : ``}</div> </div>`;
  })}</div></div>` : ``}`;
});
const Alert_triangle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
      }
    ],
    ["path", { "d": "M12 9v4" }],
    ["path", { "d": "M12 17h.01" }]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "alert-triangle" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const AlertTriangle = Alert_triangle;
const Log_in = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
      }
    ],
    ["polyline", { "points": "10 17 15 12 10 7" }],
    [
      "line",
      {
        "x1": "15",
        "x2": "3",
        "y1": "12",
        "y2": "12"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "log-in" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const LogIn = Log_in;
const User_circle_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M18 20a6 6 0 0 0-12 0" }],
    ["circle", { "cx": "12", "cy": "10", "r": "4" }],
    ["circle", { "cx": "12", "cy": "12", "r": "10" }]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "user-circle-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const UserCircle2 = User_circle_2;
const User_plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      }
    ],
    ["circle", { "cx": "9", "cy": "7", "r": "4" }],
    [
      "line",
      {
        "x1": "19",
        "x2": "19",
        "y1": "8",
        "y2": "14"
      }
    ],
    [
      "line",
      {
        "x1": "22",
        "x2": "16",
        "y1": "11",
        "y2": "11"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "user-plus" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const UserPlus = User_plus;
const Signup_form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isLoading;
  let $modalStore, $$unsubscribe_modalStore;
  $$unsubscribe_modalStore = subscribe(modalStore, (value) => $modalStore = value);
  isLoading = false;
  $$unsubscribe_modalStore();
  return `${$modalStore[0] ? `<div class="card p-4 w-modal shadow-xl space-y-4 rounded-none"><header class="text-5xl font-semibold uppercase font-serif" data-svelte-h="svelte-n00kdi">Sign up</header> <article class="border-b pb-4 mb-5 border-gray-500/50">This is for spam protection ${validate_component(AlertTriangle, "AlertTriangle").$$render(
    $$result,
    {
      "stroke-width": "1.25",
      size: "13px",
      class: "inline leading-6"
    },
    {},
    {}
  )}</article>  <form method="POST" action="/auth?/register"><div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6"><label class="label col-span-full" data-svelte-h="svelte-jhl1a6"><span>Username</span> <input class="input variant-form-material leading-5" title="Username" name="username" type="text" placeholder="g.host" autocomplete="off"></label> <label class="label col-span-full" data-svelte-h="svelte-wu1tu1"><span>Email</span> <input class="input variant-form-material leading-5" title="Email" name="email" type="email" placeholder="ghost@proton.me" autocomplete="off"></label> <label class="label col-span-full"><span data-svelte-h="svelte-1kvjhoz">Password</span> <div class="input-group input-group-divider grid-cols-[1fr_auto] variant-form-material"><input class="input variant-form-material leading-5" title="Password" name="password" type="password" placeholder="●●●●●●●●●●●●" autocomplete="off"> <button title="Show Password" type="button">${validate_component(Eye$1, "Eye").$$render($$result, { class: "hover:text-success-600" }, {}, {})}</button></div></label> <label class="label col-span-full"><span data-svelte-h="svelte-icktzz">Confirm Password</span> <div class="input-group input-group-divider grid-cols-[1fr_auto] variant-form-material"><input class="input variant-form-material leading-5" title="Confirm Password" name="confirm-password" type="password" placeholder="●●●●●●●●●●●●" autocomplete="off"> <button title="Show Password" type="button">${validate_component(Eye$1, "Eye").$$render($$result, { class: "hover:text-success-600" }, {}, {})}</button></div></label> <div class="col-span-full"><button class="btn variant-ghost-surface my-4 float-left" data-svelte-h="svelte-3i3hjq"><span>Cancel</span></button> <button type="submit" class="btn variant-filled my-4 float-right"><span data-svelte-h="svelte-17kzaxj">Register</span> ${isLoading ? `${validate_component(Loader2, "Loader2").$$render($$result, { class: "animate-spin " }, {}, {})}` : `<span>${validate_component(UserPlus, "UserPlus").$$render($$result, { "stroke-width": "1.25", size: "18px" }, {}, {})}</span>`}</button></div></div></form></div>` : ``}`;
});
const Login_form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isLoading;
  let $modalStore, $$unsubscribe_modalStore;
  $$unsubscribe_modalStore = subscribe(modalStore, (value) => $modalStore = value);
  isLoading = false;
  $$unsubscribe_modalStore();
  return `${$modalStore[0] ? `<div class="card p-4 w-modal shadow-xl space-y-4 rounded-none"><header class="text-5xl font-semibold uppercase font-serif" data-svelte-h="svelte-hd9qa7">Login</header> <article class="border-b pb-4 mb-5 border-gray-500/50">This is for spam protection ${validate_component(AlertTriangle, "AlertTriangle").$$render(
    $$result,
    {
      "stroke-width": "1.25",
      size: "13px",
      class: "inline leading-6"
    },
    {},
    {}
  )}</article>  <form method="POST" action="/auth?/login"><div class="grid grid-cols-1 gap-y-4 sm:grid-cols-6"><label class="label col-span-full" data-svelte-h="svelte-q4oij2"><span>Username or Email</span> <input class="input variant-form-material leading-5" title="Username or Email" name="username" type="text" placeholder="g.host" autocomplete="off"></label> <label class="label col-span-full" data-svelte-h="svelte-zvlhae"><span>Password</span> <input class="input variant-form-material leading-5" title="Password" name="password" type="password" placeholder="●●●●●●●●" autocomplete="off"></label> <button class="col-span-full text-right" data-svelte-h="svelte-p49nyp">Forgot password?</button> <div class="col-span-full"><button class="btn variant-ghost-surface my-4 float-left" data-svelte-h="svelte-3i3hjq"><span>Cancel</span></button> <button type="submit" class="btn variant-filled my-4 float-right"><span data-svelte-h="svelte-sdljcx">Login</span> ${isLoading ? `${validate_component(Loader2, "Loader2").$$render($$result, { class: "animate-spin" }, {}, {})}` : `<span>${validate_component(LogIn, "LogIn").$$render($$result, { "stroke-width": "1.25", size: "18px" }, {}, {})}</span>`}</button></div></div></form></div>` : ``}`;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let logoutButton;
  let { user } = $$props;
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  return `<div class="lg:sticky lg:top-0 lg:left-0 lg:h-0 lg:p-0 z-50"><div class="flex justify-between text-zinc-900 dark:text-zinc-100 items-center"><div class="lg:ms-16 lg:mt-8 p-4" data-svelte-h="svelte-1l5nyc6"><a href="/"> <p class="lowercase text-2xl font-monospace dark:text-surface-100 text-surface-800 hover:text-primary-500 dark:hover:text-primary-500 ease-in-out transition-all duration-500">ACEKAVI<span class="text-primary-500">.me</span></p></a></div> <div class="lg:me-16 flex justify-between gap-4 uppercase items-center lg:mt-8 p-4"><button class="hover:text-neutral-600 dark:hover:text-neutral-300 [&>*]:pointer-events-none">${validate_component(UserCircle2, "UserCircle2").$$render($$result, { size: "20px" }, {}, {})}</button> <a class="hover:text-neutral-600 dark:hover:text-neutral-300" href="/blog" data-svelte-h="svelte-1hc3gcf">Blog</a> ${validate_component(LightSwitch, "LightSwitch").$$render(
    $$result,
    {
      width: "w-8",
      height: "h-4",
      ring: "variant-ghost-surface"
    },
    {},
    {}
  )}</div></div></div> <div class="card p-4 variant-glass-surface rounded-md z-50" data-popup="popupClick"><p class="leading-6 border-b border-gray-500/50 pb-4 mb-4" data-svelte-h="svelte-f325vn">User Authentication</p> ${user ? `<button class="btn-sm font-semibold variant-soft block mx-auto mb-2 w-full rounded-md uppercase" data-svelte-h="svelte-na56lb"><span>Logout</span></button> <form method="POST"><button class="hidden" formaction="/auth?/logout"${add_attribute("this", logoutButton, 0)}></button></form> ${user.is_superuser ? `<a href="/admin" class="btn-sm font-semibold variant-soft block mx-auto mb-2 w-full rounded-md uppercase text-center" data-svelte-h="svelte-5k7606">Admin</a>` : ``}` : `<button class="btn-sm font-semibold variant-soft block mx-auto mb-2 w-full rounded-md uppercase" data-svelte-h="svelte-1own0w5">Login</button> <button class="btn-sm font-semibold variant-soft block mx-auto mb-2 w-full rounded-md uppercase" data-svelte-h="svelte-5q17kb">SignUp</button>`} <div class="arrow variant-glass-surface"></div></div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const modalComponentRegistry = {
    LoginModal: { ref: Login_form },
    SignupModal: { ref: Signup_form }
  };
  storePopup.set({
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-a8ij6c_START --><meta${add_attribute("name", title, 0)}><meta name="robots" content="index, follow"><meta name="author"${add_attribute("content", author, 0)}><link rel="canonical" href="http://www.acekavi.me"><!-- HEAD_svelte-a8ij6c_END -->`, ""} ${validate_component(Modal, "Modal").$$render(
    $$result,
    {
      rounded: "rounded-none",
      components: modalComponentRegistry
    },
    {},
    {}
  )} ${validate_component(Toast, "Toast").$$render($$result, { rounded: "rounded-md", zIndex: "z-50" }, {}, {})} ${validate_component(Navbar, "Navbar").$$render($$result, { user: data.user }, {}, {})} <div>${slots.default ? slots.default({}) : ``}</div>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-f10b39bb.js.map
