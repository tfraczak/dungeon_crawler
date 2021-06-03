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
        walls = buildRoomWalls(paths);
        this.walls.push(...walls);
      } else { // less than 4 paths available
        shuffle(pathsArr); // randomize the path choices
        newPaths.push(entryDir); // MUST ALWAYS have the path you enter from
        for (let i = 0; i < numPaths; i++) { newPaths.push(pathsArr.pop()) }
        newPaths = newPaths.sort().join("");
        assignBlockedPaths(this, newPaths);
        walls = buildRoomWalls(newPaths);
        this.walls.push(...walls);
      }
    } else {
      numPaths = randNumPaths(paths.length);
      if (numPaths === paths.length) {
        walls = buildRoomWalls(paths);
        this.walls.push(...walls);
        Global.ROOMS[`${this.nodePos}`] = this;
      } else {
        shuffle(pathsArr);
        for (let i = 0; i < numPaths; i++) { newPaths.push(pathsArr.pop()) }
        newPaths = newPaths.sort().join("");
        assignBlockedPaths(this, newPaths);
        walls = buildRoomWalls(newPaths);
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
    this.walls.forEach(wall => wall.draw(ctx));
    Object.values(this.animatedObjects).forEach(object => object.draw(ctx));
    ctx.fillStyle = "#333333";
    ctx.font = "20px arial";
    ctx.fillText(`Room [ ${this.nodePos} ]`, 15, 30);
    ctx.fillText(`Coins x ${Global.SESSION.coinCount}`, 590, 30);
  }
}

export default Room;