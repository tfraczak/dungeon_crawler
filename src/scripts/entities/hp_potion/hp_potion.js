import createEntity from "../entity";
import GAME_CONFIG from "../../core/game_config";
import { playHpPotionSound, playHpPotionDrop } from "../../sounds";
import applyDropBehavior from "../../effects/drop";

let hpPotionIdCounter = 0;

// Health potion: mirrors the coin animation system (256x32 sheet of 8 frames
// x 32x32). The bottle chrome is static across all frames; only the bubbling
// liquid and outer sparkle/heal-cross VFX animate. Picking one up heals the
// player and never over-heals past GAME_CONFIG.player.hp.
function createHpPotion(pos, width, height, spritePalette, gameState) {
  const potion = createEntity(pos, width, height, spritePalette, { width, height });

  potion.id = `hp_potion_${hpPotionIdCounter++}`;
  potion.gameState = gameState;
  potion.frameInterval = GAME_CONFIG.hpPotion.frameInterval;
  potion.frameCount = 0;
  potion.drawOptions.palY = 0;

  applyDropBehavior(potion, playHpPotionDrop);

  potion.collect = () => {
    if (potion.dropping) return false;
    const player = potion.gameState.session.player;
    if (
      potion.collidedOnSide("top", player) ||
      potion.collidedOnSide("bottom", player) ||
      potion.collidedOnSide("left", player) ||
      potion.collidedOnSide("right", player)
    ) {
      playHpPotionSound();
      return true;
    }
    return false;
  };

  potion.animate = (room) => {
    if (potion.dropping) {
      potion.updateDrop(room);
      return;
    }

    const i = potion.frameInterval;
    const c = potion.frameCount;
    const w = potion.width;
    if (c < i) {
      potion.drawOptions.palX = w * 0;
    } else if (c < i * 2) {
      potion.drawOptions.palX = w * 1;
    } else if (c < i * 3) {
      potion.drawOptions.palX = w * 2;
    } else if (c < i * 4) {
      potion.drawOptions.palX = w * 3;
    } else if (c < i * 5) {
      potion.drawOptions.palX = w * 4;
    } else if (c < i * 6) {
      potion.drawOptions.palX = w * 5;
    } else if (c < i * 7) {
      potion.drawOptions.palX = w * 6;
    } else if (c < i * 8) {
      potion.drawOptions.palX = w * 7;
    } else {
      potion.drawOptions.palX = w * 0;
      potion.frameCount = 0;
      return;
    }
    potion.frameCount++;
  };

  return potion;
}

export default createHpPotion;
