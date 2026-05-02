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

const reverseAudioBuffer = (buffer) => {
  for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
    buffer.getChannelData(ch).reverse();
  }
  return buffer;
};

const clampUnit = (value, fallback = 0) => (
  Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : fallback
);

const clampPositive = (value, fallback, min = 0) => (
  Number.isFinite(value) ? Math.max(min, value) : fallback
);

const makeLfo = (ctx, rate, amount) => {
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.type = "sine";
  lfo.frequency.setValueAtTime(clampPositive(rate, 5, 0.01), ctx.currentTime);
  lfoGain.gain.setValueAtTime(amount, ctx.currentTime);
  lfo.connect(lfoGain);
  return {
    output: lfoGain,
    start: (when) => lfo.start(when),
    stop: (when) => lfo.stop(when),
  };
};

const buildModulatedDelay = (ctx, params, defaults) => {
  const input = ctx.createGain();
  const output = ctx.createGain();
  const delayTime = clampPositive(params.delayTime, defaults.delayTime, 0);
  const depth = clampPositive(params.depth, defaults.depth, 0) / 1000;
  const feedbackAmount = clampUnit(params.feedback, defaults.feedback);
  const mix = clampUnit(params.mix, defaults.mix);
  const delay = ctx.createDelay(Math.max(0.05, delayTime + depth + 0.02));
  const feedback = ctx.createGain();
  const wet = ctx.createGain();
  const dry = ctx.createGain();
  const lfo = makeLfo(ctx, params.rate ?? defaults.rate, depth);

  delay.delayTime.setValueAtTime(delayTime, ctx.currentTime);
  feedback.gain.setValueAtTime(feedbackAmount, ctx.currentTime);
  wet.gain.setValueAtTime(mix, ctx.currentTime);
  dry.gain.setValueAtTime(1 - mix, ctx.currentTime);
  lfo.output.connect(delay.delayTime);

  input.connect(dry).connect(output);
  input.connect(delay).connect(wet).connect(output);
  delay.connect(feedback).connect(delay);

  return {
    input,
    output,
    start: lfo.start,
    stop: lfo.stop,
  };
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
    if (params.reverseBuffer) return buildReverseDelay(ctx, params);

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

const buildReverseDelay = (ctx, params) => {
  const input = ctx.createGain();
  const output = ctx.createGain();
  const delayTime = Math.max(0, params.delayTime ?? 0.12);
  const feedback = clampUnit(params.feedback, 0.35);
  const mix = clampUnit(params.mix, 0.4);
  const tapCount = 4;
  const totalDelay = delayTime * tapCount;

  const dryDelay = ctx.createDelay(Math.max(1, totalDelay + 0.01));
  dryDelay.delayTime.setValueAtTime(totalDelay, ctx.currentTime);
  const dry = ctx.createGain();
  dry.gain.setValueAtTime(1 - mix, ctx.currentTime);
  input.connect(dryDelay).connect(dry).connect(output);

  for (let tapIdx = 0; tapIdx < tapCount; tapIdx++) {
    const tapDelay = ctx.createDelay(Math.max(1, totalDelay + 0.01));
    const tapGain = ctx.createGain();
    tapDelay.delayTime.setValueAtTime(delayTime * tapIdx, ctx.currentTime);
    tapGain.gain.setValueAtTime(mix * Math.pow(feedback, tapCount - 1 - tapIdx), ctx.currentTime);
    input.connect(tapDelay).connect(tapGain).connect(output);
  }

  return { input, output };
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
    const impulse = buildImpulseBuffer(ctx, params.duration ?? 1.5, params.decay ?? 2.5);
    conv.buffer = params.reverseBuffer ? reverseAudioBuffer(impulse) : impulse;
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
  defaults: {
    filterType: "lowpass",
    frequency: 1000,
    q: 1,
    gain: 0,
    sweepEnabled: false,
    frequencyEnd: 600,
    frequencySweep: "exponential",
  },
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
    { key: "sweepEnabled", label: "Sweep frequency", type: "checkbox" },
    { key: "frequencyEnd", label: "Frequency end", unit: "Hz", type: "range", min: 20, max: 20000, step: 1 },
    { key: "frequencySweep", label: "Sweep curve", type: "select", options: ["linear", "exponential"] },
  ],
  build(ctx, params) {
    const filter = ctx.createBiquadFilter();
    filter.type = params.filterType ?? "lowpass";
    filter.Q.setValueAtTime(params.q ?? 1, ctx.currentTime);
    filter.gain.setValueAtTime(params.gain ?? 0, ctx.currentTime);
    return {
      input: filter,
      output: filter,
      start: (when) => {
        const duration = Math.max(0.001, params.profileDuration ?? 0.04);
        const startFrequency = Math.max(20, params.frequency ?? 1000);
        const endFrequency = Math.max(20, params.frequencyEnd ?? startFrequency);
        filter.frequency.cancelScheduledValues(when);
        filter.frequency.setValueAtTime(startFrequency, when);
        if (params.sweepEnabled) {
          if (params.frequencySweep === "linear") {
            filter.frequency.linearRampToValueAtTime(endFrequency, when + duration);
          } else {
            filter.frequency.exponentialRampToValueAtTime(endFrequency, when + duration);
          }
        }
      },
    };
  },
};

