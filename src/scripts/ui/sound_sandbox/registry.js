// Central manifest of all sandboxable sounds. The drawer dropdown reads
// from `listEntries()`, the knob panel reads `getEntry(id)`, and the
// "Copy values" payload reads `sourceFile` / `constName` from each entry
// to embed routing metadata in the JSON.
//
// Categories drive the dropdown's <optgroup> grouping and are also
// surfaced as labels inside the knob panel header. Adding a new built-in
// sound is a one-file change here once the underlying module exposes a
// frozen `<NAME>_PARAMS` constant.
//
// User-spawned customs and library presets are merged into this manifest
// at runtime by `install.js` via `getEffectiveEntries()` -- see below.

import playCoinSound, { playCoinDrop, COIN_PICKUP_PARAMS, COIN_DROP_PARAMS } from "@entities/coin/sound";
import playHpPotionSound, { playHpPotionDrop, HP_POTION_PICKUP_PARAMS, HP_POTION_DROP_PARAMS } from "@entities/hp_potion/sound";
import playFootstep, { FOOTSTEP_PARAMS } from "@entities/player/sound";
import playPoofSound, { POOF_PARAMS } from "@entities/enemy/sound";
import { playSlashHit, playSlashWhiff, SLASH_HIT_PARAMS, SLASH_WHIFF_PARAMS } from "@items/equipment/weapons/swords/sound";
import { playClick, DEFAULT_CLICK_PROFILES } from "@ui/sound";

// ---------------------------------------------------------------------------
// Knob descriptor shorthand. `range` is the workhorse for bounded knobs;
// `select` for enums. `text_number` is reserved for unbounded numeric
// inputs (startOffset / duration / delayTime / reverb.duration) -- those
// are added by the profile_synth renderer, not by tunable_recipe entries.
// ---------------------------------------------------------------------------

const range = (key, label, min, max, step, extras = {}) => ({
  key, label, type: "range", min, max, step, ...extras,
});

// ---------------------------------------------------------------------------
// Built-in registry entries. `tunable_recipe` for bespoke synthesis modules
// whose tunability surface is a flat <NAME>_PARAMS object; `profile_synth`
// for the click sound (and -- once preset-library-and-custom lands --
// every preset and user custom).
// ---------------------------------------------------------------------------

