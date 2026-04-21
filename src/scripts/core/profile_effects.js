// Pluggable registry of post-effect node types for the Sound Profile runtime.
//
// Each entry:
//   {
//     id:       stable string used by Effect.type and the JSON payload
//     label:    human-readable label for the Type dropdown in the UI
//     defaults: effect-specific knob defaults
//     knobs:    knob descriptors consumed by knob_renderer.js
//     build(ctx, params): { input, output }
//   }
//
// The runtime chains effects head-to-tail by connecting each effect's
// `output` to the next effect's `input` (and the final `output` to
// ctx.destination). Effects that need wet/dry blending (delay, reverb)
// implement that internally via parallel gains so the input/output
// contract stays a single AudioNode pair.
//
// Adding a new effect type later is a one-file change: append a new entry
// here and the renderer + runtime + copy payload all pick it up
// automatically. v1 entries: delay, distortion, compressor, reverb, gain,
// pan, filter.

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

// Standard cubic-ish distortion curve. `amount` is unitless and roughly
// behaves like "how hard you bend the waveform"; common range 0-400.
const buildDistortionCurve = (amount) => {
  const k = Number.isFinite(amount) ? amount : 50;
  const samples = 44100;
  const curve = new Float32Array(samples);
  const deg = Math.PI / 180;
  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
};

// Procedurally generated convolution impulse: exponentially decaying
// noise. Lets us ship reverb without an audio asset.
const buildImpulseBuffer = (ctx, duration, decay) => {
  const length = Math.max(1, Math.floor(ctx.sampleRate * Math.max(0.01, duration)));
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return buffer;
};

// ---------------------------------------------------------------------------
// Effect registry
// ---------------------------------------------------------------------------

const delayEffect = {
  id: "delay",
  label: "Delay",
  defaults: { delayTime: 0.12, feedback: 0.35, mix: 0.4 },
  knobs: [
    // Uncapped — see plan note: timing fields are intentionally text inputs
    // so users can experiment with very long/short values.
    { key: "delayTime", label: "Delay time", unit: "s", type: "text_number" },
    { key: "feedback",  label: "Feedback",            type: "range", min: 0, max: 0.95, step: 0.01 },
    { key: "mix",       label: "Mix",                 type: "range", min: 0, max: 1,    step: 0.01 },
  ],
  build(ctx, params) {
    const input = ctx.createGain();
    const output = ctx.createGain();
    const delay = ctx.createDelay(Math.max(1, (params.delayTime ?? 0.12) * 4));
    delay.delayTime.setValueAtTime(params.delayTime ?? 0.12, ctx.currentTime);
    const feedback = ctx.createGain();
    feedback.gain.setValueAtTime(params.feedback ?? 0.35, ctx.currentTime);
    const wet = ctx.createGain();
    wet.gain.setValueAtTime(params.mix ?? 0.4, ctx.currentTime);
    const dry = ctx.createGain();
    dry.gain.setValueAtTime(1 - (params.mix ?? 0.4), ctx.currentTime);

    input.connect(dry).connect(output);
    input.connect(delay);
    delay.connect(feedback).connect(delay);
    delay.connect(wet).connect(output);

    return { input, output };
  },
};

const distortionEffect = {
  id: "distortion",
  label: "Distortion",
  defaults: { amount: 50, oversample: "4x" },
  knobs: [
    { key: "amount",     label: "Amount",     type: "range", min: 0, max: 400, step: 1 },
    { key: "oversample", label: "Oversample", type: "select", options: ["none", "2x", "4x"] },
  ],
  build(ctx, params) {
    const shaper = ctx.createWaveShaper();
    shaper.curve = buildDistortionCurve(params.amount ?? 50);
    shaper.oversample = params.oversample ?? "4x";
    return { input: shaper, output: shaper };
  },
};

