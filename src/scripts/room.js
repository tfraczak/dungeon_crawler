import * as Global from "./utils/global_vars";
import Wall from "./wall";
import Coin from "./coin";
import Enemy from "./enemy";

import {
  randNumPaths,
  addValidNeighbors,
  buildPaths,
  shuffle,
  assignBlockedPaths,
  randNumCoins
} from "./utils/func_utils";


class Room {
  constructor(neighbor) {
    this.generateCoins();
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
    
    Global.SESSION.rooms[`${this.nodePos}`] = this;

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
        assignBlockedPaths(this, paths);
        walls = this.buildRoomWalls(paths);
        this.walls.push(...walls);
        Global.SESSION.rooms[`${this.nodePos}`] = this;
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
        walls = this.buildRoomWalls(newPaths);
        this.walls.push(...walls);
        Global.SESSION.rooms[`${this.nodePos}`] = this;
      }
    } else {
      numPaths = randNumPaths(paths.length);
      if (numPaths === paths.length) {
        randIdx = Math.floor(Math.random()*3);
        this.background = Global.BG_IMGS[`${numPaths}${paths}${randIdx}`];
        walls = this.buildRoomWalls(paths);
        this.walls.push(...walls);
        Global.SESSION.rooms[`${this.nodePos}`] = this;
      } else {
        shuffle(pathsArr);
        for (let i = 0; i < numPaths; i++) { newPaths.push(pathsArr.pop()) }
        newPaths = newPaths.sort().join("");
        randIdx = Math.floor(Math.random()*3);
        this.background = Global.BG_IMGS[`${numPaths}${newPaths}${randIdx}`];
        assignBlockedPaths(this, newPaths);
        walls = this.buildRoomWalls(newPaths);
        this.walls.push(...walls);
        Global.SESSION.rooms[`${this.nodePos}`] = this;
      }
    }
    this.generateEnemies();
    // this.animatedObjects = {};
    // Object.values(this.coins).forEach(coin => {
    //   this.animatedObjects[`coin-${coin.pos}`] = coin;
    // });

  }

  generateEnemies() {
    const numEnemies = Math.floor(Object.keys(Global.SESSION.rooms).length/2);
    this.enemies = {};
    for (let i = 0; i < numEnemies; i++) {
      let x = Math.floor(Math.random()*550) + 64;
      let y = Math.floor(Math.random()*550) + 64;
      let pos = [x,y];
      const enemy = new Enemy(pos, 48,48,Global.SPRITES.monsters, "blob", 200 + (numEnemies * 50));
      this.enemies[`${enemy.pos}`] = enemy;
    }
  };

  generateCoins() {
    const numCoins = randNumCoins();
    this.coins = {};
    for (let i = 0; i < numCoins; i++) {
      let x = Math.floor(Math.random()*592) + 64;
      while (x > 336 && x < 384) x = Math.floor(Math.random()*592) + 64;
      let y = Math.floor(Math.random()*592) + 64;
      while (y > 336 && y < 384) y = Math.floor(Math.random()*592) + 64;
      let pos = [x,y];
      const coin = new Coin(pos, 16,16,Global.SPRITES.coin);
      this.coins[`${coin.pos}`] = coin;
    }
  };

  animate() {
    this.collect();
    Object.values(this.coins).forEach(coin => {
      coin.animate();
    });
    // Object.values(this.animatedObjects).forEach(object => object.animate());

  }

  collect() {
    for (let coin of Object.values(this.coins)) {
      if (coin.collect()) {
        delete this.coins[`${coin.pos}`];
        Global.SESSION.coinCount++;
        return;
      }
    }
  }


  draw(ctx) {
    ctx.drawImage(this.background, 0, 0);
    // this.walls.forEach(wall => wall.draw(ctx));
    Object.values(this.coins).forEach(coin => coin.draw(ctx));
    Object.values(this.enemies).forEach(enemy => enemy.draw(ctx));
    ctx.fillStyle = "#fffaf4";
    ctx.font = "20px arial";
    ctx.fillText(`Room [ ${this.nodePos} ]`, 15, 30);
    ctx.fillText(`Coins x ${Global.SESSION.coinCount}`, 590, 30);
    ctx.beginPath()
    ctx.strokeStyle = "#ffbb00";
    ctx.moveTo(15, 705);
    ctx.lineWidth = 5;
    ctx.lineTo(15 + (Global.SESSION.player.stamina/1000) * 100, 705);
    ctx.stroke();
    ctx.beginPath()
    ctx.strokeStyle = "#33ff00";
    ctx.moveTo(15, 690);
    ctx.lineWidth = 10;
    ctx.lineTo(15 + (Global.SESSION.player.hp/20) * 100, 690);
    ctx.stroke();
    ctx.beginPath()
    ctx.strokeStyle = "#ff0000";
    ctx.moveTo(115 - (1 - Global.SESSION.player.hp/20) * 100, 690);
    ctx.lineWidth = 10;
    ctx.lineTo(115, 690);
    ctx.stroke();
    ctx.beginPath()
    ctx.strokeStyle = "#00dddd";
    ctx.moveTo(15, 699);
    ctx.lineWidth = 5;
    ctx.lineTo(15 + (Global.SESSION.player.invulnerable/75) * 100, 699);
    ctx.stroke();
    // ctx.fillText(`Stamina = ${Global.SESSION.player.stamina}`, 15, 400);
  }

  buildRoomWalls(paths) {
    let walls = [];
    switch(paths) {
      case "DLRU":
        walls.push(new Wall([0,0], 48*6, 48)); // up left
        walls.push(new Wall([48*9,0], 48*6, 48)); // up right
        walls.push(new Wall([0,720-48], 48*6, 48)); // down left
        walls.push(new Wall([48*9,720-48], 48*6, 48)); // down right
        walls.push(new Wall([0,0], 48, 48*6)); // left up
        walls.push(new Wall([0,48*9], 48, 48*6)); // left down
        walls.push(new Wall([720-48,0], 48, 48*6)); // right up
        walls.push(new Wall([720-48,48*9], 48, 48*6)); // right down
        return walls;
      case "DLU":
        walls.push(new Wall([0,0], 48*6, 48)); // up left
        walls.push(new Wall([48*9,0], 48*6, 48)); // up right
        walls.push(new Wall([0,720-48], 48*6, 48)); // down left
        walls.push(new Wall([48*9,720-48], 48*6, 48)); // down right
        walls.push(new Wall([0,0], 48, 48*6)); // left up
        walls.push(new Wall([0,48*9], 48, 48*6)); // left down
        walls.push(new Wall([720-48,0], 48, 720)); // right blocked
        return walls;
      case "LRU":
        walls.push(new Wall([0,0], 48*6, 48)); // up left
        walls.push(new Wall([48*9,0], 48*6, 48)); // up right
        walls.push(new Wall([0,0], 48, 48*6)); // left up
        walls.push(new Wall([0,48*9], 48, 48*6)); // left down
        walls.push(new Wall([720-48,0], 48, 48*6)); // right up
        walls.push(new Wall([720-48,48*9], 48, 48*6)); // right down
        walls.push(new Wall([0,720-48], 720, 48)); // down blocked
        return walls;
      case "DRU":
        walls.push(new Wall([0,0], 48*6, 48)); // up left
        walls.push(new Wall([48*9,0], 48*6, 48)); // up right
        walls.push(new Wall([0,720-48], 48*6, 48)); // down left
        walls.push(new Wall([48*9,720-48], 48*6, 48)); // down right
        walls.push(new Wall([720-48,0], 48, 48*6)); // right up
        walls.push(new Wall([720-48,48*9], 48, 48*6)); // right down
        walls.push(new Wall([0,0], 48, 720)); // left blocked
        return walls;
      case "DLR":
        walls.push(new Wall([0,720-48], 48*6, 48)); // down left
        walls.push(new Wall([48*9,720-48], 48*6, 48)); // down right
        walls.push(new Wall([0,0], 48, 48*6)); // left up
        walls.push(new Wall([0,48*9], 48, 48*6)); // left down
        walls.push(new Wall([720-48,0], 48, 48*6)); // right up
        walls.push(new Wall([720-48,48*9], 48, 48*6)); // right down
        walls.push(new Wall([0,0], 720, 48)); // up blocked
        return walls;
      case "LU":
        walls.push(new Wall([0,0], 48, 48*6)); // left up
        walls.push(new Wall([0,48*9], 48, 48*6)); // left down
        walls.push(new Wall([0,0], 48*6, 48)); // up left
        walls.push(new Wall([48*9,0], 48*6, 48)); // up right
        walls.push(new Wall([720-48,0], 48, 720)); // right blocked
        walls.push(new Wall([0,720-48], 720, 48)); // down blocked
        return walls;
      case "DU":
        walls.push(new Wall([0,0], 48*6, 48)); // up left
        walls.push(new Wall([48*9,0], 48*6, 48)); // up right
        walls.push(new Wall([0,720-48], 48*6, 48)); // down left
        walls.push(new Wall([48*9,720-48], 48*6, 48)); // down right
        walls.push(new Wall([0,0], 48, 720)); // left blocked
        walls.push(new Wall([720-48,0], 48, 720)); // right blocked
        return walls;
      case "RU":
        walls.push(new Wall([720-48,0], 48, 48*6)); // right up
        walls.push(new Wall([720-48,48*9], 48, 48*6)); // right down
        walls.push(new Wall([0,0], 48*6, 48)); // up left
        walls.push(new Wall([48*9,0], 48*6, 48)); // up right
        walls.push(new Wall([0,720-48], 720, 48)); // down blocked
        walls.push(new Wall([0,0], 48, 720)); // left blocked
        return walls;
      case "DL":
        walls.push(new Wall([0,0], 48, 48*6)); // left up
        walls.push(new Wall([0,48*9], 48, 48*6)); // left down
        walls.push(new Wall([0,720-48], 48*6, 48)); // down left
        walls.push(new Wall([48*9,720-48], 48*6, 48)); // down right
        walls.push(new Wall([0,0], 720, 48)); // up blocked
        walls.push(new Wall([720-48,0], 48, 720)); // right blocked
        return walls;
      case "DR":
        walls.push(new Wall([720-48,0], 48, 48*6)); // right up
        walls.push(new Wall([720-48,48*9], 48, 48*6)); // right down
        walls.push(new Wall([0,720-48], 48*6, 48)); // down left
        walls.push(new Wall([48*9,720-48], 48*6, 48)); // down right
        walls.push(new Wall([0,0], 48, 720)); // left blocked
        walls.push(new Wall([0,0], 720, 48)); // up blocked
        return walls;
      case "LR":
        walls.push(new Wall([0,0], 48, 48*6)); // left up
        walls.push(new Wall([0,48*9], 48, 48*6)); // left down
        walls.push(new Wall([720-48,0], 48, 48*6)); // right up
        walls.push(new Wall([720-48,48*9], 48, 48*6)); // right down
        walls.push(new Wall([0,720-48], 720, 48)); // down blocked
        walls.push(new Wall([0,0], 720, 48)); // up blocked
        return walls;
      case "L":
        walls.push(new Wall([0,0], 48, 48*6)); // left up
        walls.push(new Wall([0,48*9], 48, 48*6)); // left down
        walls.push(new Wall([720-48,0], 48, 720)); // right blocked
        walls.push(new Wall([0,720-48], 720, 48)); // down blocked
        walls.push(new Wall([0,0], 720, 48)); // up blocked
        return walls;
      case "R":
        walls.push(new Wall([720-48,0], 48, 48*6)); // right up
        walls.push(new Wall([720-48,48*9], 48, 48*6)); // right down
        walls.push(new Wall([0,720-48], 720, 48)); // down blocked
        walls.push(new Wall([0,0], 48, 720)); // left blocked
        walls.push(new Wall([0,0], 720, 48)); // up blocked
        return walls;
      case "U":
        walls.push(new Wall([0,0], 48*6, 48)); // up left
        walls.push(new Wall([48*9,0], 48*6, 48)); // up right
        walls.push(new Wall([720-48,0], 48, 720)); // right blocked
        walls.push(new Wall([0,720-48], 720, 48)); // down blocked
        walls.push(new Wall([0,0], 48, 720)); // left blocked
        return walls;
      case "D":
        walls.push(new Wall([0,720-48], 48*6, 48)); // down left
        walls.push(new Wall([48*9,720-48], 48*6, 48)); // down right
        walls.push(new Wall([720-48,0], 48, 720)); // right blocked
        walls.push(new Wall([0,0], 48, 720)); // left blocked
        walls.push(new Wall([0,0], 720, 48)); // up blocked
        return walls;
    }
  }

}



export default Room;