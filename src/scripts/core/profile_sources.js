// Pluggable registry of "source" node types for the Sound Profile runtime.
//
// Each entry:
//   {
//     id:       stable string used by Profile.type and the JSON payload
//     label:    human-readable label for the Type dropdown in the UI
//     defaults: source-type-specific knob defaults (merged with Profile)
//     knobs:    array of knob descriptors consumed by knob_renderer.js
//     build(ctx, params): { output, start(when), stop(when) }
//   }
//
// `build` returns a tiny envelope-friendly handle: `output` is the
// AudioNode that the universal envelope GainNode hooks into, while `start`
// and `stop` are the only methods profile_synth.js calls. This lets a
// source compose multiple internal nodes (e.g. noise_filter pipes a buffer
// source through a biquad filter) without leaking that detail to the
// runtime.
//
// Adding a new source type later is a one-file change: append a new entry
// here and the renderer + runtime + copy payload all pick it up
// automatically. v1 entries: oscillator, noise_filter, pure_noise,
// periodic_wave.

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

// Build an AudioBuffer of length `seconds` filled with the requested noise
// color. White is uniform [-1, 1]; pink uses Voss-McCartney; brown is a
// running sum, scaled to keep amplitude in range.
const buildNoiseBuffer = (ctx, seconds, color = "white") => {
  const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  if (color === "white") {
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  } else if (color === "pink") {
    // Standard 5-row Voss-McCartney approximation.
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < length; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520;
      b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    }
  } else if (color === "brown") {
    let last = 0;
    for (let i = 0; i < length; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      data[i] = last * 3.5;
    }
  } else {
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  }
  return buffer;
};

const reverseBuffer = (buffer) => {
  for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
    buffer.getChannelData(ch).reverse();
  }
  return buffer;
};

const scheduleFrequency = (param, when, duration, startFrequency, endFrequency, sweepEnabled, sweepCurve) => {
  const start = Math.max(20, startFrequency);
  const end = Math.max(20, endFrequency ?? start);
  param.cancelScheduledValues(when);
  param.setValueAtTime(start, when);
  if (!sweepEnabled) return;
  if (sweepCurve === "linear") {
    param.linearRampToValueAtTime(end, when + duration);
  } else {
    param.exponentialRampToValueAtTime(end, when + duration);
  }
};

// PeriodicWave harmonic preset library. Each preset is a Float32 amplitude
// array for the `imag` argument; the `real` argument is left zero (sine
// basis only) so users still get a recognizable timbre without needing to
// edit raw arrays. Index 0 is DC and ignored by createPeriodicWave.
const PERIODIC_WAVE_PRESETS = {
  // Approximate band-limited square: only odd harmonics, 1/n falloff.
  square8: new Float32Array([0, 1, 0, 1 / 3, 0, 1 / 5, 0, 1 / 7, 0]),
  // Approximate band-limited sawtooth: every harmonic, 1/n falloff.
  sawtooth8: new Float32Array([0, 1, 1 / 2, 1 / 3, 1 / 4, 1 / 5, 1 / 6, 1 / 7, 1 / 8]),
  // Organ-flavored stack (16'+8'+4'+2' style).
  organ: new Float32Array([0, 1, 0.6, 0, 0.4, 0, 0, 0, 0.2]),
  // Bell-ish: inharmonic-feeling stack with prominent upper partials.
  bell: new Float32Array([0, 1, 0, 0.4, 0.8, 0, 0.5, 0.3, 0.2]),
};

// ---------------------------------------------------------------------------
// Source registry
// ---------------------------------------------------------------------------

const oscillatorSource = {
  id: "oscillator",
  label: "Oscillator",
  defaults: {
    oscillatorType: "sine",
    frequency: 600,
    sweepEnabled: false,
    frequencyEnd: 220,
    frequencySweep: "exponential",
    reverseBuffer: false,
  },
  knobs: [
    {
      key: "oscillatorType",
      label: "Wave",
      type: "select",
      options: ["sine", "triangle", "square", "sawtooth"],
    },
    {
      key: "frequency",
      label: "Frequency",
      unit: "Hz",
      type: "range",
      min: 20,
      max: 20000,
      step: 1,
    },
    { key: "sweepEnabled", label: "Sweep frequency", type: "checkbox" },
    { key: "frequencyEnd", label: "Frequency end", unit: "Hz", type: "range", min: 20, max: 20000, step: 1 },
    { key: "frequencySweep", label: "Sweep curve", type: "select", options: ["linear", "exponential"] },
    { key: "reverseBuffer", label: "Reverse reverb/delay", type: "checkbox" },
  ],
  build(ctx, params) {
    const osc = ctx.createOscillator();
    osc.type = params.oscillatorType ?? "sine";
    return {
      output: osc,
      start: (when) => {
        const duration = Math.max(0.001, params.duration ?? 0.04);
        scheduleFrequency(
          osc.frequency,
          when,
          duration,
          params.frequency ?? 600,
          params.frequencyEnd,
          params.sweepEnabled,
          params.frequencySweep,
        );
        osc.start(when);
      },
      stop: (when) => osc.stop(when),
    };
  },
};

