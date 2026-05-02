import { playProfileSynth } from "@core/profile_synth";

export const DAGGER_SWING_PROFILES = Object.freeze([
  Object.freeze({
    type: "noise_filter",
    filterType: "highpass",
    frequency: 6601,
    q: 6,
    reverseBuffer: true,
    muted: false,
    startOffset: 0,
    duration: 0.08,
    gain: 0.37,
    effects: Object.freeze([
      Object.freeze({
        type: "reverb",
        duration: 0.08,
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
    type: "noise_filter",
    filterType: "bandpass",
    frequency: 3823,
    q: 6,
    reverseBuffer: true,
    muted: false,
    startOffset: 0.02,
    duration: 0.6,
    gain: 0.31,
    effects: Object.freeze([
      Object.freeze({
        type: "reverb",
        duration: 0.08,
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
    type: "noise_filter",
    filterType: "lowpass",
    frequency: 2440,
    q: 6,
    reverseBuffer: true,
    muted: false,
    startOffset: 0.04,
    duration: 0.04,
    gain: 0.18,
    effects: Object.freeze([
      Object.freeze({
        type: "reverb",
        duration: 0.08,
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

export const DAGGER_HIT_PROFILES = Object.freeze([
  Object.freeze({
    type: "noise_filter",
    filterType: "highpass",
    frequency: 1611,
    q: 6,
    reverseBuffer: false,
    muted: false,
    startOffset: 0,
    duration: 0.06,
    gain: 0.15,
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
        threshold: -48,
        knee: 14,
        ratio: 9.5,
        attack: 0.741,
        release: 0.815,
      }),
    ]),
  }),
  Object.freeze({
    type: "noise_filter",
    startOffset: 0.02,
    duration: 0.08,
    gain: 0.045,
    filterType: "highpass",
    frequency: 3555,
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
    startOffset: 0.03,
    duration: 0.09,
    gain: 0.045,
    filterType: "bandpass",
    frequency: 1378,
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
        attack: 0.544,
        release: 0.357,
      }),
    ]),
  }),
  Object.freeze({
    type: "noise_filter",
    startOffset: 0.06,
    duration: 0.06,
    gain: 0.045,
    filterType: "bandpass",
    frequency: 5707,
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
        threshold: -62,
        knee: 9,
        ratio: 8,
        attack: 0.536,
        release: 0.366,
      }),
    ]),
  }),
]);

export const playDaggerSwing = (profiles = DAGGER_SWING_PROFILES) => {
  playProfileSynth(profiles);
};

export const playDaggerHit = (profiles = DAGGER_HIT_PROFILES) => {
  playProfileSynth(profiles);
};