const tremoloEffect = {
  id: "tremolo",
  label: "Tremolo",
  defaults: { rate: 8, depth: 0.5 },
  knobs: [
    { key: "rate",  label: "Rate",  unit: "Hz", type: "range", min: 0.1, max: 40, step: 0.1 },
    { key: "depth", label: "Depth",              type: "range", min: 0,   max: 1,  step: 0.01 },
  ],
  build(ctx, params) {
    const input = ctx.createGain();
    const output = ctx.createGain();
    const depth = clampUnit(params.depth, 0.5);
    const lfo = makeLfo(ctx, params.rate ?? 8, depth / 2);

    output.gain.setValueAtTime(1 - (depth / 2), ctx.currentTime);
    lfo.output.connect(output.gain);
    input.connect(output);

    return {
      input,
      output,
      start: lfo.start,
      stop: lfo.stop,
    };
  },
};

const chorusEffect = {
  id: "chorus",
  label: "Chorus",
  defaults: { delayTime: 0.022, depth: 8, rate: 1.6, feedback: 0.08, mix: 0.35 },
  knobs: [
    { key: "delayTime", label: "Delay time", unit: "s",  type: "range", min: 0.005, max: 0.06, step: 0.001 },
    { key: "depth",     label: "Depth",      unit: "ms", type: "range", min: 0,     max: 25,   step: 0.5 },
    { key: "rate",      label: "Rate",       unit: "Hz", type: "range", min: 0.1,   max: 12,   step: 0.1 },
    { key: "feedback",  label: "Feedback",               type: "range", min: 0,     max: 0.7,  step: 0.01 },
    { key: "mix",       label: "Mix",                    type: "range", min: 0,     max: 1,    step: 0.01 },
  ],
  build: (ctx, params) => buildModulatedDelay(ctx, params, chorusEffect.defaults),
};

const flangerEffect = {
  id: "flanger",
  label: "Flanger",
  defaults: { delayTime: 0.006, depth: 3, rate: 4, feedback: 0.45, mix: 0.45 },
  knobs: [
    { key: "delayTime", label: "Delay time", unit: "s",  type: "range", min: 0.001, max: 0.02, step: 0.001 },
    { key: "depth",     label: "Depth",      unit: "ms", type: "range", min: 0,     max: 10,   step: 0.25 },
    { key: "rate",      label: "Rate",       unit: "Hz", type: "range", min: 0.1,   max: 20,   step: 0.1 },
    { key: "feedback",  label: "Feedback",               type: "range", min: 0,     max: 0.9,  step: 0.01 },
    { key: "mix",       label: "Mix",                    type: "range", min: 0,     max: 1,    step: 0.01 },
  ],
  build: (ctx, params) => buildModulatedDelay(ctx, params, flangerEffect.defaults),
};

