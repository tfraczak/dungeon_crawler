// Per-configuration map background variant counts.
//
// Each key is `${numExits}${sortedDirs}` (e.g. "1U", "2DL", "3DRU", "4DLRU"),
// matching the naming the loader (`src/index.js`) and room generator
// (`src/scripts/world/room/room.js`) use to look up `gameState.bgImgs`. The
// value is the number of map background variants that exist on disk for that
// configuration -- i.e. the folder
// `src/assets/world/room/backgrounds/<numExits>/<dirs>/` must contain
// `0.png .. <count - 1>.png`.
//
// To add a new variant for a configuration, drop the new file in as the
// next index (`<count>.png`) and bump the count here. Configs not listed
// fall back to DEFAULT_VARIANT_COUNT, which matches the historical baseline
// of three variants per folder.

import DEV_FLAGS from "@core/dev_flags";
import Random from "@utils/random";

const DEFAULT_VARIANT_COUNT = 3;

const MAP_VARIANT_COUNTS = Object.freeze({
  // Override entries go here when a config has more (or fewer) than the
  // historical baseline of three variants on disk. Example:
  //   "1U":   4,   // adds map3.png to the rotation
  //   "4DLRU": 2,  // only map0/map1 exist on disk
  // Any config not listed falls back to DEFAULT_VARIANT_COUNT below.
});

export const getVariantCount = (numPaths, paths) => {
  return MAP_VARIANT_COUNTS[`${numPaths}${paths}`] ?? DEFAULT_VARIANT_COUNT;
};

// Returns a uniformly random variant index in [0, count) for the given
// exit configuration.
export const pickVariantIndex = (numPaths, paths) => {
  const count = getVariantCount(numPaths, paths);
  return Random.int(0, count - 1);
};

// Normalizes a raw forced-config string from the dev drawer into the
// canonical sorted/deduped form that the room generator + bgImgs lookup
// expect (e.g. "dul" -> "DLU", "DRRU" -> "DRU", "" -> null).
//
// - Case-insensitive: any mix of upper/lower case input is accepted.
// - Non-`DLRU` characters are silently stripped.
// - Returns null for empty / whitespace / no-valid-letters input, which the
//   room generator treats as "no force, use the procedural picker."
export const normalizeForcedConfig = (raw) => {
  if (typeof raw !== "string") return null;
  const seen = new Set();
  for (const ch of raw.toUpperCase()) {
    if (ch === "D" || ch === "L" || ch === "R" || ch === "U") {
      seen.add(ch);
    }
  }
  if (seen.size === 0) return null;
  return ["D", "L", "R", "U"].filter(d => seen.has(d)).join("");
};

// Returns the currently-forced exit configuration from `DEV_FLAGS`, or null
// if no force is active. The room generator calls this BEFORE building the
// procedural exit set; a non-null result short-circuits the procedural pick.
export const getForcedConfig = () => normalizeForcedConfig(DEV_FLAGS.forceNextMapConfig);

// Swaps the room's painted background to a different variant of the same
// exit configuration. `delta` is added to the current variant index modulo
// the variant count, so positive cycles forward and negative cycles back.
// No-op (returns null) if the room wasn't stamped with `bgConfig` (e.g. a
// pre-existing save state from before this code shipped) or if the target
// variant image isn't loaded into `bgImgs` for some reason.
//
// On success returns the new `{ numPaths, paths, variantIdx }` so callers
// can refresh any UI that displays the current variant.
export const cycleRoomBackground = (room, bgImgs, delta = 1) => {
  if (!room || !room.bgConfig) return null;
  const { numPaths, paths } = room.bgConfig;
  const count = getVariantCount(numPaths, paths);
  if (count <= 0) return null;
  const next = ((room.bgConfig.variantIdx + delta) % count + count) % count;
  const img = bgImgs[`${numPaths}${paths}${next}`];
  if (!img) return null;
  room.background = img;
  room.bgConfig.variantIdx = next;
  return { numPaths, paths, variantIdx: next };
};

export default MAP_VARIANT_COUNTS;
