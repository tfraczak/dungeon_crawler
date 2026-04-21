import getAudioContext from "@core/audio_context";

// Slash whiff -- highpass noise sweep for a swing that misses.
export const SLASH_WHIFF_PARAMS = Object.freeze({
  duration: 0.12,
  gain: 0.2,
  filterStartFreq: 800,
  filterEndFreq: 3000,
});

// Slash hit -- jagged stuttered bandpass-filtered noise simulating tearing
// when the sword connects.
export const SLASH_HIT_PARAMS = Object.freeze({
  duration: 0.22,
  rippleFreq: 300,
  decayPow: 1.2,
  gain: 0.4,
  filterStartFreq: 900,
  filterEndFreq: 300,
  q: 0.8,
});

export function playSlashWhiff(overrides = {}) {
  const params = { ...SLASH_WHIFF_PARAMS, ...overrides };
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * params.duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const t = i / length;
    const envelope = Math.sin(t * Math.PI) * params.gain;
    data[i] = (Math.random() * 2 - 1) * envelope;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.setValueAtTime(params.filterStartFreq, now);
  filter.frequency.linearRampToValueAtTime(params.filterEndFreq, now + params.duration);

  source.connect(filter);
  filter.connect(ctx.destination);
  source.start();
}

export function playSlashHit(overrides = {}) {
  const params = { ...SLASH_HIT_PARAMS, ...overrides };
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * params.duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const t = i / length;
    const decay = Math.pow(1 - t, params.decayPow);
    const stutter = 0.4 + 0.6 * Math.abs(Math.sin(2 * Math.PI * params.rippleFreq * t));
    const raw = Math.random() * 2 - 1;
    const clipped = Math.max(-0.5, Math.min(0.5, raw * 2));
    data[i] = clipped * decay * stutter * params.gain;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(params.filterStartFreq, now);
  filter.frequency.exponentialRampToValueAtTime(params.filterEndFreq, now + params.duration);
  filter.Q.value = params.q;

  source.connect(filter);
  filter.connect(ctx.destination);
  source.start(now);
}
