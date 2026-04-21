// Pure naming helpers used by the Dev Sound Sandbox knob renderer (live
// preview of derived `filename` / `functionName`) and `copy_format.js` (so
// the JSON payload always carries the same names the user just saw).
//
// The single normalization rule is intentionally simple: split the user's
// Name on any non-alphanumeric run, then re-join with the convention's
// separator. This is good enough for v1 — fancy unicode tokenization can
// come later if we ever need it.

// Tokenize "Coin Pickup!" -> ["coin", "pickup"]. Lowercases on the way out
// so the snake_case and camelCase emitters can stay tiny.
const tokenize = (name) => {
  if (!name) return [];
  const trimmed = String(name).trim();
  if (!trimmed) return [];
  return trimmed
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((tok) => tok.toLowerCase());
};

// "Coin Pickup" -> "coin_pickup" (no extension, no path). Empty / invalid
// names yield "" so the renderer can show "(invalid)" and disable Copy.
export const toSnakeCase = (name) => tokenize(name).join("_");

// "Coin Pickup" -> "coinPickup". First token stays lowercase; subsequent
// tokens get TitleCase.
export const toLowerCamelCase = (name) => {
  const tokens = tokenize(name);
  if (tokens.length === 0) return "";
  return tokens
    .map((tok, i) => (i === 0 ? tok : tok.charAt(0).toUpperCase() + tok.slice(1)))
    .join("");
};

// Stable localStorage key for a custom (user-spawned) sound. Same shape as
// `toSnakeCase` for now — kept as its own export so we can swap in a
// different scheme (e.g. random suffix to avoid collisions) without
// chasing call sites.
export const slugifyId = (name) => toSnakeCase(name);
