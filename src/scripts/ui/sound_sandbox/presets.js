// Built-in starter recipes for the Sound Profile system. Used in two
// places by the sandbox:
//
//   1. As standalone library entries in the dropdown ("Library presets"
//      optgroup) so a user can audition each one and tune it in place.
//   2. As starting points when the user clicks "+ Add experimental sound"
//      and picks a template to seed the new entry's profiles.
//
// Each preset is a frozen array of Profile objects in the same shape as
// `DEFAULT_CLICK_PROFILES`. New presets here are picked up automatically
// by the install module's dropdown builder.

const freezeProfiles = (profiles) => Object.freeze(profiles.map((p) => Object.freeze(p)));

export const PRESETS = Object.freeze({
  blank: {
    label: "Blank",
    description: "Empty starting point with no profiles -- add your own",
    profiles: Object.freeze([]),
  },
  blip: {
    label: "Blip",
    description: "Short upper-mid sine pip, classic 8-bit menu blip",
    profiles: freezeProfiles([
      {
        type: "oscillator",
        startOffset: 0,
        duration: 0.08,
        gain: 0.2,
        oscillatorType: "square",
        frequency: 880,
      },
    ]),
  },
  boom: {
    label: "Boom",
    description: "Low sine thump plus a noise burst body",
    profiles: freezeProfiles([
      {
        type: "oscillator",
        startOffset: 0,
        duration: 0.4,
        gain: 0.4,
        oscillatorType: "sine",
        frequency: 70,
      },
      {
        type: "noise_filter",
        startOffset: 0,
        duration: 0.25,
        gain: 0.18,
        filterType: "lowpass",
        frequency: 400,
        q: 0.7,
      },
    ]),
  },
  magic_zap: {
    label: "Magic zap",
    description: "Quick descending sawtooth zap for a spell cast",
    profiles: freezeProfiles([
      {
        type: "oscillator",
        startOffset: 0,
        duration: 0.18,
        gain: 0.2,
        oscillatorType: "sawtooth",
        frequency: 1800,
      },
      {
        type: "noise_filter",
        startOffset: 0,
        duration: 0.22,
        gain: 0.12,
        filterType: "highpass",
        frequency: 2400,
        q: 1,
      },
    ]),
  },
  door_creak: {
    label: "Door creak",
    description: "Slow groaning hinge for a door open or close",
    profiles: freezeProfiles([
      {
        type: "noise_filter",
        startOffset: 0,
        duration: 0.7,
        gain: 0.25,
        filterType: "bandpass",
        frequency: 240,
        q: 9,
        effects: [
          { type: "distortion", amount: 25, oversample: "4x" },
        ],
      },
      {
        type: "oscillator",
        startOffset: 0.1,
        duration: 0.5,
        gain: 0.12,
        oscillatorType: "sawtooth",
        frequency: 110,
      },
    ]),
  },
  bell: {
    label: "Bell",
    description: "Inharmonic sine stack for a soft bell ring",
    profiles: freezeProfiles([
      {
        type: "periodic_wave",
        startOffset: 0,
        duration: 1.2,
        gain: 0.18,
        frequency: 440,
        harmonics: "bell",
      },
      {
        type: "oscillator",
        startOffset: 0,
        duration: 1.0,
        gain: 0.08,
        oscillatorType: "sine",
        frequency: 880,
      },
    ]),
  },
});

export const listPresetIds = () => Object.keys(PRESETS);
export const getPreset = (id) => PRESETS[id] ?? null;
