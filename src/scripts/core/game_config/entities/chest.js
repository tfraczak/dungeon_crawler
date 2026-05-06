// Treasure-chest spawn cadence.
//
// `chance` is the per-room-entry roll. `rerollMs` is how long the room must
// wait after a FAILED roll (or after a chest gets opened) before it's
// eligible to roll again. Successful rolls do NOT consume the timer — the
// chest stays in the room indefinitely until opened, and opening is what
// kicks off the next 5-minute cooldown.
export default Object.freeze({
  chance: 0.10,
  rerollMs: 5 * 60 * 1000,
});
