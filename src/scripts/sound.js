let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playPoofSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const duration = 0.25;
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const t = i / length;
    const envelope = Math.sin(t * Math.PI) * (1 - t * 0.5);
    data[i] = (Math.random() * 2 - 1) * envelope * 0.25;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(600, now);
  filter.frequency.exponentialRampToValueAtTime(150, now + duration);

  source.connect(filter);
  filter.connect(ctx.destination);
  source.start();

  // Soft low thump for body
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(80, now);
  osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);
  oscGain.gain.setValueAtTime(0.2, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.15);
}

// Quick whoosh — high-passed noise sweep for a miss
function playSlashWhiff() {
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
function playSlashHit() {
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
    // Rapid amplitude stutter to create a ripping/tearing grain
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

// Coin pickup — randomized metallic ping
function playCoinSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const baseFreq = 2000 + Math.random() * 1500;
  const detune = (Math.random() - 0.5) * 200;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = baseFreq;
  osc.detune.value = detune;
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.4);

  // Harmonic overtone for metallic ring
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.value = baseFreq * (2.5 + Math.random() * 0.5);
  gain2.gain.setValueAtTime(0.05, now);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now);
  osc2.stop(now + 0.3);
}

export { playPoofSound, playSlashWhiff, playSlashHit, playCoinSound };
