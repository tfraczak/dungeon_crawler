// Dev Sound Sandbox drawer install hook. Sibling of `dev_options_drawer.js`:
// hidden in production via `body.dev-mode` gating, slides in from the right
// when the music-note icon in the header nav is clicked.
//
// Responsibilities:
//   - open/close the drawer
//   - build the dropdown from registry + preset library + custom sounds
//   - on dropdown change, render the knob panel for the selected entry
//     (state = registry defaults merged with localStorage overrides)
//   - persist edits to localStorage with debouncing
//   - run the entry's `play` fn when Play is clicked, with the live
//     overrides applied
//   - "Play sample" button (only when the entry declares a `sample`)
//   - Reset to defaults: clear overrides, re-render with defaults
//   - Copy values: emit the structured JSON payload (in a fenced
//     ```json block) to the clipboard
//   - "+ Add experimental sound" flow: prompt for Name, pick a preset
//     template, persist as a custom entry
//   - Delete on custom entries
//
// Entire module is a no-op in production: the NODE_ENV check below bails
// out before touching the DOM, and webpack's tree-shaker drops the rest.

import { listEntries, BUILT_IN_CATEGORIES } from "./registry";
import { listPresetIds, getPreset } from "./presets";
import {
  readOverrides,
  writeOverrides,
  clearOverrides,
  listCustomSounds,
  saveCustomSound,
  deleteCustomSound,
  isCustomSoundIdTaken,
} from "./storage";
import { renderPanel } from "./knob_renderer";
import { formatPayloadString } from "./copy_format";
import { playProfileSynth } from "@core/profile_synth";
import { slugifyId } from "./naming";

const PRESET_PREFIX = "preset_";
const CUSTOM_PREFIX = "custom_";
const PERSIST_DEBOUNCE_MS = 150;

// ---------------------------------------------------------------------------
// Virtual entries: presets + custom sounds wrapped to look like registry
// entries to the renderer / picker.
// ---------------------------------------------------------------------------

const presetToEntry = (presetId) => {
  const preset = getPreset(presetId);
  if (!preset) return null;
  return {
    id: PRESET_PREFIX + presetId,
    defaultName: `Preset: ${preset.label}`,
    defaultDescription: preset.description,
    category: "Library presets",
    kind: "profile_synth",
    defaults: { profiles: preset.profiles },
    play: (overrides) => playProfileSynth(overrides?.profiles ?? overrides),
  };
};

const customToEntry = (custom) => ({
  id: CUSTOM_PREFIX + custom.id,
  defaultName: custom.name,
  defaultDescription: custom.description ?? "",
  category: "My experiments",
  kind: "profile_synth",
  isCustom: true,
  customId: custom.id,
  defaults: { profiles: custom.profiles ?? [] },
  play: (overrides) => playProfileSynth(overrides?.profiles ?? overrides),
});

// Build the full list of entries currently visible in the dropdown:
// built-in (registry) + presets + custom sounds. Recomputed any time the
// custom-sounds list changes (add / delete).
const collectAllEntries = () => {
  const builtIns = listEntries();
  const presets = listPresetIds().map(presetToEntry).filter(Boolean);
  const customs = listCustomSounds().map(customToEntry);
  return [...builtIns, ...presets, ...customs];
};

const findEntry = (id, allEntries) => allEntries.find((e) => e.id === id) ?? null;

// ---------------------------------------------------------------------------
// State derivation: registry defaults merged with localStorage overrides.
// `tunable_recipe`: state = { name, description, params: {...} }
// `profile_synth`:  state = { name, description, profiles: [...] }
// ---------------------------------------------------------------------------

const deepClone = (v) => (v == null ? v : JSON.parse(JSON.stringify(v)));

