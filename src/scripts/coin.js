import Entity from "./entity";
import { randCoinSound } from "./utils/func_utils";
import * as Global from "./utils/global_vars";

class Coin extends Entity {
  constructor(pos, width, height, spritePalette) {
    super(pos, width, height, spritePalette, { width, height });
    this.frameInterval = 12;
    this.frameCount = 0;
    this.drawOptions.palY = 0;
  }

  collect() {
    if (
      this.collidedOnSide("top", Global.SESSION.game.player) ||
      this.collidedOnSide("bottom", Global.SESSION.game.player) ||
      this.collidedOnSide("left", Global.SESSION.game.player) ||
      this.collidedOnSide("right", Global.SESSION.game.player)
    ) {
      randCoinSound().play();
      return true;
    }
    return false;
  }

  animate() {
    const i = this.frameInterval;
    const c = this.frameCount;
    const w = this.width;
    if (c < i) {
      this.drawOptions.palX = w * 0;
      this.frameCount++;
    } else if (c < i*2) {
      this.drawOptions.palX = w * 1;
      this.frameCount++;
    } else if (c < i*3) {
      this.drawOptions.palX = w * 2;
      this.frameCount++;
    } else if (c < i*4) {
      this.drawOptions.palX = w * 3;
      this.frameCount++;
    } else if (c < i*5) {
      this.drawOptions.palX = w * 4;
      this.frameCount++;
    } else if (c < i*6) {
      this.drawOptions.palX = w * 5;
      this.frameCount++;
    } else if (c < i*7) {
      this.drawOptions.palX = w * 6;
      this.frameCount++;
    } else if (c < i*8) {
      this.drawOptions.palX = w * 7;
      this.frameCount++;
    } else {
      this.drawOptions.palX = w * 0;
      this.frameCount = 0;
    }
  }
}

export default Coin;