import * as Global from "./utils/global_vars";

import {
  randNumPaths,
  addValidNeighbors,
  buildPaths,
  buildRoomWalls,
  shuffle,
  assignBlockedPaths,
  generateCoins,
} from "./utils/func_utils";

class Room {
  constructor(neighbor) {
    this.coins = generateCoins();
    this.walls = [];
    let randIdx;
    this.neighbors = {
      up: undefined,
      down: undefined,
      left: undefined,
      right: undefined,
    };
    let entryDir;
    if (neighbor) {
      const exitDir = Object.keys(neighbor)[0];
      const prevRoom = Object.values(neighbor)[0];
      this.nodePos = [...prevRoom.nodePos];
      switch(exitDir) {
        case "up":
          this.neighbors.down = prevRoom;
          entryDir = "D";
          this.nodePos[1]++;
          break;
        case "down":
          this.neighbors.up = prevRoom;
          entryDir = "U";
          this.nodePos[1]--;
          break;
        case "left":
          this.neighbors.right = prevRoom;
          entryDir = "R";
          this.nodePos[0]--;
          break;
        case "right":
          this.neighbors.left = prevRoom;
          entryDir = "L";
          this.nodePos[0]++;
          break;
      }
    } else {
      this.nodePos = [0,0];
    }
    
    Global.ROOMS[`${this.nodePos}`] = this;

    addValidNeighbors(this);
    let walls, numPaths, randPaths;
    let newPaths = [];
    let paths = buildPaths(this);
    let pathsArr = paths.split("");
    if (neighbor) {
      // if not initial room
      pathsArr = pathsArr.filter(path => path !== entryDir); // remove entryDir from paths
      numPaths = randNumPaths(paths.length); // weighted random number generator, prefers more paths
      if (numPaths === paths.length) { // if all 4 paths are available
        randIdx = Math.floor(Math.random()*3);
        this.background = Global.BG_IMGS[`${numPaths}${paths}${randIdx}`];
        if (!this.background) {
          
        }
        assignBlockedPaths(this, paths);
        walls = buildRoomWalls(paths);
        if (!walls) {
          debugger
        }
        this.walls.push(...walls);
        Global.ROOMS[`${this.nodePos}`] = this;
      } else { // less than 4 paths available
        shuffle(pathsArr); // randomize the path choices
        newPaths.push(entryDir); // MUST ALWAYS have the path you enter from
        numPaths--;
        for (let i = 0; i < numPaths; i++) { newPaths.push(pathsArr.pop()) }
        newPaths = newPaths.sort().join("");
        randIdx = Math.floor(Math.random()*3);
        this.background = Global.BG_IMGS[`${numPaths+1}${newPaths}${randIdx}`];
        if (!this.background) {
          
        }
        assignBlockedPaths(this, newPaths);
        walls = buildRoomWalls(newPaths);
        if (!walls) {
          debugger
        }
        this.walls.push(...walls);
        Global.ROOMS[`${this.nodePos}`] = this;
      }
    } else {
      numPaths = randNumPaths(paths.length);
      if (numPaths === paths.length) {
        randIdx = Math.floor(Math.random()*3);
        this.background = Global.BG_IMGS[`${numPaths}${paths}${randIdx}`];
        walls = buildRoomWalls(paths);
        if (!walls) {
          debugger
        }
        this.walls.push(...walls);
        Global.ROOMS[`${this.nodePos}`] = this;
      } else {
        shuffle(pathsArr);
        for (let i = 0; i < numPaths; i++) { newPaths.push(pathsArr.pop()) }
        newPaths = newPaths.sort().join("");
        randIdx = Math.floor(Math.random()*3);
        this.background = Global.BG_IMGS[`${numPaths}${newPaths}${randIdx}`];
        assignBlockedPaths(this, newPaths);
        walls = buildRoomWalls(newPaths);
        if (!walls) {
          debugger
        }
        this.walls.push(...walls);
        Global.ROOMS[`${this.nodePos}`] = this;
      }
    }
    this.animatedObjects = {};
    Object.values(this.coins).forEach(coin => {
      this.animatedObjects[`coin-${coin.pos}`] = coin;
    });

    

  }

  animate() {
    this.collect();
    Object.values(this.animatedObjects).forEach(object => object.animate())
  }

  collect() {
    for (let coin of Object.values(this.coins)) {
      if (coin.collect()) {
        delete this.animatedObjects[`coin-${coin.pos}`];
        delete this.coins[`${coin.pos}`];
        Global.SESSION.coinCount++;
        return;
      }
    }
  }


  draw(ctx) {
    ctx.drawImage(this.background, 0, 0);
    // this.walls.forEach(wall => wall.draw(ctx));
    Object.values(this.animatedObjects).forEach(object => object.draw(ctx));
    ctx.fillStyle = "#fffaf4";
    ctx.font = "20px arial";
    ctx.fillText(`Room [ ${this.nodePos} ]`, 15, 30);
    ctx.fillText(`Coins x ${Global.SESSION.coinCount}`, 590, 30);
  }
}

export default Room;