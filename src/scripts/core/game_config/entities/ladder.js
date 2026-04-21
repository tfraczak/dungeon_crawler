// Win-condition ladder. Once the player has hit `game.winCoinCount`, every
// newly-entered room rolls (exactly once) for a ladder spawn at `chance`.
// Climbing the ladder triggers a multi-stage win cinematic, in order:
//   1. climbDuration       -- player ascends the ladder, sprite walking up
//   2. fadeDuration        -- canvas alpha-fades to white
//   3. sceneHoldDuration   -- full white "blink" before the reveal starts
//   4. sceneFadeDuration   -- the "out of the cave" scene image fades in
//                             over the white (cover-fit to the canvas)
//   5. textFadeDuration    -- the win text + restart prompt fade in over
//                             a translucent dark panel for legibility
// After (5) completes the game halts and the final frame is held until
// the player restarts.
export default Object.freeze({
  chance: 0.08,
  climbDuration: 1400,
  fadeDuration: 700,
  height: 64,
  sceneFadeDuration: 700,
  sceneHoldDuration: 250,
  textFadeDuration: 600,
  width: 48,
});
