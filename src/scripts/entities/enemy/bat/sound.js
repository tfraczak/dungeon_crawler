import { playProfileSynth } from "@core/profile_synth";

const randomScale = amount => 1 + ((Math.random() * 2 - 1) * amount);
const jitterNumber = (value, amount, min = 0) => (
  Number.isFinite(value) ? Math.max(min, value * randomScale(amount)) : value
);
const jitterOffset = value => (
  Number.isFinite(value) ? Math.max(0, value + ((Math.random() - 0.5) * 0.018)) : value
);

export const BAT_BITE_PROFILES = Object.freeze([
  Object.freeze({
    type: "noise_filter",
    filterType: "highpass",
    frequency: 1611,
    q: 6,
    reverseBuffer: false,
    muted: false,
    startOffset: 0,
    duration: 0.06,
    gain: 0.34,
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
    gain: 0.1,
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
    gain: 0.1,
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
    gain: 0.1,
    filterType: "lowpass",
    frequency: 5707,
    q: 6,
    reverseBuffer: true,
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
  Object.freeze({
    type: "noise_filter",
    startOffset: 0.1,
    duration: 0.06,
    gain: 0.1,
    filterType: "bandpass",
    frequency: 2660,
    q: 6,
    reverseBuffer: true,
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

const varyProfile = profile => ({
  ...profile,
  frequency: jitterNumber(profile.frequency, 0.1, 20),
  q: jitterNumber(profile.q, 0.18, 0.1),
  startOffset: jitterOffset(profile.startOffset),
  duration: jitterNumber(profile.duration, 0.12, 0.01),
  gain: jitterNumber(profile.gain, 0.18, 0),
  effects: profile.effects,
});

export const playBatBite = (profiles = BAT_BITE_PROFILES) => (
  playProfileSynth(profiles.map(varyProfile))
);
