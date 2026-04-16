import createEntity from "../entity";
import GAME_CONFIG from "../../core/game_config";
import { playCoinSound, playCoinDrop } from "../../sounds";
import applyDropBehavior from "../../effects/drop";

let coinIdCounter = 0;

function createCoin(pos, width, height, spritePalette, gameState) {
  const coin = createEntity(pos, width, height, spritePalette, { width, height });

  coin.id = `coin_${coinIdCounter++}`;
  coin.gameState = gameState;
  coin.frameInterval = GAME_CONFIG.coin.frameInterval;
  coin.frameCount = 0;
  coin.drawOptions.palY = 0;

  applyDropBehavior(coin, playCoinDrop);

  coin.collect = () => {
    if (coin.dropping) return false;
    const player = coin.gameState.session.player;
    if (
      coin.collidedOnSide("top", player) ||
      coin.collidedOnSide("bottom", player) ||
      coin.collidedOnSide("left", player) ||
      coin.collidedOnSide("right", player)
    ) {
      playCoinSound();
      return true;
    }
    return false;
  };

  coin.animate = (room) => {
    if (coin.dropping) {
      coin.updateDrop(room);
      return;
    }

    const i = coin.frameInterval;
    const c = coin.frameCount;
    const w = coin.width;
    if (c < i) {
      coin.drawOptions.palX = w * 0;
    } else if (c < i * 2) {
      coin.drawOptions.palX = w * 1;
    } else if (c < i * 3) {
      coin.drawOptions.palX = w * 2;
    } else if (c < i * 4) {
      coin.drawOptions.palX = w * 3;
    } else if (c < i * 5) {
      coin.drawOptions.palX = w * 4;
    } else if (c < i * 6) {
      coin.drawOptions.palX = w * 5;
    } else if (c < i * 7) {
      coin.drawOptions.palX = w * 6;
    } else if (c < i * 8) {
      coin.drawOptions.palX = w * 7;
    } else {
      coin.drawOptions.palX = w * 0;
      coin.frameCount = 0;
      return;
    }
    coin.frameCount++;
  };

  return coin;
}

export default createCoin;
