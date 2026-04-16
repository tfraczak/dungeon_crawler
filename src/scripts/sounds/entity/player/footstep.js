import getAudioContext from "../../audio_context";

// Gravel footstep — gritty scrape with a subtle low thud
export default function playFootstep(sprinting = false) {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const duration = sprinting ? 0.14 : 0.18;
  const volume = sprinting ? 0.12 : 0.05;

  // Noise scrape layer — longer tail, higher frequency for grit
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    const t = i / length;
    const envelope = Math.pow(1 - t, 2);
    data[i] = (Math.random() * 2 - 1) * envelope;
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  const baseFreq = 300 + Math.random() * 100;
  noiseFilter.frequency.setValueAtTime(sprinting ? baseFreq * 1.2 : baseFreq, now);
  noiseFilter.Q.value = 0.4;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(volume, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noiseSource.start(now);

  // Subtle low thud for weight
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(55 + Math.random() * 15, now);
  osc.frequency.exponentialRampToValueAtTime(30, now + 0.05);
  oscGain.gain.setValueAtTime(volume * 0.3, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.06);
}
