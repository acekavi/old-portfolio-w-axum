import { c as create_ssr_component, t as compute_rest_props, d as createEventDispatcher, u as onMount, g as escape, b as add_attribute, k as each, i as spread, x as escape_attribute_value, j as escape_object, o as compute_slots } from './handler-5880edf8.js';

const cBase$1 = "textarea cursor-pointer";
const cInterface = "space-y-4";
const cChipList = "flex flex-wrap gap-2";
const cInputField = "unstyled bg-transparent border-0 !ring-0 p-0 w-full";
const InputChip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesInvalid;
  let classesBase;
  let classesInterface;
  let classesChipList;
  let classesInputField;
  let $$restProps = compute_rest_props($$props, [
    "input",
    "name",
    "value",
    "whitelist",
    "max",
    "minlength",
    "maxlength",
    "allowUpperCase",
    "allowDuplicates",
    "validation",
    "duration",
    "required",
    "chips",
    "invalid",
    "padding",
    "rounded"
  ]);
  createEventDispatcher();
  let { input = "" } = $$props;
  let { name } = $$props;
  let { value = [] } = $$props;
  let { whitelist = [] } = $$props;
  let { max = -1 } = $$props;
  let { minlength = -1 } = $$props;
  let { maxlength = -1 } = $$props;
  let { allowUpperCase = false } = $$props;
  let { allowDuplicates = false } = $$props;
  let { validation = () => true } = $$props;
  let { duration = 150 } = $$props;
  let { required = false } = $$props;
  let { chips = "variant-filled" } = $$props;
  let { invalid = "input-error" } = $$props;
  let { padding = "p-2" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let chipValues = value.map((val) => {
    return { val, id: Math.random() };
  });
  let selectElement;
  onMount(() => {
    if (!selectElement.form)
      return;
  });
  if ($$props.input === void 0 && $$bindings.input && input !== void 0)
    $$bindings.input(input);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.whitelist === void 0 && $$bindings.whitelist && whitelist !== void 0)
    $$bindings.whitelist(whitelist);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.minlength === void 0 && $$bindings.minlength && minlength !== void 0)
    $$bindings.minlength(minlength);
  if ($$props.maxlength === void 0 && $$bindings.maxlength && maxlength !== void 0)
    $$bindings.maxlength(maxlength);
  if ($$props.allowUpperCase === void 0 && $$bindings.allowUpperCase && allowUpperCase !== void 0)
    $$bindings.allowUpperCase(allowUpperCase);
  if ($$props.allowDuplicates === void 0 && $$bindings.allowDuplicates && allowDuplicates !== void 0)
    $$bindings.allowDuplicates(allowDuplicates);
  if ($$props.validation === void 0 && $$bindings.validation && validation !== void 0)
    $$bindings.validation(validation);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  if ($$props.chips === void 0 && $$bindings.chips && chips !== void 0)
    $$bindings.chips(chips);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  classesInvalid = "";
  classesBase = `${cBase$1} ${padding} ${rounded} ${$$props.class ?? ""} ${classesInvalid}`;
  classesInterface = `${cInterface}`;
  classesChipList = `${cChipList}`;
  classesInputField = `${cInputField}`;
  chipValues = value.map((val, i) => {
    if (chipValues[i]?.val === val)
      return chipValues[i];
    return { id: Math.random(), val };
  });
  return `<div class="${[
    "input-chip " + escape(classesBase, true),
    $$restProps.disabled ? "opacity-50" : ""
  ].join(" ").trim()}"> <div class="h-0 overflow-hidden"><select${add_attribute("name", name, 0)} multiple ${required ? "required" : ""} tabindex="-1"${add_attribute("this", selectElement, 0)}>${each(value, (option) => {
    return `<option${add_attribute("value", option, 0)}>${escape(option)}</option>`;
  })}</select></div>  <div class="${"input-chip-interface " + escape(classesInterface, true)}"> <form><input type="text"${add_attribute("placeholder", $$restProps.placeholder ?? "Enter values...", 0)} class="${"input-chip-field " + escape(classesInputField, true)}" ${$$restProps.disabled ? "disabled" : ""}${add_attribute("value", input, 0)}></form>  ${chipValues.length ? `<div class="${"input-chip-list " + escape(classesChipList, true)}">${each(chipValues, ({ id, val }, i) => {
    return `<div><button type="button" class="${"chip " + escape(chips, true)}"><span>${escape(val)}</span> <span data-svelte-h="svelte-1p578dz">✕</span></button> </div>`;
  })}</div>` : ``}</div></div>`;
});
const cBase = "inline-block";
const cLabel = "unstyled flex items-center";
const cTrack = "flex transition-all duration-[200ms] cursor-pointer";
const cThumb = "w-[50%] h-full scale-[0.8] transition-all duration-[200ms] shadow";
const SlideToggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cTrackActive;
  let cThumbBackground;
  let cThumbPos;
  let classesDisabled;
  let classesBase;
  let classesLabel;
  let classesTrack;
  let classesThumb;
  let $$restProps = compute_rest_props($$props, ["name", "checked", "size", "background", "active", "border", "rounded", "label"]);
  let $$slots = compute_slots(slots);
  createEventDispatcher();
  let { name } = $$props;
  let { checked = false } = $$props;
  let { size = "md" } = $$props;
  let { background = "bg-surface-400 dark:bg-surface-700" } = $$props;
  let { active = "bg-surface-900 dark:bg-surface-300" } = $$props;
  let { border = "" } = $$props;
  let { rounded = "rounded-full" } = $$props;
  let { label = "" } = $$props;
  let trackSize;
  switch (size) {
    case "sm":
      trackSize = "w-12 h-6";
      break;
    case "lg":
      trackSize = "w-20 h-10";
      break;
    default:
      trackSize = "w-16 h-8";
  }
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  cTrackActive = checked ? active : `${background} cursor-pointer`;
  cThumbBackground = checked ? "bg-white/75" : "bg-white";
  cThumbPos = checked ? "translate-x-full" : "";
  classesDisabled = $$props.disabled === true ? "opacity-50" : "hover:brightness-[105%] dark:hover:brightness-110 cursor-pointer";
  classesBase = `${cBase} ${rounded} ${classesDisabled} ${$$props.class ?? ""}`;
  classesLabel = `${cLabel}`;
  classesTrack = `${cTrack} ${border} ${rounded} ${trackSize} ${cTrackActive}`;
  classesThumb = `${cThumb} ${rounded} ${cThumbBackground} ${cThumbPos}`;
  return `<div${add_attribute("id", label, 0)} class="${"slide-toggle " + escape(classesBase, true)}" data-testid="slide-toggle" role="switch"${add_attribute("aria-label", label, 0)}${add_attribute("aria-checked", checked, 0)} tabindex="0"><label class="${"slide-toggle-label " + escape(classesLabel, true)}"> <input${spread(
    [
      { type: "checkbox" },
      { class: "slide-toggle-input hidden" },
      { name: escape_attribute_value(name) },
      escape_object(prunedRestProps()),
      { disabled: $$props.disabled || null }
    ],
    {}
  )}${add_attribute("checked", checked, 1)}>  <div class="${[
    "slide-toggle-track " + escape(classesTrack, true),
    $$props.disabled ? "cursor-not-allowed" : ""
  ].join(" ").trim()}"><div class="${[
    "slide-toggle-thumb " + escape(classesThumb, true),
    $$props.disabled ? "cursor-not-allowed" : ""
  ].join(" ").trim()}"></div></div>  ${$$slots.default ? `<div class="slide-toggle-text ml-3">${slots.default ? slots.default({}) : ``}</div>` : ``}</label></div>`;
});

export { InputChip as I, SlideToggle as S };
//# sourceMappingURL=SlideToggle-3ae1380a.js.map
