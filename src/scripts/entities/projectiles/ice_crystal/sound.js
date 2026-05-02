import { playProfileSynth } from "@core/profile_synth";

const randomScale = amount => 1 + ((Math.random() * 2 - 1) * amount);
const jitterNumber = (value, amount, min = 0) => (
  Number.isFinite(value) ? Math.max(min, value * randomScale(amount)) : value
);

export const ICE_CRYSTAL_CAST_PROFILES = Object.freeze([
  Object.freeze({
    type: "pure_noise",
    noiseType: "pink",
    reverseBuffer: true,
    startOffset: 0,
    duration: 0.04,
    gain: 0.12,
    effects: Object.freeze([
      Object.freeze({
        type: "reverb",
        duration: 0.5,
        decay: 2.5,
        mix: 1,
        reverseBuffer: true,
      }),
      Object.freeze({
        type: "distortion",
        amount: 78,
        oversample: "2x",
      }),
      Object.freeze({
        type: "delay",
        delayTime: 0.08,
        feedback: 0.61,
        mix: 0.13,
      }),
    ]),
    muted: false,
  }),
  Object.freeze({
    type: "noise_filter",
    filterType: "bandpass",
    frequency: 10831,
    q: 9.9,
    reverseBuffer: true,
    startOffset: 0.05,
    duration: 0.08,
    gain: 0.85,
    effects: Object.freeze([
      Object.freeze({
        type: "reverb",
        duration: 0.45,
        decay: 1.9,
        mix: 1,
      }),
      Object.freeze({
        type: "delay",
        delayTime: 0.5,
        feedback: 0.52,
        mix: 0.73,
      }),
    ]),
    muted: false,
  }),
  Object.freeze({
    type: "pure_noise",
    startOffset: 0.25,
    duration: 0.04,
    gain: 0.34,
    noiseType: "brown",
    reverseBuffer: true,
    effects: Object.freeze([
      Object.freeze({
        type: "reverb",
        duration: 0.25,
        decay: 2.5,
        mix: 1,
      }),
      Object.freeze({
        type: "distortion",
        amount: 50,
        oversample: "4x",
      }),
    ]),
    muted: false,
  }),
  Object.freeze({
    type: "pure_noise",
    noiseType: "white",
    reverseBuffer: true,
    startOffset: 0.4,
    duration: 0.04,
    gain: 0.22,
    effects: Object.freeze([
      Object.freeze({
        type: "reverb",
        duration: 0.1,
        decay: 2.5,
        mix: 1,
      }),
      Object.freeze({
        type: "distortion",
        amount: 50,
        oversample: "4x",
      }),
    ]),
    muted: false,
  }),
  Object.freeze({
    type: "periodic_wave",
    frequency: 3276,
    harmonics: "bell",
    startOffset: 0.5,
    duration: 0.2,
    gain: 0.35,
    effects: Object.freeze([
      Object.freeze({
        type: "reverb",
        duration: 1,
        decay: 2.5,
        mix: 0.35,
      }),
    ]),
    muted: false,
  }),
]);

export const ICE_CRYSTAL_HIT_PROFILES = Object.freeze([
  Object.freeze({
    type: "noise_filter",
    filterType: "bandpass",
    frequency: 9778,
    q: 3.4,
    startOffset: 0,
    duration: 0.18,
    gain: 0.41,
    effects: Object.freeze([
      Object.freeze({
        type: "distortion",
        amount: 50,
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
    type: "oscillator",
    oscillatorType: "sine",
    frequency: 14026,
    startOffset: 0.1,
    duration: 0.22,
    gain: 0.48,
    effects: Object.freeze([
      Object.freeze({
        type: "delay",
        delayTime: 0.12,
        feedback: 0.35,
        mix: 0.4,
      }),
    ]),
  }),
  Object.freeze({
    type: "oscillator",
    startOffset: 0.2,
    duration: 0.04,
    gain: 0.45,
    oscillatorType: "sine",
    frequency: 5988,
    effects: Object.freeze([
      Object.freeze({
        type: "delay",
        delayTime: 0.12,
        feedback: 0.35,
        mix: 0.4,
      }),
    ]),
  }),
  Object.freeze({
    type: "noise_filter",
    filterType: "bandpass",
    frequency: 2400,
    q: 6,
    startOffset: 0.05,
    duration: 0.04,
    gain: 0.2,
    effects: Object.freeze([
      Object.freeze({
        type: "distortion",
        amount: 50,
        oversample: "4x",
      }),
    ]),
  }),
]);

export const ICE_CRYSTAL_WALL_HIT_PROFILES = Object.freeze([
  Object.freeze({
    type: "noise_filter",
    filterType: "bandpass",
    frequency: 17598,
    q: 3.4,
    startOffset: 0,
    duration: 0.18,
    gain: 0.8,
    effects: Object.freeze([
      Object.freeze({
        type: "distortion",
        amount: 50,
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
    type: "oscillator",
    oscillatorType: "sine",
    frequency: 16293,
    startOffset: 0.1,
    duration: 0.22,
    gain: 0.48,
    effects: Object.freeze([
      Object.freeze({
        type: "delay",
        delayTime: 0.12,
        feedback: 0.35,
        mix: 0.4,
      }),
    ]),
  }),
  Object.freeze({
    type: "oscillator",
    startOffset: 0.17,
    duration: 0.04,
    gain: 0.45,
    oscillatorType: "triangle",
    frequency: 5988,
    effects: Object.freeze([
      Object.freeze({
        type: "delay",
        delayTime: 0.12,
        feedback: 0.35,
        mix: 0.61,
      }),
    ]),
  }),
  Object.freeze({
    type: "noise_filter",
    filterType: "bandpass",
    frequency: 14605,
    q: 6,
    startOffset: 0.2,
    duration: 0.04,
    gain: 0.89,
    effects: Object.freeze([
      Object.freeze({
        type: "distortion",
        amount: 50,
        oversample: "4x",
      }),
    ]),
  }),
  Object.freeze({
    type: "oscillator",
    oscillatorType: "square",
    frequency: 12248,
    startOffset: 0.25,
    duration: 0.03,
    gain: 0.2,
    effects: Object.freeze([
      Object.freeze({
        type: "delay",
        delayTime: 0.12,
        feedback: 0.69,
        mix: 0.7,
      }),
    ]),
  }),
  Object.freeze({
    type: "periodic_wave",
    frequency: 10942,
    harmonics: "sawtooth8",
    startOffset: 0.03,
    duration: 0.04,
    gain: 0.2,
    effects: Object.freeze([]),
  }),
]);

const varyProfile = profile => ({
  ...profile,
  frequency: jitterNumber(profile.frequency, 0.08, 20),
  q: jitterNumber(profile.q, 0.12, 0.1),
  duration: jitterNumber(profile.duration, 0.08, 0.01),
  gain: jitterNumber(profile.gain, 0.1, 0),
  effects: profile.effects,
});

export const playIceCrystalCast = (profiles = ICE_CRYSTAL_CAST_PROFILES) => {
  return playProfileSynth(profiles.map(varyProfile));
};

export const playIceCrystalHit = (profiles = ICE_CRYSTAL_HIT_PROFILES) => {
  return playProfileSynth(profiles.map(varyProfile));
};

export const playIceCrystalWallHit = (profiles = ICE_CRYSTAL_WALL_HIT_PROFILES) => {
  return playProfileSynth(profiles.map(varyProfile));
};
