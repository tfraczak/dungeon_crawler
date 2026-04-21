import createEntity from "@entities/entity";
import * as GAME_CONFIG from "@core/game_config";

let ladderIdCounter = 0;

// Win-condition ladder. Static art (no frames, no per-tick particles) with a
// generous collision box that fills the lower bulk of the sprite so the
// player just needs to walk into it to trigger the climb. The climb
// cinematic itself lives in game.js -- the entity only signals "the player
// is touching me" via `triggerClimb()` and lets the room/game owner kick off
// the win sequence.
function createLadder(pos, gameState) {
  const w = GAME_CONFIG.entities.ladder.width;
  const h = GAME_CONFIG.entities.ladder.height;
  // Collision box covers the entire ladder body (full width + height). The
  // ladder always spawns flush against the top wall, which means the player
  // collides into that wall and only the BOTTOM of his collision box can
  // ever overlap the ladder; matching the colBox to the full ladder rect
  // gives us comfortable overlap so the climb triggers reliably.
  const ladder = createEntity(pos, w, h, gameState.sprites.ladder, { width: w, height: h });

  ladder.id = `ladder_${ladderIdCounter++}`;
  ladder.gameState = gameState;
  ladder.drawOptions.palX = 0;
  ladder.drawOptions.palY = 0;

  ladder.draw = (ctx) => {
    ctx.drawImage(...Object.values(ladder.drawOptions));
    ladder.colBox.centerOnEntity();
    ladder.colBox.draw(ctx);
  };

  // Returns true if the player's collision box overlaps the ladder's. Used
  // by room.collect() to start the climb cinematic once.
  ladder.checkPlayerOverlap = (player) => {
    const a = ladder.colBox;
    const b = player.colBox;
    const overlapX = Math.min(a.pos[0] + a.width,  b.pos[0] + b.width)  - Math.max(a.pos[0], b.pos[0]);
    const overlapY = Math.min(a.pos[1] + a.height, b.pos[1] + b.height) - Math.max(a.pos[1], b.pos[1]);
    return overlapX > 0 && overlapY > 0;
  };

  return ladder;
}

export default createLadder;
