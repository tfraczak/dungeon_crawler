import { playProfileSynth } from "@core/profile_synth";

const randomScale = amount => 1 + ((Math.random() * 2 - 1) * amount);
const jitterNumber = (value, amount, min = 0) => (
  Number.isFinite(value) ? Math.max(min, value * randomScale(amount)) : value
);
const jitterOffset = value => (
  Number.isFinite(value) ? Math.max(0, value + ((Math.random() - 0.5) * 0.08)) : value
);

export const POISON_STATUS_EFFECT_PROFILES = Object.freeze([
  Object.freeze({
    type: "oscillator",
    oscillatorType: "sine",
    frequency: 343,
    reverseBuffer: false,
    muted: false,
    startOffset: 0,
    duration: 0.5,
    gain: 0.47,
    effects: Object.freeze([
      Object.freeze({ type: "delay", delayTime: 0.1, feedback: 0, mix: 0.4 }),
      Object.freeze({ type: "delay", delayTime: 0.35, feedback: 0, mix: 0.52 }),
      Object.freeze({ type: "delay", delayTime: 0.62, feedback: 0, mix: 0.88 }),
      Object.freeze({ type: "delay", delayTime: 0.83, feedback: 0, mix: 0.4 }),
    ]),
  }),
  Object.freeze({
    type: "oscillator",
    oscillatorType: "sine",
    frequency: 208,
    reverseBuffer: false,
    muted: false,
    startOffset: 0.5,
    duration: 0.5,
    gain: 0.38,
    effects: Object.freeze([
      Object.freeze({ type: "delay", delayTime: 0.1, feedback: 0, mix: 0.97 }),
      Object.freeze({ type: "delay", delayTime: 0.35, feedback: 0, mix: 0.22 }),
      Object.freeze({ type: "delay", delayTime: 0.62, feedback: 0, mix: 0.88 }),
      Object.freeze({ type: "delay", delayTime: 0.83, feedback: 0, mix: 0.09 }),
    ]),
  }),
  Object.freeze({
    type: "oscillator",
    oscillatorType: "sine",
    frequency: 251,
    reverseBuffer: false,
    muted: false,
    startOffset: 1,
    duration: 0.5,
    gain: 0.29,
    effects: Object.freeze([
      Object.freeze({ type: "delay", delayTime: 0.1, feedback: 0, mix: 0.82 }),
      Object.freeze({ type: "delay", delayTime: 0.35, feedback: 0, mix: 0.12 }),
      Object.freeze({ type: "delay", delayTime: 0.62, feedback: 0, mix: 0.88 }),
      Object.freeze({ type: "delay", delayTime: 0.83, feedback: 0, mix: 0.2 }),
    ]),
  }),
  Object.freeze({
    type: "oscillator",
    oscillatorType: "sine",
    frequency: 176,
    reverseBuffer: false,
    muted: false,
    startOffset: 1.5,
    duration: 0.5,
    gain: 0.2,
    effects: Object.freeze([
      Object.freeze({ type: "delay", delayTime: 0.1, feedback: 0, mix: 0.84 }),
      Object.freeze({ type: "delay", delayTime: 0.35, feedback: 0, mix: 0.04 }),
      Object.freeze({ type: "delay", delayTime: 0.62, feedback: 0, mix: 0.88 }),
      Object.freeze({ type: "delay", delayTime: 0.83, feedback: 0, mix: 0.86 }),
    ]),
  }),
  Object.freeze({
    type: "oscillator",
    oscillatorType: "sine",
    frequency: 233,
    reverseBuffer: false,
    muted: false,
    startOffset: 2,
    duration: 0.5,
    gain: 0.1,
    effects: Object.freeze([
      Object.freeze({ type: "delay", delayTime: 0.1, feedback: 0, mix: 0.4 }),
      Object.freeze({ type: "delay", delayTime: 0.35, feedback: 0, mix: 0.3 }),
      Object.freeze({ type: "delay", delayTime: 0.62, feedback: 0, mix: 0.07 }),
      Object.freeze({ type: "delay", delayTime: 0.83, feedback: 0, mix: 0.4 }),
    ]),
  }),
  Object.freeze({
    type: "oscillator",
    oscillatorType: "sine",
    frequency: 160,
    reverseBuffer: false,
    muted: false,
    startOffset: 2.5,
    duration: 0.5,
    gain: 0.05,
    effects: Object.freeze([
      Object.freeze({ type: "delay", delayTime: 0.1, feedback: 0, mix: 0.78 }),
      Object.freeze({ type: "delay", delayTime: 0.35, feedback: 0, mix: 0.16 }),
      Object.freeze({ type: "delay", delayTime: 0.62, feedback: 0, mix: 0.28 }),
      Object.freeze({ type: "delay", delayTime: 0.83, feedback: 0, mix: 0.73 }),
    ]),
  }),
]);

const varyEffect = effect => {
  if (!effect) return effect;
  if (effect.type !== "delay") return effect;

  return {
    ...effect,
    delayTime: jitterNumber(effect.delayTime, 0.12, 0.01),
    mix: jitterNumber(effect.mix, 0.18, 0),
  };
};

const varyProfile = profile => ({
  ...profile,
  frequency: jitterNumber(profile.frequency, 0.09, 20),
  startOffset: jitterOffset(profile.startOffset),
  duration: jitterNumber(profile.duration, 0.08, 0.05),
  gain: jitterNumber(profile.gain, 0.16, 0),
  effects: Array.isArray(profile.effects) ? profile.effects.map(varyEffect) : profile.effects,
});

export const playPoisonStatusEffect = (profiles = POISON_STATUS_EFFECT_PROFILES) => (
  playProfileSynth(profiles.map(varyProfile))
);
