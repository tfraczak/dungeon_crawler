// UI click — Mechanical button click used by restart and how-to buttons.
//
// Built atop the generic Sound Profile runtime so the Dev Sound Sandbox
// drawer can tune it (and any custom variant) using the same plumbing as
// every other profile_synth entry. Runtime production code paths still use
// the bundled `restart-sound` <audio> element; `playClick` is consumed
// exclusively by the sandbox today, but lives here as the canonical click
// sound module so a future swap-in is a one-line change at the call site.

import { playProfileSynth } from "@core/profile_synth";

// Two layers played together: a short bandpass-filtered noise transient
// for the "tick", plus a low sine body for the audible "thunk". Each layer
// is an independent Sound Profile fired at the same `startOffset`.
export const DEFAULT_CLICK_PROFILES = Object.freeze([
  Object.freeze({
    type: "noise_filter",
    startOffset: 0,
    duration: 0.03,
    gain: 0.25,
    filterType: "bandpass",
    frequency: 2400,
    q: 6,
  }),
  Object.freeze({
    type: "oscillator",
    startOffset: 0,
    duration: 0.04,
    gain: 0.15,
    oscillatorType: "sine",
    frequency: 600,
  }),
]);

// Thin wrapper. Sandbox passes a tuned profile array; everywhere else
// passes nothing and gets the defaults.
export const playClick = (profiles = DEFAULT_CLICK_PROFILES) => playProfileSynth(profiles);
