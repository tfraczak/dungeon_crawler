import getAudioContext from "../audio_context";

// HP potion drop -- muted glassy thunk when a bottle lands. A softer, lower
// analog of playCoinDrop so dropped potions read as a different pickup class
// by ear alone.
export function playHpPotionDrop() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const duration = 0.12;
  const baseFreq = 260 + Math.random() * 120;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = baseFreq;
  osc.detune.value = (Math.random() - 0.5) * 60;
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration);
}

// HP potion pickup -- warm ascending 3-note chime (I-III-V) on a sine wave
// with a gentle bell harmonic. Intentionally distinct from the metallic
// coin ping so the player can hear the heal without looking at the HUD.
export default function playHpPotionSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const root = 520;
  const steps = [1, 1.26, 1.5];
  const noteDur = 0.12;

  steps.forEach((mult, idx) => {
    const start = now + idx * 0.07;
    const freq = root * mult;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.1, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, start + noteDur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + noteDur);

    const bell = ctx.createOscillator();
    const bellGain = ctx.createGain();
    bell.type = "sine";
    bell.frequency.value = freq * 3.2;
    bellGain.gain.setValueAtTime(0, start);
    bellGain.gain.linearRampToValueAtTime(0.035, start + 0.005);
    bellGain.gain.exponentialRampToValueAtTime(0.001, start + noteDur * 0.8);
    bell.connect(bellGain);
    bellGain.connect(ctx.destination);
    bell.start(start);
    bell.stop(start + noteDur);
  });
}
