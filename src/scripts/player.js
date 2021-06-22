import Entity from "./entity";
import * as Global from "./utils/global_vars";
import { roomChange } from "./utils/func_utils";

class Player extends Entity {
  constructor(pos,width,height,spritePalette) {
    super(pos,width,height,spritePalette);
    this.speed = 1.25;
    this.normalizedSpeed = parseFloat(this.speed) / Math.sqrt(2);
    this.pace = 24/this.speed;
    this.speedModifier = 1;
    this.stamina = 1000;
    this.invulnerable = 0;
    this.hp = 20;
    this.stride = {
      up: {
        stepCount: 0,
        palY: 48 * 6,
      },
      down: {
        stepCount: 0,
        palY: 48 * 0,
      },
      left: {
        stepCount: 0,
        palY: 48 * 2,
      },
      right: {
        stepCount: 0,
        palY: 48 * 4,
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

  wallCheck(walls) {
      for(let wall of walls) { if (this.collidedOnSide("top", wall)) break }
      if (this.collisions.top) {
        this.pos[1] = this.collisions.top - 32;
      }

      for(let wall of walls) { if (this.collidedOnSide("bottom", wall)) break }
      if (this.collisions.bottom) {
        this.pos[1] = this.collisions.bottom - 48;
      }

      for(let wall of walls) { if (this.collidedOnSide("left", wall)) break }
      if (this.collisions.left) {
        this.pos[0] = this.collisions.left - 12;
      }

      for(let wall of walls) { if (this.collidedOnSide("right", wall)) break }
      if (this.collisions.right) {
        this.pos[0] = this.collisions.right - 36;
      }

  }

  hit() {
    this.invulnerable = 75;
  }

  move(walls) {
    const [
      up,
      down,
      left,
      right,
      shift
    ] = [
      Global.KEYS["w"],
      Global.KEYS["s"],
      Global.KEYS["a"],
      Global.KEYS["d"],
      Global.KEYS["Shift"],
    ];
    if (shift && this.stamina > 0) {
      this.speedModifier = 1.5;
      this.stamina -= 4;
    } else {
      this.speedModifier = 1;
    }

    if (this.stamina < 0) this.stamina = 0;
    if (!shift && this.stamina < 1000) this.stamina += 1;
    if (this.invulnerable) this.invulnerable--;
    if (this.invulverable < 0) this.invulnerable = 0;

    this.wallCheck(walls);

    // W key movements and sprite direction
    if (up) {
      if (left || right && !this.collisions.top) {
        this.pos[1] += -this.normalizedSpeed * this.speedModifier;
      } else {
        this.pos[1] += -this.speed * this.speedModifier;
      }
      this.drawOptions.palY = this.stride.up.palY;
      if (!left && !right) {
        this.drawOptions.palX = this.stridePalettePos("up");
      }
    }

    // S key movements and sprite direction
    if (down) {
      if (left || right) {
        this.pos[1] += this.normalizedSpeed * this.speedModifier;
      } else {
        this.pos[1] += this.speed * this.speedModifier;
      }
      this.drawOptions.palY = this.stride.down.palY;
      if (!left && !right) {
        this.drawOptions.palX = this.stridePalettePos("down");
      }
    }

    // A key movement
    if (left) {
      if (up || down && !this.collisions.left) {
        this.pos[0] += -this.normalizedSpeed * this.speedModifier;
      } else {
        this.pos[0] += -this.speed * this.speedModifier;
      }
      this.drawOptions.palY = this.stride.left.palY;
      this.drawOptions.palX = this.stridePalettePos("left");
    }

    // D key movement
    if (right) {
      if (up || down) {
        this.pos[0] += this.normalizedSpeed * this.speedModifier;
      } else {
        this.pos[0] += this.speed * this.speedModifier;
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