// Developer-mode feature flags.
//
// Flags are ONLY honored in non-production builds. Webpack's DefinePlugin
// substitutes `process.env.NODE_ENV` at build time, so the hydration + setter
// bodies below are dead-code-eliminated from the production bundle and the
// setters become no-ops. Call sites read `DEV_FLAGS.x` which is `false` or
// `undefined` in prod — both harmless falsy values that fall through to the
// game_config defaults.
//
// Three categories:
//
//   Booleans  — dev-only cheats and visualizations. Defaults are inherent
//               (`false`); they are not player-facing so they deliberately
//               live ONLY here, not in `game_config.js`.
//
//   Numerics  — overrides for values that already exist in `game_config.js`.
//               The config itself owns the canonical default; we just let the
//               developer poke at the live value. `undefined` means "use the
//               config default" (call sites use `DEV_FLAGS.foo ?? cfg.foo`).
//
//   Strings   — small enumerated picks (e.g. force a specific win-screen
//               scene). Empty string = "use the default behavior" (random,
//               whatever, etc); call sites read `DEV_FLAGS.foo || fallback`.
//
// UI is wired up in `src/scripts/utils/dev_options_drawer.js` and the
// `#dev-options-page` panel in `index.html`.

import * as GAME_CONFIG from "./game_config";
import GOBLIN_CONFIG from "@entities/enemy/goblin/config";
import SKELETON_CONFIG from "@entities/enemy/skeleton/config";
import ICE_CRYSTAL_CONFIG from "@entities/projectiles/ice_crystal/config";

const isProd = process.env.NODE_ENV === "production";
const STORAGE_KEY = "devFlags";

const BOOLEAN_KEYS = Object.freeze([
  "showCollisionBoxes",
  "showEnemyDetectRadius",
  "showEnemyHp",
  "forceLadder",
]);

const NUMERIC_KEYS = Object.freeze([
  "enemyHp",
  "enemyBatSpawnCount",
  "enemyBlobSpawnCount",
  "enemyGoblinSpawnCount",
  "enemySkeletonSpawnCount",
  "enemyItemDropRate",
  "enemyForcedDropCount",
  "enemyGoblinStealChance",
  "playerSpeedMultiplier",
  "playerSprintMultiplier",
  "playerStaminaDrain",
  "playerStaminaRegenIdle",
  "playerStaminaRegenMoving",
  "difficultyMaxEnemies",
  "difficultyPointsPerEnemy",
  "difficultyRoomCountPoints",
  "difficultyRoomDifficultyPoints",
  "skeletonCastCooldownFrames",
  "skeletonCastDistance",
  "skeletonCastDissipateFrames",
  "skeletonCastInterruptedDelayFrames",
  "skeletonCastWindupFrames",
  "iceCrystalDamageMax",
  "iceCrystalDamageMin",
  "iceCrystalMaxDistance",
  "iceCrystalSpeed",
  "iceCrystalColdDurationFrames",
  "iceCrystalColdSpeedMultiplier",
  "winCoinCount",
  "hpPotionHealAmount",
  "ladderChance",
]);

const STRING_KEYS = Object.freeze([
  "winScene",
  // Pins every newly-generated room to a specific exit configuration --
  // a sorted, deduped string of `D L R U` letters (e.g. "DLR", "U", "DLRU").
  // Empty string means "use the procedural picker." Bypasses the entry-
  // direction guarantee and the valid-neighbor checks, so it CAN produce
  // disconnected rooms or doors that lead into walls -- intentional, since
  // this is purely a dev visualization aid and never ships to production.
  "forceNextMapConfig",
]);

export const DEV_FLAG_KEYS = Object.freeze([
  ...BOOLEAN_KEYS,
  ...NUMERIC_KEYS,
  ...STRING_KEYS,
]);