const buildInitialState = (entry) => {
  const overrides = readOverrides(entry.id) ?? {};
  const name = overrides.name ?? entry.defaultName ?? "";
  const description = overrides.description ?? entry.defaultDescription ?? "";

  if (entry.kind === "tunable_recipe") {
    return {
      name,
      description,
      params: { ...entry.defaults, ...(overrides.params ?? {}) },
      // Optional extra Sound Profiles layered on top of the bespoke
      // synthesis (defaults to empty -- no augmentation).
      profiles: deepClone(Array.isArray(overrides.profiles) ? overrides.profiles : []),
    };
  }
  if (entry.kind === "profile_synth") {
    const fromOverride = Array.isArray(overrides.profiles) ? overrides.profiles : null;
    const fromDefault = Array.isArray(entry.defaults?.profiles) ? entry.defaults.profiles : [];
    return {
      name,
      description,
      profiles: deepClone(fromOverride ?? fromDefault),
    };
  }
  return { name, description };
};

// Strip override keys that match defaults so localStorage doesn't bloat
// with redundant data. Returns a minimal payload ready for writeOverrides
// (or null if everything matches defaults, signaling clearOverrides).
const minimizeOverrides = (entry, state) => {
  const out = {};
  if (state.name && state.name !== entry.defaultName) out.name = state.name;
  if (state.description && state.description !== entry.defaultDescription) out.description = state.description;

  if (entry.kind === "tunable_recipe") {
    const diff = {};
    for (const [k, v] of Object.entries(state.params ?? {})) {
      if (entry.defaults[k] !== v) diff[k] = v;
    }
    if (Object.keys(diff).length > 0) out.params = diff;
    // Extra layered profiles persist when present; an empty array means
    // "no augmentation" and is omitted so the entry can fully revert to
    // pristine defaults.
    if (Array.isArray(state.profiles) && state.profiles.length > 0) {
      out.profiles = deepClone(state.profiles);
    }
  } else if (entry.kind === "profile_synth") {
    // For profile_synth we always store the full profile array because
    // structural diffs (added profiles, reordered effects) are too
    // expensive to compute and roundtrip for marginal storage gain.
    out.profiles = deepClone(state.profiles ?? []);
  }

  return Object.keys(out).length === 0 ? null : out;
};

// ---------------------------------------------------------------------------
// Dropdown rendering -- groups entries by category via <optgroup>.
// ---------------------------------------------------------------------------

const ALL_CATEGORIES = [...BUILT_IN_CATEGORIES, "Library presets", "My experiments"];

const populateSelect = (select, entries, currentId) => {
  select.innerHTML = "";
  for (const category of ALL_CATEGORIES) {
    const group = entries.filter((e) => e.category === category);
    if (group.length === 0) continue;
    const og = document.createElement("optgroup");
    og.label = category;
    for (const entry of group) {
      const opt = document.createElement("option");
      opt.value = entry.id;
      opt.textContent = entry.defaultName;
      if (entry.id === currentId) opt.selected = true;
      og.appendChild(opt);
    }
    select.appendChild(og);
  }
};

// ---------------------------------------------------------------------------
// Status flash ("Copied!", "No clipboard available", etc.).
// ---------------------------------------------------------------------------

const flashStatus = (statusEl, text, kind = "ok", ttl = 2000) => {
  statusEl.textContent = text;
  statusEl.className = `dev-sound-status ${kind}`;
  if (statusEl._flashTimer) clearTimeout(statusEl._flashTimer);
  statusEl._flashTimer = setTimeout(() => {
    statusEl.textContent = "";
    statusEl.className = "dev-sound-status";
  }, ttl);
};

const writeToClipboard = async (text) => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallthrough to legacy
    }
  }
  // Fallback: temp <textarea> + execCommand. Works in dev contexts where
  // clipboard API is unavailable (insecure origin, etc.).
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
};

// ---------------------------------------------------------------------------
// "+ Add experimental sound" flow: minimal inline prompts (window.prompt)
// for Name + preset choice. Dev-only drawer, so a custom modal is overkill.
// ---------------------------------------------------------------------------

