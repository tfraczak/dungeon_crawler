// Knob panel renderer for the Dev Sound Sandbox. Returns a DOM tree from a
// declarative description of the selected sound (registry entry +
// initial state) and bubbles every edit back through `onChange` so the
// install module can persist to localStorage.
//
// Two body shapes:
//   tunable_recipe -> flat list of knobs declared in the entry
//   profile_synth  -> dynamic per-profile cards (Type + envelope + source
//                     knobs + nested effects with their own Type +
//                     knobs), plus "+ Add Sound Profile" / "+ Add Effect"
//                     and Remove buttons. All adds/removes/changes flow
//                     to localStorage.
//
// The shared header (Name / Description / live filename / functionName
// preview) is the same for both kinds.

import { toSnakeCase, toLowerCamelCase } from "./naming";
import { listSources, getSource, getSourceDefaults } from "@core/profile_sources";
import { listEffects, getEffect, getEffectDefaults } from "@core/profile_effects";

// ---------------------------------------------------------------------------
// Tiny DOM helpers
// ---------------------------------------------------------------------------

const el = (tag, props = {}, children = []) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k === "text") node.textContent = v;
    else if (k === "dataset") Object.assign(node.dataset, v);
    else if (k.startsWith("on") && typeof v === "function") {
      node.addEventListener(k.slice(2).toLowerCase(), v);
    } else if (v != null && v !== false) {
      node.setAttribute(k, v === true ? "" : v);
    }
  }
  for (const c of children) {
    if (c == null || c === false) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
};

// Format a numeric value for the `range` knob's <output>. Picks sensible
// decimal places from `step` so a step of 0.01 displays "0.12" and a step
// of 10 displays "1500".
const formatValue = (val, step) => {
  const n = Number(val);
  if (!Number.isFinite(n)) return "—";
  if (step >= 1) return String(Math.round(n));
  const decimals = Math.max(0, Math.ceil(-Math.log10(step)));
  return n.toFixed(decimals);
};

// Coerce a number from a string, returning null when invalid (NaN, empty,
// negative). Used by text_number knobs which intentionally have no min/max
// caps but still must reject obvious garbage.
const parseUncappedNumber = (raw) => {
  const trimmed = String(raw).trim();
  if (trimmed === "") return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
};

const cloneProfile = (profile) => JSON.parse(JSON.stringify(profile));

// ---------------------------------------------------------------------------
// Single knob renderers (range / text_number / select)
// ---------------------------------------------------------------------------

const renderRangeKnob = (knob, value, onValue) => {
  const output = el("output", { text: formatValue(value, knob.step) + (knob.unit ? ` ${knob.unit}` : "") });
  const input = el("input", {
    type: "range",
    min: knob.min,
    max: knob.max,
    step: knob.step,
    value: value,
    onInput: (e) => {
      const v = Number(e.target.value);
      output.textContent = formatValue(v, knob.step) + (knob.unit ? ` ${knob.unit}` : "");
      onValue(v);
    },
  });
  return el("label", { class: "dev-sound-field" }, [
    el("span", { text: knob.label }),
    input,
    output,
  ]);
};

const renderTextNumberKnob = (knob, value, onValue) => {
  const input = el("input", {
    type: "text",
    inputmode: "decimal",
    autocomplete: "off",
    spellcheck: "false",
    class: "dev-sound-text-number",
    value: value == null ? "" : String(value),
    onChange: (e) => {
      const parsed = parseUncappedNumber(e.target.value);
      if (parsed === null) {
        e.target.classList.add("invalid");
        return;
      }
      e.target.classList.remove("invalid");
      onValue(parsed);
    },
  });
  return el("label", { class: "dev-sound-field" }, [
    el("span", { text: knob.label + (knob.unit ? ` (${knob.unit})` : "") }),
    input,
  ]);
};

const renderSelectKnob = (knob, value, onValue) => {
  const select = el("select", {
    onChange: (e) => onValue(e.target.value),
  }, knob.options.map((opt) => el("option", { value: opt, selected: opt === value ? "selected" : null }, [opt])));
  return el("label", { class: "dev-sound-field" }, [
    el("span", { text: knob.label }),
    select,
  ]);
};

const renderCheckboxKnob = (knob, value, onValue) => {
  const input = el("input", {
    type: "checkbox",
    checked: Boolean(value),
    onChange: (e) => onValue(e.target.checked),
  });
  return el("label", { class: "dev-sound-field dev-sound-check" }, [
    el("span", { text: knob.label }),
    input,
  ]);
};

const renderTextAreaKnob = (knob, value, onValue) => {
  const input = el("textarea", {
    rows: knob.rows ?? 2,
    placeholder: knob.placeholder ?? "",
    onInput: (e) => onValue(e.target.value),
  }, [value ?? ""]);

  return el("label", { class: "dev-sound-field dev-sound-textarea-field" }, [
    el("span", { text: knob.label }),
    input,
  ]);
};