// Canonical defaults for numeric overrides, pulled from `game_config.js` so
// the drawer's placeholder always reflects what the game will actually fall
// back to when the field is left blank. If a config shape changes, update
// here only — the rest of the flag plumbing is key-agnostic.
// `enemyForcedDropCount` is intentionally absent here: blank doesn't mean
// "0", it means "fall back to chance-gated rolls", which has no single numeric
// representation. Leaving it out of CONFIG_DEFAULTS just means the drawer
// won't auto-fill a placeholder for that field.
export const CONFIG_DEFAULTS = Object.freeze({
  enemyHp: GAME_CONFIG.entities.enemy.hp,
  enemyGoblinStealChance: GOBLIN_CONFIG.steal.chance,
  // `enemyItemDropRate` is an OVERRIDE that replaces every drop entry's
  // chance, regardless of which type of enemy or item it came from. Drops
  // now live per-enemy with varying chances (see each enemy's config), so
  // there's no single canonical "default" — the placeholder is just a
  // representative value picked from the most common drop chance to give
  // the drawer a sensible hint.
  enemyItemDropRate: 0.1,
  playerSpeedMultiplier: GAME_CONFIG.entities.player.speedMultiplier,
  playerSprintMultiplier: GAME_CONFIG.entities.player.sprintMultiplier,
  playerStaminaDrain: GAME_CONFIG.entities.player.staminaDrain,
  playerStaminaRegenIdle: GAME_CONFIG.entities.player.staminaRegenIdle,
  playerStaminaRegenMoving: GAME_CONFIG.entities.player.staminaRegenMoving,
  difficultyMaxEnemies: 8,
  difficultyPointsPerEnemy: 5,
  difficultyRoomCountPoints: 1,
  difficultyRoomDifficultyPoints: 1,
  skeletonCastCooldownFrames: SKELETON_CONFIG.magic.castCooldownFrames,
  skeletonCastDistance: SKELETON_CONFIG.magic.castDistance,
  skeletonCastDissipateFrames: SKELETON_CONFIG.magic.castDissipateFrames,
  skeletonCastInterruptedDelayFrames: SKELETON_CONFIG.magic.castInterruptedDelayFrames,
  skeletonCastWindupFrames: SKELETON_CONFIG.magic.castWindupFrames,
  iceCrystalDamageMax: ICE_CRYSTAL_CONFIG.damageMax,
  iceCrystalDamageMin: ICE_CRYSTAL_CONFIG.damageMin,
  iceCrystalMaxDistance: ICE_CRYSTAL_CONFIG.maxDistance,
  iceCrystalSpeed: ICE_CRYSTAL_CONFIG.speed,
  iceCrystalColdDurationFrames: ICE_CRYSTAL_CONFIG.coldDurationFrames,
  iceCrystalColdSpeedMultiplier: ICE_CRYSTAL_CONFIG.coldSpeedMultiplier,
  winCoinCount: GAME_CONFIG.game.winCoinCount,
  hpPotionHealAmount: GAME_CONFIG.entities.hpPotion.healAmount,
  ladderChance: GAME_CONFIG.entities.ladder.chance,
});

export const isBooleanFlag = (key) => BOOLEAN_KEYS.includes(key);
export const isNumericFlag = (key) => NUMERIC_KEYS.includes(key);
export const isStringFlag = (key) => STRING_KEYS.includes(key);
export const configValue = ({ value, override }) => override ?? value;

const DEV_FLAGS = {};
for (const k of BOOLEAN_KEYS) DEV_FLAGS[k] = false;
for (const k of NUMERIC_KEYS) DEV_FLAGS[k] = undefined;
for (const k of STRING_KEYS) DEV_FLAGS[k] = "";

if (!isProd && typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      for (const k of BOOLEAN_KEYS) {
        if (typeof saved[k] === "boolean") DEV_FLAGS[k] = saved[k];
      }
      for (const k of NUMERIC_KEYS) {
        if (typeof saved[k] === "number" && Number.isFinite(saved[k])) {
          DEV_FLAGS[k] = saved[k];
        }
      }
      for (const k of STRING_KEYS) {
        if (typeof saved[k] === "string") DEV_FLAGS[k] = saved[k];
      }
    }
  } catch { /* corrupted or unavailable — fall back to defaults */ }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEV_FLAGS));
  } catch { /* storage may be unavailable (private browsing, quota, etc.) */ }
}

export function setDevFlag(key, value) {
  if (isProd) return;
  if (!DEV_FLAG_KEYS.includes(key)) return;
  DEV_FLAGS[key] = value;
  persist();
}

export function resetDevFlags() {
  if (isProd) return;
  for (const k of BOOLEAN_KEYS) DEV_FLAGS[k] = false;
  for (const k of NUMERIC_KEYS) DEV_FLAGS[k] = undefined;
  for (const k of STRING_KEYS) DEV_FLAGS[k] = "";
  persist();
}

export default DEV_FLAGS;
