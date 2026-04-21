import getAudioContext from "@core/audio_context";

export default function playPoofSound() {
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