const compressorEffect = {
  id: "compressor",
  label: "Compressor",
  defaults: { threshold: -24, knee: 30, ratio: 12, attack: 0.003, release: 0.25 },
  knobs: [
    { key: "threshold", label: "Threshold", unit: "dB", type: "range", min: -100, max: 0,  step: 1 },
    { key: "knee",      label: "Knee",                  type: "range", min: 0,    max: 40, step: 1 },
    { key: "ratio",     label: "Ratio",                 type: "range", min: 1,    max: 20, step: 0.5 },
    { key: "attack",    label: "Attack",  unit: "s",    type: "range", min: 0,    max: 1,  step: 0.001 },
    { key: "release",   label: "Release", unit: "s",    type: "range", min: 0,    max: 1,  step: 0.001 },
  ],
  build(ctx, params) {
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.setValueAtTime(params.threshold ?? -24, ctx.currentTime);
    comp.knee.setValueAtTime(params.knee ?? 30, ctx.currentTime);
    comp.ratio.setValueAtTime(params.ratio ?? 12, ctx.currentTime);
    comp.attack.setValueAtTime(params.attack ?? 0.003, ctx.currentTime);
    comp.release.setValueAtTime(params.release ?? 0.25, ctx.currentTime);
    return { input: comp, output: comp };
  },
};

const reverbEffect = {
  id: "reverb",
  label: "Reverb",
  defaults: { duration: 1.5, decay: 2.5, mix: 0.35 },
  knobs: [
    { key: "duration", label: "Duration", unit: "s", type: "text_number" },
    { key: "decay",    label: "Decay",                type: "range", min: 0.1, max: 10, step: 0.1 },
    { key: "mix",      label: "Mix",                  type: "range", min: 0,   max: 1,  step: 0.01 },
  ],
  build(ctx, params) {
    const input = ctx.createGain();
    const output = ctx.createGain();
    const conv = ctx.createConvolver();
    conv.buffer = buildImpulseBuffer(ctx, params.duration ?? 1.5, params.decay ?? 2.5);
    const wet = ctx.createGain();
    wet.gain.setValueAtTime(params.mix ?? 0.35, ctx.currentTime);
    const dry = ctx.createGain();
    dry.gain.setValueAtTime(1 - (params.mix ?? 0.35), ctx.currentTime);

    input.connect(dry).connect(output);
    input.connect(conv).connect(wet).connect(output);

    return { input, output };
  },
};

const gainEffect = {
  id: "gain",
  label: "Gain",
  defaults: { gain: 1 },
  knobs: [
    { key: "gain", label: "Gain", type: "range", min: 0, max: 2, step: 0.01 },
  ],
  build(ctx, params) {
    const node = ctx.createGain();
    node.gain.setValueAtTime(params.gain ?? 1, ctx.currentTime);
    return { input: node, output: node };
  },
};

const panEffect = {
  id: "pan",
  label: "Pan",
  defaults: { pan: 0 },
  knobs: [
    { key: "pan", label: "Pan", type: "range", min: -1, max: 1, step: 0.01 },
  ],
  build(ctx, params) {
    const node = ctx.createStereoPanner();
    node.pan.setValueAtTime(params.pan ?? 0, ctx.currentTime);
    return { input: node, output: node };
  },
};

const filterEffect = {
  id: "filter",
  label: "Filter",
  defaults: { filterType: "lowpass", frequency: 1000, q: 1, gain: 0 },
  knobs: [
    {
      key: "filterType",
      label: "Filter type",
      type: "select",
      options: ["lowpass", "highpass", "bandpass", "notch", "allpass", "lowshelf", "highshelf", "peaking"],
    },
    { key: "frequency", label: "Frequency", unit: "Hz", type: "range", min: 20,  max: 20000, step: 1 },
    { key: "q",         label: "Q",                     type: "range", min: 0.1, max: 30,    step: 0.1 },
    { key: "gain",      label: "Gain",     unit: "dB",  type: "range", min: -40, max: 40,    step: 0.5 },
  ],
  build(ctx, params) {
    const filter = ctx.createBiquadFilter();
    filter.type = params.filterType ?? "lowpass";
    filter.frequency.setValueAtTime(params.frequency ?? 1000, ctx.currentTime);
    filter.Q.setValueAtTime(params.q ?? 1, ctx.currentTime);
    filter.gain.setValueAtTime(params.gain ?? 0, ctx.currentTime);
    return { input: filter, output: filter };
  },
};

const EFFECTS = {
  [delayEffect.id]: delayEffect,
  [distortionEffect.id]: distortionEffect,
  [compressorEffect.id]: compressorEffect,
  [reverbEffect.id]: reverbEffect,
  [gainEffect.id]: gainEffect,
  [panEffect.id]: panEffect,
  [filterEffect.id]: filterEffect,
};

export const getEffect = (id) => EFFECTS[id] ?? null;
export const listEffects = () => Object.values(EFFECTS);
export const getEffectDefaults = (id) => ({ ...(getEffect(id)?.defaults ?? {}) });
