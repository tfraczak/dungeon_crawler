import getAudioContext from "@core/audio_context";
import { playProfileSynth, pitchTrackedProfiles } from "@core/profile_synth";

// Gravel footstep -- gritty bandpass-filtered noise scrape with a subtle
// low thud for weight. Two flavors keyed by sprint state: walking is
// quieter and longer, sprinting is louder, snappier, and slightly higher
// in the noise band.
//
// `FOOTSTEP_PARAMS` exposes both flavors as sub-objects so the Dev Sound
// Sandbox can tune walk vs sprint independently. Anywhere `*Random` ends
// the key, that value is the upper bound of a uniform jitter added on top
// of the corresponding base.
export const FOOTSTEP_PARAMS = Object.freeze({
  walking: Object.freeze({
    duration: 0.18,
    volume: 0.04,
    baseFreq: 300,
    baseFreqRandom: 100,
    q: 0.4,
    thudFreq: 55,
    thudFreqRandom: 15,
    thudFreqEnd: 30,
    thudGainMult: 0.3,
    thudDuration: 0.05,
  }),
  sprinting: Object.freeze({
    duration: 0.14,
    volume: 0.12,
    baseFreq: 360,
    baseFreqRandom: 120,
    q: 0.4,
    thudFreq: 55,
    thudFreqRandom: 15,
    thudFreqEnd: 30,
    thudGainMult: 0.3,
    thudDuration: 0.05,
  }),
});

// Extra Sound Profiles layered on top of the bespoke synthesis above.
// Variant-keyed because walking and sprinting are separate "sounds" in
// the sandbox and may grow independent layer stacks. Sprinting gets a
// short brown-noise scrape with heavy distortion for crunch; walking
// has no extras yet.
//
// Top-level exports (rather than nesting under FOOTSTEP_PARAMS) because
// the dotted path FOOTSTEP_PARAMS.sprinting can't suffix into a valid
// JS identifier; the registry's `extraProfilesConstName` field points
// the sandbox at these names explicitly.
export const FOOTSTEP_WALKING_EXTRA_PROFILES = Object.freeze([
  Object.freeze({
    type: "pure_noise",
    noiseType: "brown",
    startOffset: 0,
    duration: 0.04,
    gain: 0.01,
    effects: Object.freeze([
      Object.freeze({
        type: "distortion",
        amount: 221,
        oversample: "4x",
      }),
      Object.freeze({
        type: "filter",
        filterType: "allpass",
        frequency: 9039,
        q: 14.6,
        gain: 0,
      }),
    ]),
  }),
]);

export const FOOTSTEP_SPRINTING_EXTRA_PROFILES = Object.freeze([
  Object.freeze({
    type: "pure_noise",
    noiseType: "brown",
    startOffset: 0,
    duration: 0.04,
    gain: 0.05,
    effects: Object.freeze([
      Object.freeze({
        type: "distortion",
        amount: 253,
        oversample: "4x",
      }),
    ]),
  }),
]);

const FOOTSTEP_VARIANT_EXTRAS = {
  walking: FOOTSTEP_WALKING_EXTRA_PROFILES,
  sprinting: FOOTSTEP_SPRINTING_EXTRA_PROFILES,
};

export default function playFootstep(sprinting = false, overrides = {}) {
  const variantKey = sprinting ? "sprinting" : "walking";
  const baseParams = FOOTSTEP_PARAMS[variantKey];
  const overrideVariant = overrides && overrides[variantKey] ? overrides[variantKey] : {};
  const extraProfiles = Array.isArray(overrideVariant.extraProfiles)
    ? overrideVariant.extraProfiles
    : FOOTSTEP_VARIANT_EXTRAS[variantKey];
  const params = { ...baseParams, ...overrideVariant };

  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Noise scrape layer -- longer tail, higher frequency for grit.
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * params.duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    const t = i / length;
    const envelope = Math.pow(1 - t, 2);
    data[i] = (Math.random() * 2 - 1) * envelope;
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  // Hoisted so layered extras can pitch-track this same value (no-op
  // for pure_noise, but future-proof for added oscillator/periodic_wave
  // layers).
  const bandpassFreq = params.baseFreq + Math.random() * params.baseFreqRandom;
  noiseFilter.frequency.setValueAtTime(bandpassFreq, now);
  noiseFilter.Q.value = params.q;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(params.volume, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + params.duration);
  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noiseSource.start(now);

  // Subtle low thud for weight.
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(params.thudFreq + Math.random() * params.thudFreqRandom, now);
  osc.frequency.exponentialRampToValueAtTime(params.thudFreqEnd, now + params.thudDuration);
  oscGain.gain.setValueAtTime(params.volume * params.thudGainMult, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + params.thudDuration);
  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + params.thudDuration + 0.01);

  if (extraProfiles && extraProfiles.length > 0) {
    playProfileSynth(pitchTrackedProfiles(extraProfiles, baseParams.baseFreq, bandpassFreq));
  }
}