const promptForCustomSound = () => {
  const name = window.prompt("Name your experimental sound:", "");
  if (name == null) return null;
  const trimmed = name.trim();
  if (!trimmed) return null;

  let id = slugifyId(trimmed);
  if (!id) {
    window.alert("Name must contain at least one letter or digit.");
    return null;
  }
  // Disambiguate against existing customs by suffixing _2, _3, ...
  if (isCustomSoundIdTaken(id)) {
    let n = 2;
    while (isCustomSoundIdTaken(`${id}_${n}`)) n++;
    id = `${id}_${n}`;
  }

  const presets = listPresetIds();
  const presetList = presets.map((p, i) => `${i + 1}. ${p}`).join("\n");
  const choice = window.prompt(
    `Pick a preset to start from (number or name):\n${presetList}`,
    "blank",
  );
  if (choice == null) return null;
  const trimmedChoice = choice.trim();
  const asNum = Number(trimmedChoice);
  let presetId;
  if (Number.isInteger(asNum) && asNum >= 1 && asNum <= presets.length) {
    presetId = presets[asNum - 1];
  } else if (presets.includes(trimmedChoice)) {
    presetId = trimmedChoice;
  } else {
    presetId = "blank";
  }

  const preset = getPreset(presetId);
  return {
    id,
    name: trimmed,
    description: "",
    profiles: deepClone(preset?.profiles ?? []),
  };
};

// ---------------------------------------------------------------------------
// Main install entry point.
// ---------------------------------------------------------------------------

