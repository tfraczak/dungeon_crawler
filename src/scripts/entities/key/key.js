import createEntity from "@entities/entity";
import { playCoinDrop } from "@entities/coin/sound";
import playHpPotionSound from "@entities/hp_potion/sound";
import applyDropBehavior from "@effects/drop";
import * as GAME_CONFIG from "@core/game_config";

let keyIdCounter = 0;

function createKey(pos, gameState) {
  const key = createEntity(pos, 24, 24, gameState.sprites.key, { width: 20, height: 20 });
  key.id = `key_${keyIdCounter++}`;
  key.gameState = gameState;
  applyDropBehavior(key, playCoinDrop);

  key.draw = (ctx) => {
    const dz = key.dropping ? key.dropZ : 0;
    if (key.spritePalette?.complete) {
      ctx.drawImage(key.spritePalette, key.pos[0], key.pos[1] - dz, key.width, key.height);
    } else {
      ctx.fillStyle = "#ffd86b";
      ctx.fillRect(key.pos[0] + 4, key.pos[1] + 10 - dz, 16, 4);
      ctx.strokeRect(key.pos[0] + 3, key.pos[1] + 7 - dz, 8, 8);
    }
    key.colBox.centerOnEntity();
    key.colBox.draw(ctx);
  };

  key.collect = () => {
    if (key.dropping) return false;
    const player = key.gameState.session.player;
    // Player can only carry maxKeys at once. A key the player can't pick
    // up stays sitting in the room — they can come back for it after
    // spending a key on a chest, which keeps the cap meaningful instead
    // of just discarding the drop.
    const maxKeys = GAME_CONFIG.entities.key.maxKeys;
    if ((player.keyCount ?? 0) >= maxKeys) return false;
    if (
      key.collidedOnSide("top", player) ||
      key.collidedOnSide("bottom", player) ||
      key.collidedOnSide("left", player) ||
      key.collidedOnSide("right", player)
    ) {
      player.keyCount = (player.keyCount ?? 0) + 1;
      playHpPotionSound({ root: 620 });
      return true;
    }
    return false;
  };

  key.animate = (room) => {
    if (key.dropping) key.updateDrop(room);
  };

  return key;
}

export default createKey;