const renderKnob = (knob, value, onValue) => {
  switch (knob.type) {
    case "range":       return renderRangeKnob(knob, value, onValue);
    case "text_number": return renderTextNumberKnob(knob, value, onValue);
    case "select":      return renderSelectKnob(knob, value, onValue);
    case "checkbox":    return renderCheckboxKnob(knob, value, onValue);
    case "textarea":    return renderTextAreaKnob(knob, value, onValue);
    default:            return el("div", { text: `Unknown knob type: ${knob.type}` });
  }
};

// ---------------------------------------------------------------------------
// Shared header block (Name / Description / derived filename + functionName)
// ---------------------------------------------------------------------------

const renderHeaderBlock = (state, onMetaChange) => {
  const filenameEl = el("code", { class: "filename" });
  const functionNameEl = el("code", { class: "functionName" });
  const derived = el("div", { class: "dev-sound-derived" }, [
    el("span", {}, [el("span", { class: "label", text: "filename" }), filenameEl]),
    el("span", {}, [el("span", { class: "label", text: "functionName" }), functionNameEl]),
  ]);

  const updateDerived = () => {
    const fname = toSnakeCase(state.name);
    const fnName = toLowerCamelCase(state.name);
    if (fname && fnName) {
      filenameEl.textContent = fname;
      functionNameEl.textContent = fnName;
      derived.classList.remove("invalid");
    } else {
      filenameEl.textContent = "(invalid)";
      functionNameEl.textContent = "(invalid)";
      derived.classList.add("invalid");
    }
  };
  updateDerived();

  const nameInput = el("input", {
    type: "text",
    value: state.name ?? "",
    placeholder: "Sound name",
    onInput: (e) => {
      state.name = e.target.value;
      updateDerived();
      onMetaChange();
    },
  });
  const descInput = el("textarea", {
    rows: 2,
    placeholder: "What is this sound for?",
    onInput: (e) => {
      state.description = e.target.value;
      onMetaChange();
    },
  }, [state.description ?? ""]);
  // value attr on textarea via setAttribute doesn't render; set as text
  // child above and let the user edit normally.

  return el("div", { class: "dev-sound-header-block" }, [
    el("label", {}, [el("span", { text: "Name" }), nameInput]),
    el("label", {}, [el("span", { text: "Description" }), descInput]),
    derived,
  ]);
};

// ---------------------------------------------------------------------------
// Action row (Play / Sample / Reset / Save / Copy / optional Delete for customs)
// ---------------------------------------------------------------------------

export const renderActions = ({ entry, onPlay, onSample, onReset, onSave, onCopy, onDelete }) => {
  const buttons = [];
  buttons.push(el("button", { type: "button", class: "button play", onClick: onPlay }, ["\u25B6 Play"]));
  if (entry.sample?.audioElementId && onSample) {
    buttons.push(el("button", { type: "button", class: "button sample", onClick: onSample }, ["\u25B6 Play sample"]));
  }
  buttons.push(el("button", { type: "button", class: "button reset", onClick: onReset }, ["Reset to defaults"]));
  if (onSave) {
    buttons.push(el("button", { type: "button", class: "button", onClick: onSave }, ["Save changes"]));
  }
  buttons.push(el("button", { type: "button", class: "button copy", onClick: onCopy }, ["Copy values"]));
  if (onDelete) {
    buttons.push(el("button", { type: "button", class: "button danger", onClick: onDelete }, ["Delete"]));
  }
  return el("div", { class: "dev-sound-actions" }, buttons);
};

// ---------------------------------------------------------------------------
// tunable_recipe body: flat list of knobs from entry.knobs
// ---------------------------------------------------------------------------

const renderTunableRecipeBody = (entry, params, onChange) => {
  const list = el("div", { class: "dev-sound-knob-list" });
  for (const knob of entry.knobs) {
    const value = params[knob.key];
    list.appendChild(renderKnob(knob, value, (v) => {
      params[knob.key] = v;
      onChange();
    }));
  }
  return list;
};

// ---------------------------------------------------------------------------
// profile_synth body: per-profile cards with add/remove + nested effect
// list with its own add/remove. Each card re-renders itself in place when
// its Type dropdown changes so the source-specific knobs swap without
// rebuilding the whole panel.
// ---------------------------------------------------------------------------

