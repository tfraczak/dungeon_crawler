// import Entity from "./entity";
import ColBox from './collision_box';
import {
  normalizedMovement,
  collidedWithSide,
} from "./utils/func_utils";
import * as Global from "./utils/global_vars";

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
    this.center = this.colBox.center;
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
    this.center = this.colBox.center;
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

class Enemy extends Entity {
  constructor(pos,width,height,spritePalette, type, detectDist) {
    super(pos,width,height,spritePalette);
    this.speed = 1;
    this.speedModifier = 0.75;
    this.pace = 24/this.speed;
    this.chasingPlayer = false;
    this.detectDist = detectDist;
    this.idleCount = 0;
    this.idleMax = 60;
    this.type = type;
    this.movement = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    let x, y;
    switch(type) {
      case "blob":
        x = 48 * 3;
        y = 48 * 0;
        break;
      case "bat":
        x = 48 * 0;
        y = 48 * 0;
        break;
      case "ghost":
        x = 48 * 6;
        y = 48 * 4;
        break;
    }
    this.palXOffset = x;
    this.stride = {
      up: {
        stepCount: 0,
        palY: (48 * 3) + y,
      },
      down: {
        stepCount: 0,
        palY: (48 * 0) + y,
      },
      left: {
        stepCount: 0,
        palY: (48 * 1) + y,
      },
      right: {
        stepCount: 0,
        palY: (48 * 2) + y,
      },
    };
  }

  stridePalettePos(direction) {
    this.pace = 24 / (this.speed * this.speedModifier);
    if (this.stride[direction].stepCount <= this.pace) {
      this.stride[direction].stepCount++;
      return (48 * 1) + this.palXOffset;
    } else if (this.stride[direction].stepCount <= 2 * this.pace) {
      this.stride[direction].stepCount++;
      return (48 * 0) + this.palXOffset;
    } else if (this.stride[direction].stepCount <= 3 * this.pace) {
      this.stride[direction].stepCount++;
      return (48 * 1) + this.palXOffset;
    } else if (this.stride[direction].stepCount <= 4 * this.pace) {
      this.stride[direction].stepCount++;
      return (48 * 2) + this.palXOffset;
    } else if (this.stride[direction].stepCount > 4 * this.pace) {
      this.stride[direction].stepCount = 0;
      return (48 * 1) + this.palXOffset;
    }
  }

  distToPlayer() {
    const mx = this.center[0];
    const my = this.center[1];
    const ex = Global.SESSION.player.center[0];
    const ey = Global.SESSION.player.center[1];
    let dx = mx - ex;
    let dy = my - ey;
    const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    return dist;
  }

  normalizedVectorPos() {
    const mx = this.center[0];
    const my = this.center[1];
    const ex = Global.SESSION.player.center[0];
    const ey = Global.SESSION.player.center[1];
    let dx = mx - ex;
    let dy = my - ey;

    if (!this.chasingPlayer && !this.idleCount) {
      const randAngle = Math.random() * 2 * Math.PI;
      this.dx = Math.cos(randAngle) * this.speed * this.speedModifier;
      this.dy = Math.sin(randAngle) * this.speed * this.speedModifier;
      this.idleCount = 1;
    }
    
    if (!this.chasingPlayer && this.idleCount) this.idleCount++;
    
    if (this.chasingPlayer) {
      this.dx = dx;
      this.dy = dy;
    }


    if(this.idleCount >= this.idleMax) this.idleCount = 0;

    this.angle = Math.atan(this.dy/this.dx);
    const ny = Math.sin(this.angle) * this.speed * this.speedModifier;
    const nx = Math.cos(this.angle) * this.speed * this.speedModifier;
    if (this.dy > 0) {
      this.movement["up"] = true;
      this.movement["down"] = false;
      if (Math.abs(this.dy) > Math.abs(this.dx)) this.spriteDir = "up";
    }
    
    if (this.dy < 0) {
      this.movement["down"] = true;
      this.movement["up"] = false;
      if (Math.abs(this.dy) > Math.abs(this.dx)) this.spriteDir = "down";
    }
    
    if (this.dx > 0) {
      this.movement["left"] = true;
      this.movement["right"] = false;
      if (Math.abs(this.dx) > Math.abs(this.dy)) this.spriteDir = "left";
    }
    
    if (this.dx < 0) {
      this.movement["right"] = true;
      this.movement["left"] = false;
      if (Math.abs(this.dx) > Math.abs(this.dy)) this.spriteDir = "right";
    }

    return [nx,ny];
  }

