import getAudioContext from "@core/audio_context";
import { playProfileSynth, pitchTrackedProfiles } from "@core/profile_synth";

// Coin pickup -- randomized metallic ping when a coin is collected.
// Two oscillator layers: a triangle "body" plus a higher sine "harmonic"
// for a metallic ring. The Dev Sound Sandbox tunes this via the exposed
// COIN_PICKUP_PARAMS knobs.
export const COIN_PICKUP_PARAMS = Object.freeze({
  baseFreq: 2000,
  freqRandomRange: 1500,
  detuneRange: 200,
  gain: 0.12,
  duration: 0.4,
  harmonicMultMin: 2.5,
  harmonicMultMax: 3.0,
  harmonicGain: 0.05,
  harmonicDuration: 0.3,
});

// Extra Sound Profiles layered on top of the bespoke synthesis above.
// The layered oscillator pitch tracks the bespoke randomized baseFreq at
// the harmonic ratio captured in the sandbox (8106/2000 ≈ 4.05x), so the
// shimmer stays consonant with the body pitch instead of drifting around
// it. See playCoinSound for the per-call substitution.
export const COIN_PICKUP_EXTRA_PROFILES = Object.freeze([
  Object.freeze({
    type: "oscillator",
    startOffset: 0,
    duration: 0.14,
    gain: 0.91,
    oscillatorType: "sine",
    frequency: 8106,
    effects: Object.freeze([]),
  }),
]);

// Coin drop -- soft metallic tink when a coin lands.
export const COIN_DROP_PARAMS = Object.freeze({
  baseFreq: 2950,
  freqRandomRange: 230,
  detuneRange: 30,
  gain: 0.03,
  duration: 0.1,
});

// Extra Sound Profiles layered on top of the bespoke synthesis above.
// The layered oscillator pitch tracks the bespoke randomized baseFreq at
// the harmonic ratio captured in the sandbox (10683/2950 ≈ 3.62x), so
// the metallic ring stays consonant with the body pitch instead of
// drifting around it. See playCoinDrop for the per-call substitution.
export const COIN_DROP_EXTRA_PROFILES = Object.freeze([
  Object.freeze({
    type: "oscillator",
    startOffset: 0,
    duration: 0.05,
    gain: 0.86,
    oscillatorType: "sine",
    frequency: 10683,
    effects: Object.freeze([
      Object.freeze({
        type: "reverb",
        duration: 0.75,
        decay: 8.2,
        mix: 0.59,
      }),
    ]),
  }),
]);

export const COIN_STOLEN_PROFILES = Object.freeze([
  Object.freeze({
    type: "periodic_wave",
    frequency: 5406,
    harmonics: "bell",
    reverseBuffer: false,
    muted: false,
    startOffset: 0,
    duration: 0.04,
    gain: 0.5,
    effects: Object.freeze([
      Object.freeze({
        type: "reverb",
        duration: 1.5,
        decay: 2.5,
        mix: 0.35,
      }),
    ]),
  }),
  Object.freeze({
    type: "periodic_wave",
    startOffset: 0,
    duration: 0.04,
    gain: 0.65,
    frequency: 9614,
    harmonics: "square8",
    reverseBuffer: false,
    effects: Object.freeze([
      Object.freeze({
        type: "delay",
        delayTime: 0.06,
        feedback: 0.35,
        mix: 0.4,
      }),
      Object.freeze({
        type: "reverb",
        duration: 1.5,
        decay: 2.5,
        mix: 0.35,
      }),
      Object.freeze({
        type: "delay",
        delayTime: 0.12,
        feedback: 0.1,
        mix: 1,
      }),
    ]),
  }),
]);

export const playCoinStolen = (profiles = COIN_STOLEN_PROFILES) => playProfileSynth(profiles);

export function playCoinDrop(overrides = {}) {
  const extraProfiles = Array.isArray(overrides.extraProfiles)
    ? overrides.extraProfiles
    : COIN_DROP_EXTRA_PROFILES;
  const params = { ...COIN_DROP_PARAMS, ...overrides };
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const baseFreq = params.baseFreq + Math.random() * params.freqRandomRange;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = baseFreq;
  osc.detune.value = (Math.random() - 0.5) * params.detuneRange;
  gain.gain.setValueAtTime(params.gain, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + params.duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + params.duration);

  if (extraProfiles.length > 0) {
    playProfileSynth(pitchTrackedProfiles(extraProfiles, COIN_DROP_PARAMS.baseFreq, baseFreq));
  }
}

export default function playCoinSound(overrides = {}) {
  const extraProfiles = Array.isArray(overrides.extraProfiles)
    ? overrides.extraProfiles
    : COIN_PICKUP_EXTRA_PROFILES;
  const params = { ...COIN_PICKUP_PARAMS, ...overrides };
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const baseFreq = params.baseFreq + Math.random() * params.freqRandomRange;
  const detune = (Math.random() - 0.5) * params.detuneRange;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = baseFreq;
  osc.detune.value = detune;
  gain.gain.setValueAtTime(params.gain, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + params.duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + params.duration);

  // Harmonic overtone for metallic ring.
  const harmonicSpread = params.harmonicMultMax - params.harmonicMultMin;
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.value = baseFreq * (params.harmonicMultMin + Math.random() * harmonicSpread);
  gain2.gain.setValueAtTime(params.harmonicGain, now);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + params.harmonicDuration);
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now);
  osc2.stop(now + params.harmonicDuration);

  if (extraProfiles.length > 0) {
    playProfileSynth(pitchTrackedProfiles(extraProfiles, COIN_PICKUP_PARAMS.baseFreq, baseFreq));
  }
}