const noiseFilterSource = {
  id: "noise_filter",
  label: "Noise + filter",
  defaults: {
    noiseType: "white",
    filterType: "bandpass",
    frequency: 2400,
    q: 6,
    sweepEnabled: false,
    frequencyEnd: 600,
    frequencySweep: "exponential",
    frequencyLfoEnabled: false,
    frequencyLfoRate: 4,
    frequencyLfoDepth: 180,
    reverseBuffer: false,
  },
  knobs: [
    { key: "noiseType", label: "Noise color", type: "select", options: ["white", "pink", "brown"] },
    {
      key: "filterType",
      label: "Filter",
      type: "select",
      options: ["lowpass", "highpass", "bandpass", "notch", "allpass", "lowshelf", "highshelf", "peaking"],
    },
    { key: "frequency", label: "Frequency", unit: "Hz", type: "range", min: 20, max: 20000, step: 1 },
    { key: "q",         label: "Q",                      type: "range", min: 0.1, max: 30, step: 0.1 },
    { key: "sweepEnabled", label: "Sweep frequency", type: "checkbox" },
    { key: "frequencyEnd", label: "Frequency end", unit: "Hz", type: "range", min: 20, max: 20000, step: 1 },
    { key: "frequencySweep", label: "Sweep curve", type: "select", options: ["linear", "exponential"] },
    { key: "frequencyLfoEnabled", label: "Filter wobble", type: "checkbox" },
    { key: "frequencyLfoRate", label: "Wobble rate", unit: "Hz", type: "range", min: 0.1, max: 40, step: 0.1 },
    { key: "frequencyLfoDepth", label: "Wobble depth", unit: "Hz", type: "range", min: 0, max: 2000, step: 1 },
    { key: "reverseBuffer", label: "Reverse buffer", type: "checkbox" },
  ],
  build(ctx, params) {
    // Buffer length is sized to the profile duration in profile_synth's
    // wrapper (we don't know it here), so use a 1-second reservoir and
    // start/stop will trim it. Looping ensures longer durations don't run dry.
    const buffer = buildNoiseBuffer(ctx, 1, params.noiseType ?? "white");
    const src = ctx.createBufferSource();
    src.buffer = params.reverseBuffer ? reverseBuffer(buffer) : buffer;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = params.filterType ?? "bandpass";
    filter.Q.setValueAtTime(params.q ?? 6, ctx.currentTime);
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(params.frequencyLfoRate ?? 4, ctx.currentTime);
    lfoGain.gain.setValueAtTime(params.frequencyLfoDepth ?? 180, ctx.currentTime);
    lfo.connect(lfoGain);
    if (params.frequencyLfoEnabled) lfoGain.connect(filter.frequency);
    src.connect(filter);
    return {
      output: filter,
      start: (when) => {
        const duration = Math.max(0.001, params.duration ?? 0.04);
        scheduleFrequency(
          filter.frequency,
          when,
          duration,
          params.frequency ?? 2400,
          params.frequencyEnd,
          params.sweepEnabled,
          params.frequencySweep,
        );
        if (params.frequencyLfoEnabled) lfo.start(when);
        src.start(when);
      },
      stop: (when) => {
        src.stop(when);
        if (params.frequencyLfoEnabled) lfo.stop(when);
      },
    };
  },
};

const pureNoiseSource = {
  id: "pure_noise",
  label: "Pure noise",
  defaults: { noiseType: "white", reverseBuffer: false },
  knobs: [
    { key: "noiseType", label: "Color", type: "select", options: ["white", "pink", "brown"] },
    { key: "reverseBuffer", label: "Reverse buffer", type: "checkbox" },
  ],
  build(ctx, params) {
    const buffer = buildNoiseBuffer(ctx, 1, params.noiseType ?? "white");
    const src = ctx.createBufferSource();
    src.buffer = params.reverseBuffer ? reverseBuffer(buffer) : buffer;
    src.loop = true;
    return {
      output: src,
      start: (when) => src.start(when),
      stop: (when) => src.stop(when),
    };
  },
};

const periodicWaveSource = {
  id: "periodic_wave",
  label: "Periodic wave",
  defaults: { frequency: 440, harmonics: "square8", reverseBuffer: false },
  knobs: [
    { key: "frequency", label: "Frequency", unit: "Hz", type: "range", min: 20, max: 20000, step: 1 },
    {
      key: "harmonics",
      label: "Harmonics",
      type: "select",
      options: Object.keys(PERIODIC_WAVE_PRESETS),
    },
    { key: "reverseBuffer", label: "Reverse reverb/delay", type: "checkbox" },
  ],
  build(ctx, params) {
    const harmonics = params.harmonics ?? "square8";
    const imag = PERIODIC_WAVE_PRESETS[harmonics] ?? PERIODIC_WAVE_PRESETS.square8;
    const real = new Float32Array(imag.length);
    const wave = ctx.createPeriodicWave(real, imag, { disableNormalization: false });
    const osc = ctx.createOscillator();
    osc.setPeriodicWave(wave);
    osc.frequency.setValueAtTime(params.frequency ?? 440, ctx.currentTime);
    return {
      output: osc,
      start: (when) => osc.start(when),
      stop: (when) => osc.stop(when),
    };
  },
};

const SOURCES = {
  [oscillatorSource.id]: oscillatorSource,
  [noiseFilterSource.id]: noiseFilterSource,
  [pureNoiseSource.id]: pureNoiseSource,
  [periodicWaveSource.id]: periodicWaveSource,
};

export const getSource = (id) => SOURCES[id] ?? null;
export const listSources = () => Object.values(SOURCES);
export const getSourceDefaults = (id) => ({ ...(getSource(id)?.defaults ?? {}) });
