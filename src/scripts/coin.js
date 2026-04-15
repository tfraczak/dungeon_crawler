import createEntity from "./entity";
import { randCoinSound } from "./utils/func_utils";

function createCoin(pos, width, height, spritePalette, gameState) {
  const coin = createEntity(pos, width, height, spritePalette, { width, height });

  coin.gameState = gameState;
  coin.frameInterval = 12;
  coin.frameCount = 0;
  coin.drawOptions.palY = 0;

  coin.collect = () => {
    const player = coin.gameState.session.player;
    if (
      coin.collidedOnSide("top", player) ||
      coin.collidedOnSide("bottom", player) ||
      coin.collidedOnSide("left", player) ||
      coin.collidedOnSide("right", player)
    ) {
      randCoinSound().play();
      return true;
    }
    return false;
  };

  coin.animate = () => {
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