const renderEffectCard = (effect, onChange, onRemove) => {
  const card = el("div", { class: "dev-sound-effect-card" });

  const typeSelect = el("select", {
    onChange: (e) => {
      const newType = e.target.value;
      const next = { type: newType, ...getEffectDefaults(newType) };
      Object.keys(effect).forEach((k) => delete effect[k]);
      Object.assign(effect, next);
      onChange();
      const fresh = renderEffectCard(effect, onChange, onRemove);
      card.replaceWith(fresh);
    },
  }, listEffects().map((def) => el("option", { value: def.id, selected: def.id === effect.type ? "selected" : null }, [def.label])));

  const removeBtn = el("button", { type: "button", onClick: onRemove }, ["\u2715 Remove"]);

  const header = el("div", { class: "dev-sound-card-header" }, [
    el("h3", { text: "Effect" }),
    el("div", { class: "dev-sound-card-controls" }, [typeSelect, removeBtn]),
  ]);
  card.appendChild(header);

  const def = getEffect(effect.type);
  if (def) {
    const list = el("div", { class: "dev-sound-knob-list" });
    for (const knob of def.knobs) {
      const value = effect[knob.key] ?? def.defaults[knob.key];
      list.appendChild(renderKnob(knob, value, (v) => {
        effect[knob.key] = v;
        onChange();
      }));
    }
    card.appendChild(list);
  } else {
    card.appendChild(el("div", { text: `Unknown effect type: ${effect.type}` }));
  }

  return card;
};

const renderProfileCard = (profile, idx, onChange, onRemove, onClone) => {
  const card = el("div", { class: "dev-sound-profile-card" });
  if (profile.muted === true) card.classList.add("muted");

  const typeSelect = el("select", {
    onChange: (e) => {
      const newType = e.target.value;
      const preserved = {
        description: profile.description ?? "",
        muted: profile.muted ?? false,
        reverseBuffer: profile.reverseBuffer ?? false,
        startOffset: profile.startOffset ?? 0,
        duration: profile.duration ?? 0.04,
        gain: profile.gain ?? 0.2,
        attackTime: profile.attackTime ?? 0,
        decayCurve: profile.decayCurve ?? "exponential",
        effects: profile.effects ?? [],
      };
      const next = { type: newType, ...getSourceDefaults(newType), ...preserved };
      Object.keys(profile).forEach((k) => delete profile[k]);
      Object.assign(profile, next);
      onChange();
      const fresh = renderProfileCard(profile, idx, onChange, onRemove, onClone);
      card.replaceWith(fresh);
    },
  }, listSources().map((def) => el("option", { value: def.id, selected: def.id === profile.type ? "selected" : null }, [def.label])));

  const cloneBtn = el("button", { type: "button", onClick: onClone }, ["Clone"]);
  const removeBtn = el("button", { type: "button", onClick: onRemove }, ["\u2715 Remove"]);

  const header = el("div", { class: "dev-sound-card-header" }, [
    el("h3", { text: `Profile ${idx + 1}` }),
    el("div", { class: "dev-sound-card-controls" }, [typeSelect, cloneBtn, removeBtn]),
  ]);
  card.appendChild(header);

  // Universal envelope knobs first.
  const envList = el("div", { class: "dev-sound-knob-list" }, [
    renderTextAreaKnob({
      key: "description",
      label: "Description",
      type: "textarea",
      rows: 2,
      placeholder: "What is this profile doing?",
    }, profile.description ?? "", (v) => {
      profile.description = v;
      onChange();
    }),
    renderCheckboxKnob({ key: "muted", label: "Mute profile", type: "checkbox" }, profile.muted ?? false, (v) => {
      profile.muted = v;
      card.classList.toggle("muted", v);
      onChange();
    }),
    renderTextNumberKnob({ key: "startOffset", label: "startOffset", unit: "s", type: "text_number" }, profile.startOffset ?? 0, (v) => { profile.startOffset = v; onChange(); }),
    renderTextNumberKnob({ key: "duration",    label: "duration",    unit: "s", type: "text_number" }, profile.duration ?? 0.04, (v) => { profile.duration = v; onChange(); }),
    renderRangeKnob({ key: "gain", label: "gain", type: "range", min: 0, max: 1, step: 0.01 }, profile.gain ?? 0.2, (v) => { profile.gain = v; onChange(); }),
    renderTextNumberKnob({ key: "attackTime", label: "attackTime", unit: "s", type: "text_number" }, profile.attackTime ?? 0, (v) => { profile.attackTime = v; onChange(); }),
    renderSelectKnob({ key: "decayCurve", label: "decay curve", type: "select", options: ["exponential", "linear"] }, profile.decayCurve ?? "exponential", (v) => { profile.decayCurve = v; onChange(); }),
  ]);
  card.appendChild(envList);

  // Source-type-specific knobs.
  const sourceDef = getSource(profile.type);
  if (sourceDef) {
    const sourceList = el("div", { class: "dev-sound-knob-list" });
    for (const knob of sourceDef.knobs) {
      const value = profile[knob.key] ?? sourceDef.defaults[knob.key];
      sourceList.appendChild(renderKnob(knob, value, (v) => {
        profile[knob.key] = v;
        onChange();
      }));
    }
    card.appendChild(sourceList);
  }

  // Nested effects list.
  if (!Array.isArray(profile.effects)) profile.effects = [];
  card.appendChild(el("div", { class: "dev-sound-effects-label", text: "Effects" }));
  const effectList = el("div", { class: "dev-sound-effect-list" });
  const renderAllEffects = () => {
    effectList.innerHTML = "";
    profile.effects.forEach((effect, eIdx) => {
      effectList.appendChild(renderEffectCard(effect, onChange, () => {
        profile.effects.splice(eIdx, 1);
        onChange();
        renderAllEffects();
      }));
    });
  };
  renderAllEffects();
  card.appendChild(effectList);

  card.appendChild(el("button", {
    type: "button",
    class: "dev-sound-add-button",
    onClick: () => {
      const defaultType = "delay";
      profile.effects.push({ type: defaultType, ...getEffectDefaults(defaultType) });
      onChange();
      renderAllEffects();
    },
  }, ["+ Add Effect"]));

  return card;
};

