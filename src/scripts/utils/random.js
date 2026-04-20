// Centralized random helpers. All gameplay-side random rolls should go through
// these primitives so the random source can later be swapped for a seeded RNG
// (for replay/testing) in one place. Per-sample audio noise loops and particle
// jitter intentionally still call Math.random directly to avoid call overhead
// in tight loops.
//
// Imported as a namespace so call sites read self-documentingly:
//   import Random from "../utils/random";
//   Random.weightedPick(weights);

const Random = {
  // Integer in [min, max], inclusive on both ends.
  int: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

  // Float in [min, max).
  range: (min, max) => Math.random() * (max - min) + min,

  // True with probability p (in [0, 1]).
  chance: (p) => Math.random() < p,

  // Uniform pick from an array.
  pick: (arr) => arr[Math.floor(Math.random() * arr.length)],

  // Picks a key from a `{ value: weight }` map with probability proportional
  // to each weight. Returns the key as-is (a string, per Object.entries
  // semantics); callers that need a number should wrap with Number(...).
  weightedPick: (weights) => {
    let total = 0;
    for (const w of Object.values(weights)) total += w;
    let r = Math.random() * total;
    let lastKey;
    for (const [value, w] of Object.entries(weights)) {
      lastKey = value;
      r -= w;
      if (r < 0) return value;
    }
    return lastKey;
  },
};

export default Random;
