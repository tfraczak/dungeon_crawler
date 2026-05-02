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

import playCoinSound, {
  playCoinDrop,
  playCoinStolen,
  COIN_PICKUP_PARAMS,
  COIN_PICKUP_EXTRA_PROFILES,
  COIN_DROP_PARAMS,
  COIN_DROP_EXTRA_PROFILES,
  COIN_STOLEN_PROFILES,
} from "@entities/coin/sound";
import playHpPotionSound, {
  playHpPotionDrop,
  HP_POTION_PICKUP_PARAMS,
  HP_POTION_DROP_PARAMS,
  HP_POTION_DROP_EXTRA_PROFILES,
} from "@entities/hp_potion/sound";
import playFootstep, {
  FOOTSTEP_PARAMS,
  FOOTSTEP_WALKING_EXTRA_PROFILES,
  FOOTSTEP_SPRINTING_EXTRA_PROFILES,
} from "@entities/player/sound";
import {
  playPoisonStatusEffect,
  POISON_STATUS_EFFECT_PROFILES,
} from "@entities/player/status_effects/poison/sound";
import playPoofSound, { POOF_PROFILES } from "@entities/enemy/sound";
import { BAT_BITE_PROFILES, playBatBite } from "@entities/enemy/bat/sound";
import { BLOB_ATTACK_HIT_PROFILES, playBlobAttackHit } from "@entities/enemy/blob/sound";
import {
  playIceCrystalCast,
  playIceCrystalHit,
  playIceCrystalWallHit,
  ICE_CRYSTAL_CAST_PROFILES,
  ICE_CRYSTAL_HIT_PROFILES,
  ICE_CRYSTAL_WALL_HIT_PROFILES,
} from "@entities/projectiles/ice_crystal/sound";
import {
  playDaggerHit,
  playDaggerSwing,
  DAGGER_HIT_PROFILES,
  DAGGER_SWING_PROFILES,
} from "@items/equipment/weapons/daggers/sound";
import { playSlashHit, playSlashSwing, SLASH_HIT_PROFILES, SLASH_SWING_PROFILES } from "@items/equipment/weapons/swords/sound";
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
    defaultExtraProfiles: COIN_PICKUP_EXTRA_PROFILES,
    extraProfilesConstName: "COIN_PICKUP_EXTRA_PROFILES",
    handlesProfiles: true,
    play: (overrides, profiles) => playCoinSound({ ...overrides, extraProfiles: profiles }),
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
    defaultExtraProfiles: COIN_DROP_EXTRA_PROFILES,
    extraProfilesConstName: "COIN_DROP_EXTRA_PROFILES",
    handlesProfiles: true,
    play: (overrides, profiles) => playCoinDrop({ ...overrides, extraProfiles: profiles }),
    knobs: [
      range("baseFreq",        "Base freq",      100, 3000, 10, { unit: "Hz" }),
      range("freqRandomRange", "Freq jitter",      0, 2000, 10, { unit: "Hz" }),
      range("detuneRange",     "Detune range",     0,  600,  5, { unit: "c" }),
      range("gain",            "Gain",             0,    1, 0.01),
      range("duration",        "Duration",      0.02,    2, 0.02, { unit: "s" }),
    ],
  },
  {
    id: "coin_stolen",
    defaultName: "Coin stolen sound",
    defaultDescription: "The sound that's played when a coin is stolen.",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/entities/coin/sound.js",
    constName: "COIN_STOLEN_PROFILES",
    defaults: { profiles: COIN_STOLEN_PROFILES },
    play: (overrides) => playCoinStolen(overrides?.profiles ?? overrides),
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
    defaultExtraProfiles: HP_POTION_DROP_EXTRA_PROFILES,
    extraProfilesConstName: "HP_POTION_DROP_EXTRA_PROFILES",
    handlesProfiles: true,
    play: (overrides, profiles) => playHpPotionDrop({ ...overrides, extraProfiles: profiles }),
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
    defaultExtraProfiles: FOOTSTEP_WALKING_EXTRA_PROFILES,
    handlesProfiles: true,
    play: (overrides, profiles) => playFootstep(false, {
      walking: { ...overrides, extraProfiles: profiles },
    }),
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
    defaultExtraProfiles: FOOTSTEP_SPRINTING_EXTRA_PROFILES,
    handlesProfiles: true,
    play: (overrides, profiles) => playFootstep(true, {
      sprinting: { ...overrides, extraProfiles: profiles },
    }),
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
    id: "poison_status_effect",
    defaultName: "Poison status effect",
    defaultDescription: "The bubbling sounds of being poisoned.",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/entities/player/status_effects/poison/sound.js",
    constName: "POISON_STATUS_EFFECT_PROFILES",
    defaults: { profiles: POISON_STATUS_EFFECT_PROFILES },
    play: (overrides) => playPoisonStatusEffect(overrides?.profiles ?? overrides),
  },
  {
    id: "enemy_poof",
    defaultName: "Enemy poof",
    defaultDescription: "Sound played when an enemy is killed.",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/entities/enemy/sound.js",
    constName: "POOF_PROFILES",
    defaults: { profiles: POOF_PROFILES },
    play: (overrides) => playPoofSound(overrides?.profiles ?? overrides),
  },
  {
    id: "bat_bite",
    defaultName: "Bat bite",
    defaultDescription: "Short piercing gouging sound when the bat bites",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/entities/enemy/bat/sound.js",
    constName: "BAT_BITE_PROFILES",
    defaults: { profiles: BAT_BITE_PROFILES },
    play: (overrides) => playBatBite(overrides?.profiles ?? overrides),
  },
  {
    id: "blob_attack_hit",
    defaultName: "Blob attack hit sound",
    defaultDescription: "Low thud followed by a dripping noise when a blob hits the player",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/entities/enemy/blob/sound.js",
    constName: "BLOB_ATTACK_HIT_PROFILES",
    defaults: { profiles: BLOB_ATTACK_HIT_PROFILES },
    play: (overrides) => playBlobAttackHit(overrides?.profiles ?? overrides),
  },
  {
    id: "dagger_swing",
    defaultName: "Dagger swing",
    defaultDescription: "Quick reversed noise stab for dagger attacks",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/weapons/daggers/sound.js",
    constName: "DAGGER_SWING_PROFILES",
    defaults: { profiles: DAGGER_SWING_PROFILES },
    play: (overrides) => playDaggerSwing(overrides?.profiles ?? overrides),
  },
  {
    id: "dagger_hit",
    defaultName: "Dagger hit",
    defaultDescription: "Short piercing impact when the dagger connects",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/weapons/daggers/sound.js",
    constName: "DAGGER_HIT_PROFILES",
    defaults: { profiles: DAGGER_HIT_PROFILES },
    play: (overrides) => playDaggerHit(overrides?.profiles ?? overrides),
  },
  {
    id: "slash_hit",
    defaultName: "Sword slash hit",
    defaultDescription: "Layered distorted bandpass impacts when the sword connects",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/weapons/swords/sound.js",
    constName: "SLASH_HIT_PROFILES",
    defaults: { profiles: SLASH_HIT_PROFILES },
    play: (overrides) => playSlashHit(overrides?.profiles ?? overrides),
  },
  {
    id: "slash_whiff",
    defaultName: "Sword swing",
    defaultDescription: "Short reversed noise sweep for a sword swing",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/weapons/swords/sound.js",
    constName: "SLASH_SWING_PROFILES",
    defaults: { profiles: SLASH_SWING_PROFILES },
    play: (overrides) => playSlashSwing(overrides?.profiles ?? overrides),
  },
  {
    id: "ice_crystal_cast",
    defaultName: "Ice crystal cast",
    defaultDescription: "Charging magic sound for the skeleton ice crystal cast",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/entities/projectiles/ice_crystal/sound.js",
    constName: "ICE_CRYSTAL_CAST_PROFILES",
    defaults: { profiles: ICE_CRYSTAL_CAST_PROFILES },
    play: (overrides) => playIceCrystalCast(overrides?.profiles ?? overrides),
  },
  {
    id: "ice_crystal_hit",
    defaultName: "Ice crystal hit",
    defaultDescription: "Quick descending magic zap when an ice crystal hits the player",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/entities/projectiles/ice_crystal/sound.js",
    constName: "ICE_CRYSTAL_HIT_PROFILES",
    defaults: { profiles: ICE_CRYSTAL_HIT_PROFILES },
    play: (overrides) => playIceCrystalHit(overrides?.profiles ?? overrides),
  },
  {
    id: "ice_crystal_hit_wall",
    defaultName: "Ice crystal hit wall",
    defaultDescription: "Quick descending magic zap when an ice crystal hits the wall",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/entities/projectiles/ice_crystal/sound.js",
    constName: "ICE_CRYSTAL_WALL_HIT_PROFILES",
    defaults: { profiles: ICE_CRYSTAL_WALL_HIT_PROFILES },
    play: (overrides) => playIceCrystalWallHit(overrides?.profiles ?? overrides),
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
  },
];

const ENTRIES_BY_ID = new Map(BUILT_IN_ENTRIES.map((e) => [e.id, e]));

export const listEntries = () => BUILT_IN_ENTRIES.slice();

export const getEntry = (id) => ENTRIES_BY_ID.get(id) ?? null;

// Ordered list of categories the renderer uses to build dropdown
// <optgroup>s. Custom + library categories appended by install.js once
// those features land in their own phase.
export const BUILT_IN_CATEGORIES = ["Game sounds", "UI"];
