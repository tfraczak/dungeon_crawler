import Entity from "./entity";
import * as Global from "./utils/global_vars";
import { roomChange } from "./utils/func_utils";

class Player extends Entity {
  constructor(pos,width,height,spritePalette) {
    
    super(pos,width,height,spritePalette);
    this.speed = 2;
    this.normalizedSpeed = parseFloat(this.speed) / Math.sqrt(2);
    this.pace = 24/this.speed;
    this.speedModifier = 1;
    this.stride = {
      up: {
        stepCount: 0,
        palY: 48 * 3,
      },
      down: {
        stepCount: 0,
        palY: 48 * 0,
      },
      left: {
        stepCount: 0,
        palY: 48 * 1,
      },
      right: {
        stepCount: 0,
        palY: 48 * 2,
      },
    };
  }

  newRoomPos(dir) {
    switch(dir) {
      case "up":
        this.pos[1] = 720-24;
        break;
      case "down":
        this.pos[1] = -24;
        break;
      case "left":
        this.pos[0] = 720-24;
        break;
      case "right":
        this.pos[0] = -24;
        break;
    }
  }

  stridePalettePos(direction) {
    this.pace = 24 / (this.speed * this.speedModifier);
    if (this.stride[direction].stepCount <= this.pace) {
      this.stride[direction].stepCount++;
      return 48 * 1;
    } else if (this.stride[direction].stepCount <= 2 * this.pace) {
      this.stride[direction].stepCount++;
      return 48 * 0;
    } else if (this.stride[direction].stepCount <= 3 * this.pace) {
      this.stride[direction].stepCount++;
      return 48 * 1;
    } else if (this.stride[direction].stepCount <= 4 * this.pace) {
      this.stride[direction].stepCount++;
      return 48 * 2;
    } else if (this.stride[direction].stepCount > 4 * this.pace) {
      this.stride[direction].stepCount = 0;
      return 48 * 1;
    }
  }

  move(OBJECTS) {
    const [
      up,
      down,
      left,
      right,
      shift
    ] = [
      Global.KEYS[87],
      Global.KEYS[83],
      Global.KEYS[65],
      Global.KEYS[68],
      Global.KEYS[16],
    ];
    if (shift) {
      this.speedModifier = 2;
    } else {
      this.speedModifier = 1;
    }

    // W key movements and sprite direction
    if (up) {
      if (left || right) {
        this.colBox.pos[1] += -this.normalizedSpeed * this.speedModifier;
      } else {
        this.colBox.pos[1] += -this.speed * this.speedModifier;
      }
      this.updateSides();
      for(let OBJECT of OBJECTS) { if (this.collidedOnSide("top", OBJECT)) break }
      if (this.collisions.top) {
        this.pos[1] = this.collisions.top - (this.height-this.colBox.height);
      } else {
        if (left || right && !this.collisions.top) {
          this.pos[1] += -this.normalizedSpeed * this.speedModifier;
          this.updateSides();
        } else {
          this.pos[1] += -this.speed * this.speedModifier;
          this.updateSides();
        }
      }
      this.drawOptions.palY = this.stride.up.palY;
      this.drawOptions.palX = this.stridePalettePos("up");
    }

    // S key movements and sprite direction
    if (down) {
      if (left || right) {
        this.colBox.pos[1] += this.normalizedSpeed * this.speedModifier;
      } else {
        this.colBox.pos[1] += this.speed * this.speedModifier;
      }
      this.updateSides();
      for(let OBJECT of OBJECTS) { if (this.collidedOnSide("bottom", OBJECT)) break }
      if (this.collisions.bottom) {
        this.colBox.pos[1] = this.collisions.bottom;
        this.pos[1] = this.collisions.bottom-48;
      } else {
        if (left || right) {
          this.pos[1] += this.normalizedSpeed * this.speedModifier;
          this.updateSides();
        } else {
          this.pos[1] += this.speed * this.speedModifier;
          this.updateSides();
        }
      }
      this.drawOptions.palY = this.stride.down.palY;
      this.drawOptions.palX = this.stridePalettePos("down");
    }

    // A key movement
    if (left) {
      if (up || down) {
        this.colBox.pos[0] += -this.normalizedSpeed * this.speedModifier;
      } else {
        this.colBox.pos[0] += -this.speed * this.speedModifier;
      }
      this.updateSides();
      for(let OBJECT of OBJECTS) { if (this.collidedOnSide("left", OBJECT)) break }
      if (this.collisions.left) {
        this.colBox.pos[0] = this.collisions.left;
      } else {
        if (up || down && !this.collisions.left) {
          this.pos[0] += -this.normalizedSpeed * this.speedModifier;

        } else {
          this.pos[0] += -this.speed * this.speedModifier;

        }
      }
      this.drawOptions.palY = this.stride.left.palY;
      this.drawOptions.palX = this.stridePalettePos("left");
    }

    // D key movement
    if (right) {
      if (up || down) {
        this.colBox.pos[0] += this.normalizedSpeed * this.speedModifier;
      } else {
        this.colBox.pos[0] += this.speed * this.speedModifier;
      }
      this.updateSides();
      for(let OBJECT of OBJECTS) { if (this.collidedOnSide("right", OBJECT)) break }
      if (this.collisions.right) {
        this.colBox.pos[0] = this.collisions.right;
        this.pos[0] = this.collisions.right-(this.colBox.width + this.colBox.width/2);
      } else {
        if (up || down) {
          this.pos[0] += this.normalizedSpeed * this.speedModifier;
          this.updateSides();
        } else {
          this.pos[0] += this.speed * this.speedModifier;
          this.updateSides();
        }
      }
      this.drawOptions.palY = this.stride.right.palY;
      this.drawOptions.palX = this.stridePalettePos("right");
    }

    // if none of the keys are being pressed, go to default stance
    if (!up && !down && !right && !left) {
      this.drawOptions.palX = 48 * 1;
    }

    const [x,y] = this.pos;
    let exitDir;
    if (x < -24) {
      exitDir = "left";
      this.newRoomPos(exitDir);
      roomChange(exitDir, Global.SESSION.game.room);
    } else if (x > 720-24) {
      exitDir = "right";
      this.newRoomPos(exitDir);
      roomChange(exitDir, Global.SESSION.game.room);
    } else if (y < -24) {
      exitDir = "up";
      this.newRoomPos(exitDir);
      roomChange(exitDir, Global.SESSION.game.room);
    } else if (y > 720-24) {
      exitDir = "down";
      this.newRoomPos(exitDir);
      roomChange(exitDir, Global.SESSION.game.room);
    }

    this.updateSides();
    this.drawOptions.x = this.pos[0];
    this.drawOptions.y = this.pos[1];
  }

}

export default Player;