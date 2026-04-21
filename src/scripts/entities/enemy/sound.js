import getAudioContext from "@core/audio_context";

// Enemy poof -- lowpass-swept noise burst plus a short low thump for the
// kill confirmation feel. Played when an enemy dies / is dispelled.
export const POOF_PARAMS = Object.freeze({
  duration: 0.25,
  noiseGain: 0.25,
  filterStartFreq: 600,
  filterEndFreq: 150,
  thumpStartFreq: 80,
  thumpEndFreq: 30,
  thumpGain: 0.2,
  thumpDuration: 0.15,
});

export default function playPoofSound(overrides = {}) {
  const params = { ...POOF_PARAMS, ...overrides };
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * params.duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    const t = i / length;
    const envelope = Math.sin(t * Math.PI) * (1 - t * 0.5);
    data[i] = (Math.random() * 2 - 1) * envelope * params.noiseGain;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(params.filterStartFreq, now);
  filter.frequency.exponentialRampToValueAtTime(params.filterEndFreq, now + params.duration);

  source.connect(filter);
  filter.connect(ctx.destination);
  source.start();

  // Soft low thump for body.
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(params.thumpStartFreq, now);
  osc.frequency.exponentialRampToValueAtTime(params.thumpEndFreq, now + params.thumpDuration);
  oscGain.gain.setValueAtTime(params.thumpGain, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + params.thumpDuration);
  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + params.thumpDuration);
}
