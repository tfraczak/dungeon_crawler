import { playProfileSynth } from "@core/profile_synth";

// Enemy poof -- lowpass noise layers for the kill confirmation feel.
// Played when an enemy dies / is dispelled.
export const POOF_PROFILES = Object.freeze([
  Object.freeze({
    type: "noise_filter",
    filterType: "lowpass",
    frequency: 135,
    q: 6,
    startOffset: 0,
    duration: 0.5,
    gain: 0.18,
    effects: Object.freeze([
      Object.freeze({
        type: "distortion",
        amount: 127,
        oversample: "4x",
      }),
      Object.freeze({
        type: "reverb",
        duration: 1.5,
        decay: 2.5,
        mix: 0.35,
      }),
    ]),
  }),
  Object.freeze({
    type: "noise_filter",
    startOffset: 0.02,
    duration: 0.04,
    gain: 0.2,
    filterType: "lowpass",
    frequency: 397,
    q: 6,
    effects: Object.freeze([
      Object.freeze({
        type: "reverb",
        duration: 0.8,
        decay: 2.5,
        mix: 0.35,
      }),
      Object.freeze({
        type: "distortion",
        amount: 50,
        oversample: "4x",
      }),
    ]),
  }),
]);

const playPoofSound = (profiles = POOF_PROFILES) => {
  playProfileSynth(profiles);
};

export default playPoofSound;
