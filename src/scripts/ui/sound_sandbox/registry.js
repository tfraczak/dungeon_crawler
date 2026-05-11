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
  METAL_SHIELD_BLOCK_PROFILES,
  playMetalShieldBlock,
  playShieldBlock,
  WOODEN_SHIELD_BLOCK_PROFILES,
} from "@items/equipment/shields/sound";
import {
  AXE_HIT_PROFILES,
  playAxeHit,
} from "@items/equipment/weapons/axes/sound";
import {
  FIST_HIT_PROFILES,
  playFistHit,
} from "@items/equipment/weapons/fists/sound";
import {
  GREATAXE_HIT_PROFILES,
  playGreataxeHit,
} from "@items/equipment/weapons/greataxes/sound";
import {
  GREATSWORD_HIT_PROFILES,
  playGreatswordHit,
} from "@items/equipment/weapons/greatswords/sound";
import {
  HAMMER_HIT_PROFILES,
  playHammerHit,
} from "@items/equipment/weapons/hammers/sound";
import {
  GREATHAMMER_HIT_PROFILES,
  playGreathammerHit,
} from "@items/equipment/weapons/greathammers/sound";
import {
  MACE_HIT_PROFILES,
  playMaceHit,
} from "@items/equipment/weapons/maces/sound";
import {
  POLEARM_HIT_PROFILES,
  playPolearmHit,
} from "@items/equipment/weapons/polearms/sound";
import {
  STAFF_HIT_PROFILES,
  playStaffHit,
} from "@items/equipment/weapons/staves/sound";
import {
  WAND_HIT_PROFILES,
  playWandHit,
} from "@items/equipment/weapons/wands/sound";
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
    id: "metal_shield_block",
    defaultName: "Shield bounce big reverb ping",
    defaultDescription: "A weapon bouncing off a shield with a sharper ding, louder metallic ping, stronger upper overtones, and more reverb-like ringing delay.",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/shields/sound.js",
    constName: "METAL_SHIELD_BLOCK_PROFILES",
    defaults: { profiles: METAL_SHIELD_BLOCK_PROFILES },
    play: (overrides) => playMetalShieldBlock(overrides?.profiles ?? overrides),
  },
  {
    id: "wooden_shield_block",
    defaultName: "Wooden shield block splintering impact",
    defaultDescription: "A wooden shield block with a blunt board thud, strong hollow wood clock, added splintering cracks, dry grain tearing, and a rough wooden decay.",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/shields/sound.js",
    constName: "WOODEN_SHIELD_BLOCK_PROFILES",
    defaults: { profiles: WOODEN_SHIELD_BLOCK_PROFILES },
    play: (overrides) => playShieldBlock(overrides?.profiles ?? overrides),
  },
  {
    id: "axe_hit",
    defaultName: "Deep wet axe impact ripping splintering",
    defaultDescription: "A heavy axe impact that keeps the deep thud but emphasizes ripping splintering: layered wood/bone cracks, rough fiber tearing, wet gouging drag, and a thick gore tail.",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/weapons/axes/sound.js",
    constName: "AXE_HIT_PROFILES",
    defaults: { profiles: AXE_HIT_PROFILES },
    play: (overrides) => playAxeHit(overrides?.profiles ?? overrides),
  },
  {
    id: "fist_hit",
    defaultName: "Bare fist heavy body crash brown thud punch",
    defaultDescription: "A bare-fist punch with a heavier body thud, low brown-noise support, dense torso compression, skin slap, and a short crashing impact layer on top.",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/weapons/fists/sound.js",
    constName: "FIST_HIT_PROFILES",
    defaults: { profiles: FIST_HIT_PROFILES },
    play: (overrides) => playFistHit(overrides?.profiles ?? overrides),
  },
  {
    id: "greataxe_hit",
    defaultName: "Devastating greataxe splinter impact",
    defaultDescription: "A heavier two-handed greataxe impact with a deep body thud, lower-frequency ripping wood/bone splinters, wet gore drag, and a slightly longer devastating decay.",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/weapons/greataxes/sound.js",
    constName: "GREATAXE_HIT_PROFILES",
    defaults: { profiles: GREATAXE_HIT_PROFILES },
    play: (overrides) => playGreataxeHit(overrides?.profiles ?? overrides),
  },
  {
    id: "greatsword_hit",
    defaultName: "Devastating greatsword flesh rip higher",
    defaultDescription: "A heavier two-handed greatsword flesh-ripping hit with a slightly higher-frequency blade edge, deep impact weight, broad wet ripping pulls, and a devastating gore tail.",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/weapons/greatswords/sound.js",
    constName: "GREATSWORD_HIT_PROFILES",
    defaults: { profiles: GREATSWORD_HIT_PROFILES },
    play: (overrides) => playGreatswordHit(overrides?.profiles ?? overrides),
  },
  {
    id: "hammer_hit",
    defaultName: "Devastating metal hammer crash impact",
    defaultDescription: "A more devastating one-handed metal hammer impact with deep crushing force, metallic ping, low splintering collapse, and a wider crashing debris layer.",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/weapons/hammers/sound.js",
    constName: "HAMMER_HIT_PROFILES",
    defaults: { profiles: HAMMER_HIT_PROFILES },
    play: (overrides) => playHammerHit(overrides?.profiles ?? overrides),
  },
  {
    id: "greathammer_hit",
    defaultName: "Cataclysmic greathammer hard thud impact high splinters",
    defaultDescription: "A devastating two-handed greathammer impact with a hard blunt thud, crushing collapse, low splintering, and added higher-frequency splinter shards for sharper destruction.",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/weapons/greathammers/sound.js",
    constName: "GREATHAMMER_HIT_PROFILES",
    defaults: { profiles: GREATHAMMER_HIT_PROFILES },
    play: (overrides) => playGreathammerHit(overrides?.profiles ?? overrides),
  },
  {
    id: "mace_hit",
    defaultName: "Mace thud splinter crash high splinters",
    defaultDescription: "A one-handed mace impact with a blunt thud, compact crushing body, chunky splintering breaks, short crash layer, and added higher-pitched splinter shards.",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/weapons/maces/sound.js",
    constName: "MACE_HIT_PROFILES",
    defaults: { profiles: MACE_HIT_PROFILES },
    play: (overrides) => playMaceHit(overrides?.profiles ?? overrides),
  },
  {
    id: "polearm_hit",
    defaultName: "Spear varied high Q gouging rip stab",
    defaultDescription: "A higher-pitched spear hit with more varied high-Q gouging, sharper resonant ripping fibers, focused shaft scrape, and a less uniform layered texture.",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/weapons/polearms/sound.js",
    constName: "POLEARM_HIT_PROFILES",
    defaults: { profiles: POLEARM_HIT_PROFILES },
    play: (overrides) => playPolearmHit(overrides?.profiles ?? overrides),
  },
  {
    id: "staff_hit",
    defaultName: "Wooden staff pronounced wood clock hit",
    defaultDescription: "A wooden staff impact with a stronger wooden identity: clear hollow clocking, dry grain knocks, resonant pole body, and a supportive blunt thud.",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/weapons/staves/sound.js",
    constName: "STAFF_HIT_PROFILES",
    defaults: { profiles: STAFF_HIT_PROFILES },
    play: (overrides) => playStaffHit(overrides?.profiles ?? overrides),
  },
  {
    id: "wand_hit",
    defaultName: "Wand wet ham leather smack wood clock hit",
    defaultDescription: "A light wand hit tuned toward a wet ham slapping a leather couch, with subtle thud, wet slap, leathery cushion bloom, sticky rebound, and added dry wood clocking from the wand shaft.",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/weapons/wands/sound.js",
    constName: "WAND_HIT_PROFILES",
    defaults: { profiles: WAND_HIT_PROFILES },
    play: (overrides) => playWandHit(overrides?.profiles ?? overrides),
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
    defaultName: "Wet gouging high flesh rip slice 200ms",
    defaultDescription: "A loud 200ms wet gouging flesh hit with slightly higher pitch, stronger scooping drag, broad wet pulls, and a slick bright finish.",
    category: "Game sounds",
    kind: "profile_synth",
    sourceFile: "src/scripts/items/equipment/weapons/daggers/sound.js",
    constName: "DAGGER_HIT_PROFILES",
    defaults: { profiles: DAGGER_HIT_PROFILES },
    play: (overrides) => playDaggerHit(overrides?.profiles ?? overrides),
  },
  {
    id: "slash_hit",
    defaultName: "Short wet loud very high flesh rip slice 300ms",
    defaultDescription: "A loud, very high-pitched wet flesh-ripping sword slice with sharp tearing friction, bright fibrous pulls, and an overall duration of about 0.3 seconds.",
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
