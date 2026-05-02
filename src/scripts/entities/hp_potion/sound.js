import getAudioContext from "@core/audio_context";
import { playProfileSynth, pitchTrackedProfiles } from "@core/profile_synth";

// HP potion pickup -- warm ascending 3-note chime (I-III-V) on a sine wave
// with a gentle bell harmonic. Intentionally distinct from the metallic
// coin ping so the player can hear the heal without looking at the HUD.
export const HP_POTION_PICKUP_PARAMS = Object.freeze({
  root: 520,
  intervalRatios: Object.freeze([1, 1.26, 1.5]),
  noteSpacing: 0.07,
  noteDuration: 0.12,
  noteGain: 0.1,
  bellHarmonicMult: 3.2,
  bellGain: 0.035,
});

// HP potion drop -- muted glassy thunk when a bottle lands. A softer, lower
// analog of playCoinDrop so dropped potions read as a different pickup class
// by ear alone.
export const HP_POTION_DROP_PARAMS = Object.freeze({
  baseFreq: 260,
  freqRandomRange: 120,
  detuneRange: 60,
  gain: 0.08,
  duration: 0.12,
});

// Extra Sound Profiles layered on top of the bespoke synthesis above.
// A short periodic_wave (square8) burst tuned at 440Hz against the
// default 260Hz baseFreq (~1.69x harmonic ratio); pitchTrackedProfiles
// rescales it per call so it tracks the bespoke jitter.
export const HP_POTION_DROP_EXTRA_PROFILES = Object.freeze([
  Object.freeze({
    type: "periodic_wave",
    frequency: 440,
    harmonics: "square8",
    startOffset: 0,
    duration: 0.04,
    gain: 0.2,
    effects: Object.freeze([]),
  }),
]);

export function playHpPotionDrop(overrides = {}) {
  const extraProfiles = Array.isArray(overrides.extraProfiles)
    ? overrides.extraProfiles
    : HP_POTION_DROP_EXTRA_PROFILES;
  const params = { ...HP_POTION_DROP_PARAMS, ...overrides };
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const baseFreq = params.baseFreq + Math.random() * params.freqRandomRange;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = baseFreq;
  osc.detune.value = (Math.random() - 0.5) * params.detuneRange;
  gain.gain.setValueAtTime(params.gain, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + params.duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + params.duration);

  if (extraProfiles.length > 0) {
    playProfileSynth(pitchTrackedProfiles(extraProfiles, HP_POTION_DROP_PARAMS.baseFreq, baseFreq));
  }
}

export default function playHpPotionSound(overrides = {}) {
  const params = { ...HP_POTION_PICKUP_PARAMS, ...overrides };
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const intervals = Array.isArray(params.intervalRatios) ? params.intervalRatios : HP_POTION_PICKUP_PARAMS.intervalRatios;

  intervals.forEach((mult, idx) => {
    const start = now + idx * params.noteSpacing;
    const freq = params.root * mult;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(params.noteGain, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, start + params.noteDuration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + params.noteDuration);

    const bell = ctx.createOscillator();
    const bellGain = ctx.createGain();
    bell.type = "sine";
    bell.frequency.value = freq * params.bellHarmonicMult;
    bellGain.gain.setValueAtTime(0, start);
    bellGain.gain.linearRampToValueAtTime(params.bellGain, start + 0.005);
    bellGain.gain.exponentialRampToValueAtTime(0.001, start + params.noteDuration * 0.8);
    bell.connect(bellGain);
    bellGain.connect(ctx.destination);
    bell.start(start);
    bell.stop(start + params.noteDuration);
  });
}