const renderProfileSynthBody = (profiles, onChange) => {
  const wrap = el("div", { class: "dev-sound-knob-list" });
  const list = el("div", { class: "dev-sound-profile-list" });

  const scrollProfileIntoView = (profileIdx) => {
    requestAnimationFrame(() => {
      list.children[profileIdx]?.scrollIntoView?.({
        behavior: "smooth",
        block: "center",
      });
    });
  };

  const renderAll = (scrollToIdx = null) => {
    list.innerHTML = "";
    profiles.forEach((profile, idx) => {
      list.appendChild(renderProfileCard(profile, idx, onChange, () => {
        profiles.splice(idx, 1);
        onChange();
        renderAll();
      }, () => {
        profiles.splice(idx + 1, 0, cloneProfile(profile));
        onChange();
        renderAll();
        scrollProfileIntoView(idx + 1);
      }));
    });
    if (scrollToIdx != null) scrollProfileIntoView(scrollToIdx);
  };
  renderAll();
  wrap.appendChild(list);

  // Default new profiles to the type of the most recent profile so adding
  // a second oscillator (after switching the first to oscillator) doesn't
  // surprise the user with the original noise_filter default.
  wrap.appendChild(el("button", {
    type: "button",
    class: "dev-sound-add-button dev-sound-add-profile-button",
    onClick: () => {
      const lastType = profiles.length ? profiles[profiles.length - 1].type : "oscillator";
      profiles.push({
        type: lastType,
        description: "",
        startOffset: 0,
        duration: 0.04,
        gain: 0.2,
        attackTime: 0,
        decayCurve: "exponential",
        ...getSourceDefaults(lastType),
      });
      onChange();
      renderAll();
    },
  }, ["+ Add Sound Profile"]));

  return wrap;
};

// ---------------------------------------------------------------------------
// Public renderPanel(): builds the whole knob panel for one entry.
// `onPersist` is called (debounced by the caller) on every state mutation
// with the current full state object.
// ---------------------------------------------------------------------------

export const renderPanel = ({
  entry,
  state,             // { name, description, params? | profiles? }
  onPersist,
}) => {
  const root = el("section", { class: "dev-sound-panel" });

  const header = renderHeaderBlock(state, onPersist);
  root.appendChild(header);

  if (entry.kind === "tunable_recipe") {
    if (!state.params) state.params = {};
    root.appendChild(renderTunableRecipeBody(entry, state.params, onPersist));

    // Existing bespoke sounds can also be augmented with extra Sound
    // Profiles played simultaneously on top. The bespoke synthesis stays
    // exactly as-is; these layer on independently and also flow into the
    // copy payload so I can promote them into a sibling
    // `<NAME>_EXTRA_PROFILES` const + tail `playProfileSynth(...)` call
    // when you paste the payload back.
    if (!Array.isArray(state.profiles)) state.profiles = [];
    root.appendChild(el("div", { class: "dev-sound-section-divider" }));
    root.appendChild(el("h2", { class: "dev-sound-section-heading", text: "Additional Sound Profiles" }));
    root.appendChild(el("p", {
      class: "dev-sound-section-hint",
      text: "Layer extra profiles on top of the bespoke synthesis above. Played simultaneously. Saved alongside the params override.",
    }));
    root.appendChild(renderProfileSynthBody(state.profiles, onPersist));
  } else if (entry.kind === "profile_synth") {
    if (!Array.isArray(state.profiles)) state.profiles = [];
    root.appendChild(renderProfileSynthBody(state.profiles, onPersist));
  } else {
    root.appendChild(el("div", { text: `Unknown sound kind: ${entry.kind}` }));
  }

  return root;
};
