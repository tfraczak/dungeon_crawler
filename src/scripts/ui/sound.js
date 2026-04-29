// UI click — Mechanical button click used by restart and how-to buttons.
//
// Built atop the generic Sound Profile runtime so the Dev Sound Sandbox drawer
// can tune it using the same plumbing as every other profile_synth entry.

import { playProfileSynth } from "@core/profile_synth";

// Mechanical three-layer button click: bright distorted transient, lower sine
// body, and a short high-frequency tail.
export const DEFAULT_CLICK_PROFILES = Object.freeze([
  Object.freeze({
    type: "oscillator",
    oscillatorType: "sine",
    frequency: 2443,
    startOffset: 0,
    duration: 0.02,
    gain: 0.27,
    effects: Object.freeze([
      Object.freeze({
        type: "distortion",
        amount: 8,
        oversample: "4x",
      }),
      Object.freeze({
        type: "filter",
        filterType: "lowpass",
        frequency: 3099,
        q: 3.4,
        gain: 0,
      }),
    ]),
  }),
  Object.freeze({
    type: "oscillator",
    startOffset: 0.01,
    duration: 0.05,
    gain: 0.16,
    oscillatorType: "sine",
    frequency: 828,
    effects: Object.freeze([]),
  }),
  Object.freeze({
    type: "oscillator",
    startOffset: 0.05,
    duration: 0.04,
    gain: 0.11,
    oscillatorType: "sine",
    frequency: 2420,
    effects: Object.freeze([]),
  }),
]);

// Thin wrapper. Sandbox passes a tuned profile array; everywhere else
// passes nothing and gets the defaults.
export const playClick = (profiles = DEFAULT_CLICK_PROFILES) => playProfileSynth(profiles);