const BUILT_IN_ENTRIES = [
  {
    id: "coin_pickup",
    defaultName: "Coin pickup",
    defaultDescription: "Randomized metallic ping when a coin is collected",
    category: "Game sounds",
    kind: "tunable_recipe",
    sourceFile: "src/scripts/entities/coin/sound.js",
    constName: "COIN_PICKUP_PARAMS",
    defaults: COIN_PICKUP_PARAMS,
    play: (overrides) => playCoinSound(overrides),
    knobs: [
      range("baseFreq",         "Base freq",         200, 5000, 10, { unit: "Hz" }),
      range("freqRandomRange",  "Freq jitter",         0, 3000, 10, { unit: "Hz" }),
      range("detuneRange",      "Detune range",        0,  600,  5, { unit: "c" }),
      range("gain",             "Gain",                0,    1, 0.01),
      range("duration",         "Duration",         0.05,    2, 0.05, { unit: "s" }),
      range("harmonicMultMin",  "Harm mult min",       1,    8, 0.1),
      range("harmonicMultMax",  "Harm mult max",       1,    8, 0.1),
      range("harmonicGain",     "Harmonic gain",       0,  0.5, 0.005),
      range("harmonicDuration", "Harmonic dur",     0.05,    2, 0.05, { unit: "s" }),
    ],
  },
  {
    id: "coin_drop",
    defaultName: "Coin drop",
    defaultDescription: "Soft metallic tink when a coin lands",
    category: "Game sounds",
    kind: "tunable_recipe",
    sourceFile: "src/scripts/entities/coin/sound.js",
    constName: "COIN_DROP_PARAMS",
    defaults: COIN_DROP_PARAMS,
    play: (overrides) => playCoinDrop(overrides),
    knobs: [
      range("baseFreq",        "Base freq",      100, 3000, 10, { unit: "Hz" }),
      range("freqRandomRange", "Freq jitter",      0, 2000, 10, { unit: "Hz" }),
      range("detuneRange",     "Detune range",     0,  600,  5, { unit: "c" }),
      range("gain",            "Gain",             0,    1, 0.01),
      range("duration",        "Duration",      0.02,    2, 0.02, { unit: "s" }),
    ],
  },
  {
    id: "hp_potion_pickup",
    defaultName: "HP potion pickup",
    defaultDescription: "Ascending 3-note chime with a bell harmonic for healing",
    category: "Game sounds",
    kind: "tunable_recipe",
    sourceFile: "src/scripts/entities/hp_potion/sound.js",
    constName: "HP_POTION_PICKUP_PARAMS",
    defaults: HP_POTION_PICKUP_PARAMS,
    play: (overrides) => playHpPotionSound(overrides),
    knobs: [
      range("root",             "Root freq",      100, 2000, 10, { unit: "Hz" }),
      range("noteSpacing",      "Note spacing",  0.01,  0.5, 0.01, { unit: "s" }),
      range("noteDuration",     "Note duration", 0.02,    2, 0.02, { unit: "s" }),
      range("noteGain",         "Note gain",        0,  0.5, 0.005),
      range("bellHarmonicMult", "Bell mult",        1,    8, 0.1),
      range("bellGain",         "Bell gain",        0,  0.3, 0.005),
    ],
  },
  {
    id: "hp_potion_drop",
    defaultName: "HP potion drop",
    defaultDescription: "Muted glassy thunk when an HP potion lands",
    category: "Game sounds",
    kind: "tunable_recipe",
    sourceFile: "src/scripts/entities/hp_potion/sound.js",
    constName: "HP_POTION_DROP_PARAMS",
    defaults: HP_POTION_DROP_PARAMS,
    play: (overrides) => playHpPotionDrop(overrides),
    knobs: [
      range("baseFreq",        "Base freq",      80, 2000, 10, { unit: "Hz" }),
      range("freqRandomRange", "Freq jitter",     0, 1000, 10, { unit: "Hz" }),
      range("detuneRange",     "Detune range",    0,  400,  5, { unit: "c" }),
      range("gain",            "Gain",            0,    1, 0.01),
      range("duration",        "Duration",     0.02,    2, 0.02, { unit: "s" }),
    ],
  },
  {
    id: "footstep_walking",
    defaultName: "Footstep (walking)",
    defaultDescription: "Bandpass-filtered noise scrape with a low thud, walking flavor",
    category: "Game sounds",
    kind: "tunable_recipe",
    sourceFile: "src/scripts/entities/player/sound.js",
    // Drawer edits the walking sub-object only; unwraps below before play.
    constName: "FOOTSTEP_PARAMS.walking",
    // Dotted path above can't suffix into a valid JS identifier, so
    // declare the extras const name explicitly. Lives as a top-level
    // sibling of FOOTSTEP_PARAMS in player/sound.js.
    extraProfilesConstName: "FOOTSTEP_WALKING_EXTRA_PROFILES",
    defaults: FOOTSTEP_PARAMS.walking,
    play: (overrides) => playFootstep(false, { walking: overrides }),
    knobs: [
      range("duration",       "Duration",      0.02,    1, 0.01, { unit: "s" }),
      range("volume",         "Volume",           0,    1, 0.01),
      range("baseFreq",       "Filter freq",     50, 5000, 10, { unit: "Hz" }),
      range("baseFreqRandom", "Filter jitter",    0, 2000, 10, { unit: "Hz" }),
      range("q",              "Filter Q",       0.1,   30, 0.1),
      range("thudFreq",       "Thud freq",       20,  500,  1, { unit: "Hz" }),
      range("thudFreqRandom", "Thud jitter",      0,  200,  1, { unit: "Hz" }),
      range("thudFreqEnd",    "Thud end freq",   10,  300,  1, { unit: "Hz" }),
      range("thudGainMult",   "Thud gain mult",   0,    2, 0.01),
      range("thudDuration",   "Thud duration", 0.01,  0.5, 0.01, { unit: "s" }),
    ],
  },
  {
    id: "footstep_sprinting",
    defaultName: "Footstep (sprinting)",
    defaultDescription: "Bandpass-filtered noise scrape with a low thud, sprinting flavor",
    category: "Game sounds",
    kind: "tunable_recipe",
    sourceFile: "src/scripts/entities/player/sound.js",
    constName: "FOOTSTEP_PARAMS.sprinting",
    // See note on footstep_walking above.
    extraProfilesConstName: "FOOTSTEP_SPRINTING_EXTRA_PROFILES",
    defaults: FOOTSTEP_PARAMS.sprinting,
    play: (overrides) => playFootstep(true, { sprinting: overrides }),
    knobs: [
      range("duration",       "Duration",      0.02,    1, 0.01, { unit: "s" }),
      range("volume",         "Volume",           0,    1, 0.01),
      range("baseFreq",       "Filter freq",     50, 5000, 10, { unit: "Hz" }),
      range("baseFreqRandom", "Filter jitter",    0, 2000, 10, { unit: "Hz" }),
      range("q",              "Filter Q",       0.1,   30, 0.1),
      range("thudFreq",       "Thud freq",       20,  500,  1, { unit: "Hz" }),
      range("thudFreqRandom", "Thud jitter",      0,  200,  1, { unit: "Hz" }),
      range("thudFreqEnd",    "Thud end freq",   10,  300,  1, { unit: "Hz" }),
      range("thudGainMult",   "Thud gain mult",   0,    2, 0.01),
      range("thudDuration",   "Thud duration", 0.01,  0.5, 0.01, { unit: "s" }),
    ],
  },
  {
    id: "enemy_poof",
    defaultName: "Enemy poof",
    defaultDescription: "Lowpass-swept noise burst with a low thump for enemy defeat",
    category: "Game sounds",
    kind: "tunable_recipe",
    sourceFile: "src/scripts/entities/enemy/sound.js",
    constName: "POOF_PARAMS",
    defaults: POOF_PARAMS,
    play: (overrides) => playPoofSound(overrides),
    knobs: [
      range("duration",        "Duration",      0.05,     2, 0.01, { unit: "s" }),
      range("noiseGain",       "Noise gain",       0,     1, 0.01),
      range("filterStartFreq", "Filter start", 50, 5000, 10, { unit: "Hz" }),
      range("filterEndFreq",   "Filter end",   20, 3000, 10, { unit: "Hz" }),
      range("thumpStartFreq",  "Thump start",  20,  500,  1, { unit: "Hz" }),
      range("thumpEndFreq",    "Thump end",    10,  300,  1, { unit: "Hz" }),
      range("thumpGain",       "Thump gain",       0,     1, 0.01),
      range("thumpDuration",   "Thump dur",     0.01,  0.5, 0.01, { unit: "s" }),
    ],
  },
  {
    id: "slash_hit",
    defaultName: "Sword slash hit",
    defaultDescription: "Stuttered bandpass noise burst when the sword connects",
    category: "Game sounds",
    kind: "tunable_recipe",
    sourceFile: "src/scripts/items/equipment/weapons/swords/sound.js",
    constName: "SLASH_HIT_PARAMS",
    defaults: SLASH_HIT_PARAMS,
    play: (overrides) => playSlashHit(overrides),
    knobs: [
      range("duration",        "Duration",      0.05,    2, 0.01, { unit: "s" }),
      range("rippleFreq",      "Ripple freq",     20, 2000, 10, { unit: "Hz" }),
      range("decayPow",        "Decay power",    0.1,    5, 0.1),
      range("gain",            "Gain",             0,    1, 0.01),
      range("filterStartFreq", "Filter start",    50, 8000, 10, { unit: "Hz" }),
      range("filterEndFreq",   "Filter end",      20, 5000, 10, { unit: "Hz" }),
      range("q",               "Filter Q",       0.1,   30, 0.1),
    ],
  },
  {
    id: "slash_whiff",
    defaultName: "Sword slash whiff",
    defaultDescription: "Highpass noise sweep for a sword swing that misses",
    category: "Game sounds",
    kind: "tunable_recipe",
    sourceFile: "src/scripts/items/equipment/weapons/swords/sound.js",
    constName: "SLASH_WHIFF_PARAMS",
    defaults: SLASH_WHIFF_PARAMS,
    play: (overrides) => playSlashWhiff(overrides),
    knobs: [
      range("duration",        "Duration",      0.02,    1, 0.01, { unit: "s" }),
      range("gain",            "Gain",             0,    1, 0.01),
      range("filterStartFreq", "Filter start",    50, 8000, 10, { unit: "Hz" }),
      range("filterEndFreq",   "Filter end",      20, 8000, 10, { unit: "Hz" }),
    ],
  },
  {
    id: "click",
    defaultName: "UI click",
    defaultDescription: "Mechanical button click used by restart and how-to buttons",
    category: "UI",
    kind: "profile_synth",
    sourceFile: "src/scripts/ui/sound.js",
    constName: "DEFAULT_CLICK_PROFILES",
    defaults: { profiles: DEFAULT_CLICK_PROFILES },
    play: (overrides) => playClick(overrides?.profiles ?? overrides),
    sample: { audioElementId: "restart-sound" },
  },
];

const ENTRIES_BY_ID = new Map(BUILT_IN_ENTRIES.map((e) => [e.id, e]));

export const listEntries = () => BUILT_IN_ENTRIES.slice();

export const getEntry = (id) => ENTRIES_BY_ID.get(id) ?? null;

// Ordered list of categories the renderer uses to build dropdown
// <optgroup>s. Custom + library categories appended by install.js once
// those features land in their own phase.
export const BUILT_IN_CATEGORIES = ["Game sounds", "UI"];
