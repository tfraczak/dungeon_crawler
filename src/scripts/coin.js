import ColBox from "./collision_box";
import { collidedWithSide, randCoinSound } from "./utils/func_utils";
import * as Global from "./utils/global_vars";
// import Entity from "./entity";

class Entity {
  constructor(pos,width,height,spritePalette) {
    this.pos = pos;
    this.width = width;
    this.height = height;
    const colBoxWidth = width;
    const colBoxHeight = height;
    
    this.spritePalette = spritePalette;
    this.drawOptions = {
      image: spritePalette,
      palX: 0,
      palY: 0,
      _sWidth: width,
      _sHeight: height,
      x: pos[0],
      y: pos[1],
      _dWidth: width,
      _dHeight: height,
    };
    this.colBox = new ColBox(this,colBoxWidth,colBoxHeight);
    this.top = this.colBox.top;
    this.bottom = this.colBox.bottom;
    this.left = this.colBox.left;
    this.right = this.colBox.right;
    this.collisions = {
      top: false,
      bottom: false,
      left: false,
      right: false,
    };
    
  }

  colBoxHook() { // this will center the colBox on the bottom
    let [x,y] = [this.pos[0],this.pos[1]];
    let [cx,cy] = [
      x+((this.width - this.colBox.width)/2),
      y+(this.height - this.colBox.height),
    ];
    return [cx,cy];
  }

  updateSides() {
    this.colBox.updateSides();
    this.top = this.colBox.top;
    this.bottom = this.colBox.bottom;
    this.left = this.colBox.left;
    this.right = this.colBox.right;
  }

  collidedOnSide(side, otherObject) {
    let otherSide;
    switch(side) {
      case "top":
        otherSide = "bottom";
        break;
      case "bottom":
        otherSide = "top";
        break;
      case "left":
        otherSide = "right";
        break;
      case "right":
        otherSide = "left";
        break;
      default:
        otherSide = null;
        break;
    }
    this.collisions[side] = collidedWithSide(side, this[side], otherObject[otherSide]);
    return this.collisions[side];
  }

  draw(ctx) {
    ctx.drawImage(...Object.values(this.drawOptions));
    this.colBox.centerOnEntity();
    this.colBox.draw(ctx);
  }
}

class Coin extends Entity {
  constructor(pos, width, height, spritePalette) {
    super(pos, width, height, spritePalette);
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