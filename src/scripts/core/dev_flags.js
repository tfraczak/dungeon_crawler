// Developer-mode feature flags.
//
// Flags are ONLY honored in non-production builds. Webpack's DefinePlugin
// substitutes `process.env.NODE_ENV` at build time, so the hydration + setter
// bodies below are dead-code-eliminated from the production bundle and the
// setters become no-ops. Call sites read `DEV_FLAGS.x` which is `false` or
// `undefined` in prod — both harmless falsy values that fall through to the
// game_config defaults.
//
// Two categories:
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
// UI is wired up in `src/scripts/utils/dev_options_drawer.js` and the
// `#dev-options-page` panel in `index.html`.

import GAME_CONFIG from "./game_config";

const isProd = process.env.NODE_ENV === "production";
const STORAGE_KEY = "devFlags";

const BOOLEAN_KEYS = Object.freeze([
  "showCollisionBoxes",
  "showEnemyDetectRadius",
  "godMode",
  "infiniteStamina",
  "oneShot",
]);

const NUMERIC_KEYS = Object.freeze([
  "enemyHp",
  "enemyItemDropRate",
]);

export const DEV_FLAG_KEYS = Object.freeze([...BOOLEAN_KEYS, ...NUMERIC_KEYS]);

// Canonical defaults for numeric overrides, pulled from `game_config.js` so
// the drawer's placeholder always reflects what the game will actually fall
// back to when the field is left blank. If a config shape changes, update
// here only — the rest of the flag plumbing is key-agnostic.
export const CONFIG_DEFAULTS = Object.freeze({
  enemyHp:           GAME_CONFIG.enemy.hp,
  enemyItemDropRate: GAME_CONFIG.enemy.drops[0]?.chance ?? 0,
});

export const isBooleanFlag = (key) => BOOLEAN_KEYS.includes(key);
export const isNumericFlag = (key) => NUMERIC_KEYS.includes(key);

const DEV_FLAGS = {};
for (const k of BOOLEAN_KEYS) DEV_FLAGS[k] = false;
for (const k of NUMERIC_KEYS) DEV_FLAGS[k] = undefined;

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
  persist();
}

export default DEV_FLAGS;
