import { playProfileSynth } from "@core/profile_synth";

// Slash swing -- short reversed noise sweep matching the 8-frame sword animation.
export const SLASH_SWING_PROFILES = Object.freeze([
  Object.freeze({
    type: "pure_noise",
    noiseType: "brown",
    reverseBuffer: true,
    muted: false,
    startOffset: 0,
    duration: 0.13,
    gain: 0.71,
    effects: Object.freeze([
      Object.freeze({
        type: "reverb",
        duration: 0.13,
        decay: 4.7,
        mix: 1,
      }),
      Object.freeze({
        type: "distortion",
        amount: 183,
        oversample: "4x",
      }),
    ]),
  }),
  Object.freeze({
    type: "pure_noise",
    noiseType: "pink",
    reverseBuffer: true,
    muted: false,
    startOffset: 0.03,
    duration: 0.1,
    gain: 0.59,
    effects: Object.freeze([
      Object.freeze({
        type: "reverb",
        duration: 0.1,
        decay: 4.7,
        mix: 1,
      }),
      Object.freeze({
        type: "distortion",
        amount: 313,
        oversample: "4x",
      }),
    ]),
  }),
  Object.freeze({
    type: "pure_noise",
    noiseType: "white",
    reverseBuffer: true,
    muted: false,
    startOffset: 0.07,
    duration: 0.06,
    gain: 0.59,
    effects: Object.freeze([
      Object.freeze({
        type: "reverb",
        duration: 0.1,
        decay: 4.7,
        mix: 1,
      }),
      Object.freeze({
        type: "distortion",
        amount: 313,
        oversample: "4x",
      }),
    ]),
  }),
]);

// Slash hit -- layered distorted bandpass impacts for sword contact.
export const SLASH_HIT_PROFILES = Object.freeze([
  Object.freeze({
    type: "noise_filter",
    filterType: "bandpass",
    frequency: 716,
    q: 6,
    reverseBuffer: false,
    muted: false,
    startOffset: 0,
    duration: 0.1,
    gain: 0.16,
    effects: Object.freeze([
      Object.freeze({
        type: "distortion",
        amount: 312,
        oversample: "4x",
      }),
      Object.freeze({
        type: "distortion",
        amount: 135,
        oversample: "2x",
      }),
      Object.freeze({
        type: "compressor",
        threshold: -61,
        knee: 9,
        ratio: 7.5,
        attack: 0.769,
        release: 0.815,
      }),
    ]),
  }),
  Object.freeze({
    type: "noise_filter",
    startOffset: 0.03,
    duration: 0.12,
    gain: 0.048,
    filterType: "bandpass",
    frequency: 2400,
    q: 6,
    reverseBuffer: false,
    effects: Object.freeze([
      Object.freeze({
        type: "distortion",
        amount: 128,
        oversample: "4x",
      }),
      Object.freeze({
        type: "distortion",
        amount: 34,
        oversample: "2x",
      }),
      Object.freeze({
        type: "compressor",
        threshold: -66,
        knee: 9,
        ratio: 8,
        attack: 0.514,
        release: 0.357,
      }),
    ]),
  }),
  Object.freeze({
    type: "noise_filter",
    startOffset: 0.06,
    duration: 0.12,
    gain: 0.048,
    filterType: "bandpass",
    frequency: 352,
    q: 6,
    reverseBuffer: false,
    effects: Object.freeze([
      Object.freeze({
        type: "distortion",
        amount: 321,
        oversample: "4x",
      }),
      Object.freeze({
        type: "distortion",
        amount: 166,
        oversample: "2x",
      }),
      Object.freeze({
        type: "compressor",
        threshold: -66,
        knee: 9,
        ratio: 8,
        attack: 0.514,
        release: 0.357,
      }),
    ]),
  }),
  Object.freeze({
    type: "noise_filter",
    startOffset: 0.09,
    duration: 0.07,
    gain: 0.048,
    filterType: "bandpass",
    frequency: 4955,
    q: 6,
    reverseBuffer: false,
    effects: Object.freeze([
      Object.freeze({
        type: "distortion",
        amount: 73,
        oversample: "4x",
      }),
      Object.freeze({
        type: "distortion",
        amount: 28,
        oversample: "2x",
      }),
      Object.freeze({
        type: "compressor",
        threshold: -50,
        knee: 9,
        ratio: 8,
        attack: 0.514,
        release: 0.357,
      }),
    ]),
  }),
]);

export function playSlashSwing(profiles = SLASH_SWING_PROFILES) {
  playProfileSynth(profiles);
}

export function playSlashWhiff(profiles = SLASH_SWING_PROFILES) {
  playSlashSwing(profiles);
}

export function playSlashHit(profiles = SLASH_HIT_PROFILES) {
  playProfileSynth(profiles);
}
