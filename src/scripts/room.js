import Wall from "./wall";
import * as Global from "./utils/global_vars";
import {
  randNumPaths,
  addValidNeighbors,
  buildPaths,
  buildRoomWalls,
  shuffle,
  assignBlockedPaths,
} from "./utils/func_utils";

class Room {
  constructor(neighbor) {
    this.objects = [];
    // this.objects.push(new Wall([0,0], 48*6, 48));
    // this.objects.push(new Wall([48*9,0], 48*6, 48));
    // this.objects.push(new Wall([48*9,720-48], 48*6, 48));
    // this.objects.push(new Wall([0,720-48], 48*6, 48));
    // this.objects.push(new Wall([0,0], 48, 48*6));
    // this.objects.push(new Wall([0,48*9], 48, 48*6));
    // this.objects.push(new Wall([720-48,0], 48, 48*6));
    // this.objects.push(new Wall([720-48,48*9], 48, 48*6));
    
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
        this.objects.push(...walls);
      } else { // less than 4 paths available
        shuffle(pathsArr); // randomize the path choices
        newPaths.push(entryDir); // MUST ALWAYS have the path you enter from
        for (let i = 0; i < numPaths; i++) { newPaths.push(pathsArr.pop()) }
        newPaths = newPaths.sort().join("");
        assignBlockedPaths(this, newPaths);
        walls = buildRoomWalls(newPaths);
        this.objects.push(...walls);
      }
    } else {
      numPaths = randNumPaths(paths.length);
      if (numPaths === paths.length) {
        walls = buildRoomWalls(paths);
        this.objects.push(...walls);
      } else {
        shuffle(pathsArr);
        for (let i = 0; i < numPaths; i++) { newPaths.push(pathsArr.pop()) }
        newPaths = newPaths.sort().join("");
        assignBlockedPaths(this, newPaths);
        walls = buildRoomWalls(newPaths);
        this.objects.push(...walls);
      }
    }
    
    
    
    

  }

  draw(ctx) {
    this.objects.forEach(object => object.draw(ctx));
    ctx.fillStyle = "#333333";
    ctx.font = "20px arial";
    ctx.fillText(`Room [ ${this.nodePos} ]`, 15, 30);
  }
}

export default Room;