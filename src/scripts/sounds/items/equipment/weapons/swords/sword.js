import getAudioContext from "../../../../audio_context";

// Quick whoosh — high-passed noise sweep for a miss
export function playSlashWhiff() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const duration = 0.12;
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const t = i / length;
    const envelope = Math.sin(t * Math.PI) * 0.2;
    data[i] = (Math.random() * 2 - 1) * envelope;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.linearRampToValueAtTime(3000, now + duration);

  source.connect(filter);
  filter.connect(ctx.destination);
  source.start();
}

// Ripping slash — jagged stuttered noise simulating tearing
export function playSlashHit() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const duration = 0.22;
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  const rippleFreq = 300;
  for (let i = 0; i < length; i++) {
    const t = i / length;
    const decay = Math.pow(1 - t, 1.2);
    const stutter = 0.4 + 0.6 * Math.abs(Math.sin(2 * Math.PI * rippleFreq * t));
    const raw = Math.random() * 2 - 1;
    const clipped = Math.max(-0.5, Math.min(0.5, raw * 2));
    data[i] = clipped * decay * stutter * 0.4;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(900, now);
  filter.frequency.exponentialRampToValueAtTime(300, now + duration);
  filter.Q.value = 0.8;

  source.connect(filter);
  filter.connect(ctx.destination);
  source.start(now);
}
