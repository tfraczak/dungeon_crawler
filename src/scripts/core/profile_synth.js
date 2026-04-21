// Generic Sound Profile runtime. A `profile_synth` sound is just an array
// of independent Profiles played together; this module knows how to wire
// each Profile into the Web Audio graph and schedule its envelope.
//
// Per-profile signal flow:
//   source.output -> envelopeGain -> effect[0].input -> effect[0].output
//                                  -> ... -> effect[N-1].output -> destination
//
// Envelope: peak `gain` at `startOffset`, exponentially decays to ~0 over
// `duration`. The source is scheduled to start at `now + startOffset` and
// stop at `now + startOffset + duration` (plus a tiny tail to flush the
// envelope without a click).
//
// Lazy-instantiated AudioContext: created on first call inside a user
// gesture (sandbox Play button) so we never trigger the browser's
// "AudioContext was not allowed to start" warning on page load.

import getAudioContext from "./audio_context";
import { getSource } from "./profile_sources";
import { getEffect } from "./profile_effects";

// Tiny tail past `duration` so the envelope ramp completes audibly before
// stop() yanks the source. Keeps short clicks click-y without leaving a
// pop on longer durations.
const ENVELOPE_TAIL = 0.02;

// Play a single profile. Returns nothing — fire and forget; the source
// node is scheduled to stop on its own and will be garbage-collected.
const playOneProfile = (ctx, profile) => {
  const sourceDef = getSource(profile.type);
  if (!sourceDef) return;

  // Merge source-type defaults under the profile's own values so partial
  // profiles still work.
  const sourceParams = { ...sourceDef.defaults, ...profile };
  const built = sourceDef.build(ctx, sourceParams);

  const startOffset = Number.isFinite(profile.startOffset) ? Math.max(0, profile.startOffset) : 0;
  const duration = Number.isFinite(profile.duration) ? Math.max(0.001, profile.duration) : 0.04;
  const peakGain = Number.isFinite(profile.gain) ? Math.max(0, profile.gain) : 0.2;

  const startAt = ctx.currentTime + startOffset;
  const stopAt = startAt + duration + ENVELOPE_TAIL;

  // Universal envelope: instant attack to `peakGain`, exponential decay to
  // a near-zero floor over `duration`. exponentialRampToValueAtTime can't
  // hit 0, hence the small floor.
  const envelope = ctx.createGain();
  envelope.gain.setValueAtTime(peakGain, startAt);
  envelope.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

  // Wire source -> envelope -> [effects chain] -> destination.
  built.output.connect(envelope);
  let lastNode = envelope;
  const effects = Array.isArray(profile.effects) ? profile.effects : [];
  for (const effect of effects) {
    const effectDef = getEffect(effect.type);
    if (!effectDef) continue;
    const effectParams = { ...effectDef.defaults, ...effect };
    const effectNode = effectDef.build(ctx, effectParams);
    lastNode.connect(effectNode.input);
    lastNode = effectNode.output;
  }
  lastNode.connect(ctx.destination);

  built.start(startAt);
  built.stop(stopAt);
};

// Pitch-locking helper for layering Sound Profiles on top of a bespoke
// game sound that randomizes its own base frequency per call.
//
// `extras` is the frozen <NAME>_EXTRA_PROFILES const (built at the
// canonical default base freq). `defaultBaseFreq` is the bespoke
// sound's default `baseFreq` -- the value the sandbox dialed the layer
// frequencies against. `baseFreq` is the actual jittered base freq for
// this single call.
//
// Returns a new array where every profile with a finite numeric
// `frequency` is rescaled to preserve its original ratio
// (profile.frequency / defaultBaseFreq) but applied to `baseFreq`, so
// the harmonic interval the user dialed in stays consonant with the
// body pitch as it jitters. Sources without a frequency knob (e.g.
// pure_noise) pass through untouched. Effects on each profile are not
// touched -- they're already pitch-agnostic in the v1 effect set.
export const pitchTrackedProfiles = (extras, defaultBaseFreq, baseFreq) => {
  if (!Array.isArray(extras)) return extras;
  if (!Number.isFinite(defaultBaseFreq) || defaultBaseFreq <= 0) return extras;
  if (!Number.isFinite(baseFreq) || baseFreq <= 0) return extras;
  return extras.map((profile) => {
    if (!profile || !Number.isFinite(profile.frequency)) return profile;
    const ratio = profile.frequency / defaultBaseFreq;
    return { ...profile, frequency: baseFreq * ratio };
  });
};

// Play an entire profile_synth sound: fan out, schedule each profile.
export const playProfileSynth = (profiles) => {
  const ctx = getAudioContext();
  if (!ctx) return;
  // Browsers suspend the context if it was created before any user
  // gesture. Resuming inside the gesture handler is safe and a no-op
  // when already running.
  if (ctx.state === "suspended") ctx.resume?.().catch?.(() => {});
  if (!Array.isArray(profiles)) return;
  for (const profile of profiles) playOneProfile(ctx, profile);
};
