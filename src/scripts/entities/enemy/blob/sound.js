import { pitchTrackedProfiles, playProfileSynth } from "@core/profile_synth";

const BASE_VARIANCE_FREQUENCY = 875;
const PITCH_VARIANCE = 0.12;
const randomScale = amount => 1 + ((Math.random() * 2 - 1) * amount);
const jitterNumber = (value, amount, min = 0) => (
  Number.isFinite(value) ? Math.max(min, value * randomScale(amount)) : value
);
const jitterOffset = value => (
  Number.isFinite(value) ? Math.max(0, value + ((Math.random() - 0.5) * 0.025)) : value
);

export const BLOB_ATTACK_HIT_PROFILES = Object.freeze([
  Object.freeze({
    type: "noise_filter",
    noiseType: "white",
    startOffset: 0,
    duration: 0.22,
    gain: 0.36,
    attackTime: 0.03,
    decayCurve: "exponential",
    filterType: "lowpass",
    frequency: 300,
    q: 12,
    sweepEnabled: true,
    frequencyEnd: 1200,
    frequencySweep: "linear",
    frequencyLfoEnabled: true,
    frequencyLfoRate: 4,
    frequencyLfoDepth: 120,
    reverseBuffer: false,
    muted: false,
    effects: Object.freeze([]),
  }),
  Object.freeze({
    type: "noise_filter",
    noiseType: "white",
    startOffset: 0.12,
    duration: 1.1,
    gain: 0.3,
    attackTime: 0,
    decayCurve: "exponential",
    filterType: "lowpass",
    frequency: 1200,
    q: 12,
    sweepEnabled: true,
    frequencyEnd: 180,
    frequencySweep: "exponential",
    frequencyLfoEnabled: true,
    frequencyLfoRate: 4,
    frequencyLfoDepth: 180,
    reverseBuffer: false,
    muted: false,
    effects: Object.freeze([]),
  }),
  Object.freeze({
    type: "noise_filter",
    noiseType: "white",
    filterType: "lowpass",
    frequency: 875,
    q: 12.6,
    sweepEnabled: false,
    frequencyEnd: 899,
    frequencySweep: "exponential",
    frequencyLfoEnabled: true,
    frequencyLfoRate: 5,
    frequencyLfoDepth: 198,
    reverseBuffer: false,
    muted: false,
    startOffset: 0,
    duration: 0.5,
    gain: 0.05,
    attackTime: 0.02,
    decayCurve: "exponential",
    effects: Object.freeze([
      Object.freeze({
        type: "distortion",
        amount: 66,
        oversample: "4x",
      }),
    ]),
  }),
]);

export const playBlobAttackHit = (profiles = BLOB_ATTACK_HIT_PROFILES) => {
  const baseFrequency = BASE_VARIANCE_FREQUENCY * (1 + ((Math.random() - 0.5) * PITCH_VARIANCE));
  const variedProfiles = pitchTrackedProfiles(profiles, BASE_VARIANCE_FREQUENCY, baseFrequency)
    .map(profile => ({
      ...profile,
      frequency: jitterNumber(profile.frequency, 0.08, 20),
      frequencyEnd: jitterNumber(profile.frequencyEnd, 0.08, 20),
      q: jitterNumber(profile.q, 0.18, 0.1),
      startOffset: jitterOffset(profile.startOffset),
      duration: jitterNumber(profile.duration, 0.12, 0.01),
      gain: jitterNumber(profile.gain, 0.2, 0),
      attackTime: jitterNumber(profile.attackTime, 0.12, 0),
      effects: profile.effects,
    }));
  return playProfileSynth(variedProfiles);
};