  damage() {
    return Math.floor((Math.random()*4)+1);
  }

  hitPlayer(walls) {

    const player = Global.SESSION.player;

    if (this.distToPlayer() < 32 && !Global.SESSION.player.invulnerable) {
      player.pos[0] -= (0.4 * this.dx);
      player.pos[1] -= (0.4 * this.dy);
      player.updateSides();
      player.wallCheck(walls);
      player.updateSides();
      player.hp -= this.damage();
      if (player.hp < 0) player.hp = 0;
      player.hit();
    }

  }

  wallCheck(walls) {
    const {
      up,
      down,
      left,
      right
    } = this.movement;

    if (up) {
      for(let wall of walls) { if (this.collidedOnSide("top", wall)) break; }
      if (this.collisions.top) {
        this.pos[1] = this.collisions.top - (this.height-this.colBox.height);
      }
    }

    if (down) {
      for(let wall of walls) { if (this.collidedOnSide("bottom", wall)) break; }
      if (this.collisions.bottom) {
        this.pos[1] = this.collisions.bottom - 48;
      }
    }

    if (left) {
      for(let wall of walls) { if (this.collidedOnSide("left", wall)) break; }
      if (this.collisions.left) {
        this.pos[0] = this.collisions.left - (this.colBox.width/2);
      }
    }

    if (right) {
      for(let wall of walls) { if (this.collidedOnSide("right", wall)) break; }
      if (this.collisions.right) {
        this.pos[0] = this.collisions.right - (this.colBox.width + (this.colBox.width/2));
      }
    }

  }



  move(walls) {

    if (this.distToPlayer() < this.detectDist) {
      this.chasingPlayer = true;
      this.speedModifier = 1;
    } else {
      this.chasingPlayer = false;
      this.speedModifier = 0.75;
    }
    
    let newVectors = this.normalizedVectorPos();

    const {
      up,
      down,
      left,
      right
    } = this.movement;

    if (left && up) {
      this.pos[0] -= newVectors[0];
      this.pos[1] -= newVectors[1];
    } 
    
    if (left && down) {
      this.pos[0] -= newVectors[0];
      this.pos[1] -= newVectors[1];
    }
    
    if (right && up) {
      this.pos[0] += newVectors[0];
      this.pos[1] += newVectors[1];
    } 
    
    if (right && down) {
      this.pos[0] += newVectors[0];
      this.pos[1] += newVectors[1];
    }

    this.wallCheck(walls);

    this.updateSides();

    switch (this.spriteDir) {
      case "up":
        this.drawOptions.palY = this.stride.up.palY;
        this.drawOptions.palX = this.stridePalettePos("up");
        break;
      case "down":
        
        this.drawOptions.palY = this.stride.down.palY;
        this.drawOptions.palX = this.stridePalettePos("down");
        break;
      case "left":
        this.drawOptions.palY = this.stride.left.palY;
        this.drawOptions.palX = this.stridePalettePos("left");
        break;
      case "right":
        this.drawOptions.palY = this.stride.right.palY;
        this.drawOptions.palX = this.stridePalettePos("right");
        break;
      default:
        this.drawOptions.palX = 48 * 1;
        break;
    }

    
    this.hitPlayer(walls);
    Global.SESSION.player.wallCheck(walls);
    this.updateSides();
    this.drawOptions.x = this.pos[0];
    this.drawOptions.y = this.pos[1];
  }

}

export default Enemy;