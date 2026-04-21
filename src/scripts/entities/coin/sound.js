import getAudioContext from "@core/audio_context";

// Coin drop — soft metallic tink when a coin lands
export function playCoinDrop() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const duration = 0.1;
  const baseFreq = 800 + Math.random() * 400;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = baseFreq;
  osc.detune.value = (Math.random() - 0.5) * 100;
  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration);
}

// Coin pickup — randomized metallic ping
export default function playCoinSound() {
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