const ringModEffect = {
  id: "ring_mod",
  label: "Ring mod",
  defaults: { frequency: 120, mix: 0.5 },
  knobs: [
    { key: "frequency", label: "Frequency", unit: "Hz", type: "range", min: 1, max: 2000, step: 1 },
    { key: "mix",       label: "Mix",                   type: "range", min: 0, max: 1,    step: 0.01 },
  ],
  build(ctx, params) {
    const input = ctx.createGain();
    const output = ctx.createGain();
    const dry = ctx.createGain();
    const wet = ctx.createGain();
    const mix = clampUnit(params.mix, 0.5);
    const lfo = makeLfo(ctx, params.frequency ?? 120, mix);

    dry.gain.setValueAtTime(1 - mix, ctx.currentTime);
    wet.gain.setValueAtTime(0, ctx.currentTime);
    lfo.output.connect(wet.gain);
    input.connect(dry).connect(output);
    input.connect(wet).connect(output);

    return {
      input,
      output,
      start: lfo.start,
      stop: lfo.stop,
    };
  },
};

const bitcrusherEffect = {
  id: "bitcrusher",
  label: "Bitcrusher",
  defaults: { bits: 6, frequencyReduction: 0.18, mix: 1 },
  knobs: [
    { key: "bits",               label: "Bits",               type: "range", min: 1,    max: 16, step: 1 },
    { key: "frequencyReduction", label: "Frequency reduction", type: "range", min: 0.01, max: 1,  step: 0.01 },
    { key: "mix",                label: "Mix",                type: "range", min: 0,    max: 1,  step: 0.01 },
  ],
  build(ctx, params) {
    const input = ctx.createGain();
    const output = ctx.createGain();
    const dry = ctx.createGain();
    const wet = ctx.createGain();
    const crusher = ctx.createScriptProcessor(4096, 2, 2);
    const bits = Math.max(1, Math.min(16, Math.round(params.bits ?? 6)));
    const step = 2 ** (1 - bits);
    const reduction = clampUnit(params.frequencyReduction, 0.18);
    const mix = clampUnit(params.mix, 1);
    const phases = [0, 0];
    const held = [0, 0];

    dry.gain.setValueAtTime(1 - mix, ctx.currentTime);
    wet.gain.setValueAtTime(mix, ctx.currentTime);
    crusher.onaudioprocess = (event) => {
      for (let channel = 0; channel < event.outputBuffer.numberOfChannels; channel++) {
        const sourceChannel = Math.min(channel, event.inputBuffer.numberOfChannels - 1);
        const inputData = event.inputBuffer.getChannelData(sourceChannel);
        const outputData = event.outputBuffer.getChannelData(channel);
        for (let i = 0; i < outputData.length; i++) {
          phases[channel] += reduction;
          if (phases[channel] >= 1) {
            phases[channel] -= 1;
            held[channel] = step * Math.floor(inputData[i] / step + 0.5);
          }
          outputData[i] = held[channel];
        }
      }
    };

    input.connect(dry).connect(output);
    input.connect(crusher).connect(wet).connect(output);

    return { input, output };
  },
};

const limiterEffect = {
  id: "limiter",
  label: "Limiter",
  defaults: { threshold: -6, release: 0.08 },
  knobs: [
    { key: "threshold", label: "Threshold", unit: "dB", type: "range", min: -40, max: 0, step: 1 },
    { key: "release",   label: "Release",   unit: "s",  type: "range", min: 0,   max: 1, step: 0.001 },
  ],
  build(ctx, params) {
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.setValueAtTime(params.threshold ?? -6, ctx.currentTime);
    comp.knee.setValueAtTime(0, ctx.currentTime);
    comp.ratio.setValueAtTime(20, ctx.currentTime);
    comp.attack.setValueAtTime(0.001, ctx.currentTime);
    comp.release.setValueAtTime(params.release ?? 0.08, ctx.currentTime);
    return { input: comp, output: comp };
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
  [tremoloEffect.id]: tremoloEffect,
  [chorusEffect.id]: chorusEffect,
  [flangerEffect.id]: flangerEffect,
  [ringModEffect.id]: ringModEffect,
  [bitcrusherEffect.id]: bitcrusherEffect,
  [limiterEffect.id]: limiterEffect,
};

export const getEffect = (id) => EFFECTS[id] ?? null;
export const listEffects = () => Object.values(EFFECTS);
export const getEffectDefaults = (id) => ({ ...(getEffect(id)?.defaults ?? {}) });
