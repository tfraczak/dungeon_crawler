import ColBox from "./collision_box";
import { collidedWithSide } from "./utils/func_utils";

class Entity {
  constructor(pos,width,height,spritePalette) {
    this.pos = pos;
    this.width = width;
    this.height = height;
    const colBoxWidth = width/2;
    const colBoxHeight = height/3;
    
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

export default Entity;