export default function installSoundSandbox(_gameState) {
  if (process.env.NODE_ENV === "production") return;

  const drawer = document.getElementById("dev-sound-sandbox-page");
  const openBtn = document.getElementById("dev-sound-sandbox-link");
  const closeBtn = document.getElementById("dev-sound-sandbox-close");
  const select = document.getElementById("dev-sound-sandbox-select");
  const knobSlot = document.getElementById("dev-sound-sandbox-knob-slot");
  const statusEl = document.getElementById("dev-sound-sandbox-status");
  const addCustomBtn = document.getElementById("dev-sound-sandbox-add-custom");
  if (!drawer || !openBtn || !select || !knobSlot) return;

  let allEntries = collectAllEntries();
  let currentEntry = allEntries[0] ?? null;
  let currentState = currentEntry ? buildInitialState(currentEntry) : null;
  let persistTimer = null;

  const open = () => {
    drawer.classList.add("active");
    drawer.setAttribute("aria-hidden", "false");
    drawer.scrollTop = 0;
  };
  const close = () => {
    drawer.classList.remove("active");
    drawer.setAttribute("aria-hidden", "true");
  };

  // Persist current state to localStorage. Debounced so a slider drag
  // doesn't write on every input event.
  const schedulePersist = () => {
    if (persistTimer) clearTimeout(persistTimer);
    persistTimer = setTimeout(() => {
      persistTimer = null;
      if (!currentEntry || !currentState) return;
      if (currentEntry.isCustom) {
        // Custom sounds always store the full state in their own table,
        // not in the per-sound overrides table.
        saveCustomSound({
          id: currentEntry.customId,
          name: currentState.name,
          description: currentState.description,
          profiles: currentState.profiles ?? [],
        });
        // Refresh the dropdown label in case Name changed.
        allEntries = collectAllEntries();
        // Keep selection on the same custom (its id is stable).
        populateSelect(select, allEntries, currentEntry.id);
        // Re-resolve currentEntry to the freshly built one (defaults
        // updated to track Name).
        currentEntry = findEntry(currentEntry.id, allEntries) ?? currentEntry;
      } else {
        const minimal = minimizeOverrides(currentEntry, currentState);
        if (minimal) writeOverrides(currentEntry.id, minimal);
        else clearOverrides(currentEntry.id);
      }
    }, PERSIST_DEBOUNCE_MS);
  };

  // Build + mount the panel for the current entry.
  const renderCurrentPanel = () => {
    knobSlot.innerHTML = "";
    if (!currentEntry || !currentState) return;

    const panel = renderPanel({
      entry: currentEntry,
      state: currentState,
      onPersist: schedulePersist,
      onPlay: () => {
        try {
          if (currentEntry.kind === "tunable_recipe") {
            currentEntry.play(currentState.params);
            // Layer any extra Sound Profiles on top of the bespoke
            // synthesis so the user hears them play simultaneously.
            if (Array.isArray(currentState.profiles) && currentState.profiles.length > 0) {
              playProfileSynth(currentState.profiles);
            }
          } else {
            currentEntry.play({ profiles: currentState.profiles });
          }
        } catch (err) {
          flashStatus(statusEl, `Play failed: ${err.message}`, "err");
        }
      },
      onSample: currentEntry.sample?.audioElementId
        ? () => {
            const audio = document.getElementById(currentEntry.sample.audioElementId);
            if (audio) {
              audio.currentTime = 0;
              audio.play().catch(() => {});
            }
          }
        : null,
      onReset: () => {
        if (currentEntry.isCustom) {
          // For customs, "reset" means revert to the preset/empty
          // profiles the entry was created from. We don't track that,
          // so the safest UX is no-op + status hint. Users can edit
          // freely or delete to start over.
          flashStatus(statusEl, "Custom sounds have no defaults to reset to.", "err");
          return;
        }
        clearOverrides(currentEntry.id);
        currentState = buildInitialState(currentEntry);
        renderCurrentPanel();
        flashStatus(statusEl, "Reset to defaults.");
      },
      onCopy: async () => {
        // For tunable_recipe entries we now carry both `params` (the
        // bespoke knobs) and an optional `profiles` array (extra layered
        // Sound Profiles). copy_format inspects both fields and emits the
        // extras only when present.
        const valuesForPayload = currentEntry.kind === "tunable_recipe"
          ? { params: currentState.params, profiles: currentState.profiles }
          : { profiles: currentState.profiles };
        const text = formatPayloadString(currentEntry, valuesForPayload, {
          name: currentState.name,
          description: currentState.description,
        });
        const ok = await writeToClipboard(text);
        flashStatus(statusEl, ok ? "Copied to clipboard." : "Could not access clipboard.", ok ? "ok" : "err");
      },
      onDelete: currentEntry.isCustom
        ? () => {
            if (!window.confirm(`Delete "${currentState.name}"? This cannot be undone.`)) return;
            deleteCustomSound(currentEntry.customId);
            allEntries = collectAllEntries();
            currentEntry = allEntries[0] ?? null;
            currentState = currentEntry ? buildInitialState(currentEntry) : null;
            populateSelect(select, allEntries, currentEntry?.id);
            renderCurrentPanel();
            flashStatus(statusEl, "Custom sound deleted.");
          }
        : null,
    });
    knobSlot.appendChild(panel);
  };

  // Initial dropdown + panel population.
  populateSelect(select, allEntries, currentEntry?.id);
  renderCurrentPanel();

  select.addEventListener("change", (e) => {
    const next = findEntry(e.target.value, allEntries);
    if (!next) return;
    // Flush any pending writes for the outgoing entry first.
    if (persistTimer) {
      clearTimeout(persistTimer);
      persistTimer = null;
      if (currentEntry?.isCustom) {
        saveCustomSound({
          id: currentEntry.customId,
          name: currentState.name,
          description: currentState.description,
          profiles: currentState.profiles ?? [],
        });
      } else if (currentEntry) {
        const minimal = minimizeOverrides(currentEntry, currentState);
        if (minimal) writeOverrides(currentEntry.id, minimal);
        else clearOverrides(currentEntry.id);
      }
    }
    currentEntry = next;
    currentState = buildInitialState(currentEntry);
    renderCurrentPanel();
  });

  addCustomBtn?.addEventListener("click", () => {
    const created = promptForCustomSound();
    if (!created) return;
    saveCustomSound(created);
    allEntries = collectAllEntries();
    const newEntryId = CUSTOM_PREFIX + created.id;
    currentEntry = findEntry(newEntryId, allEntries);
    currentState = buildInitialState(currentEntry);
    populateSelect(select, allEntries, newEntryId);
    renderCurrentPanel();
    flashStatus(statusEl, `Added "${created.name}".`);
  });

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    open();
  });
  closeBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("active")) close();
  });
}
