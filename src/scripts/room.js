import Wall from "./wall";
import * as Global from "./utils/global_vars";

class Room {
  constructor(neighbor) {
    this.objects = [];
    this.objects.push(new Wall([0,0], 48*6, 48));
    this.objects.push(new Wall([48*9,0], 48*6, 48));
    this.objects.push(new Wall([48*9,720-48], 48*6, 48));
    this.objects.push(new Wall([0,720-48], 48*6, 48));
    this.objects.push(new Wall([0,0], 48, 48*6));
    this.objects.push(new Wall([0,48*9], 48, 48*6));
    this.objects.push(new Wall([720-48,0], 48, 48*6));
    this.objects.push(new Wall([720-48,48*9], 48, 48*6));
    this.neighbors = {
      up: undefined,
      down: undefined,
      left: undefined,
      right: undefined,
    };
    if (neighbor) {
      const exitDir = Object.keys(neighbor)[0];
      const prevRoom = Object.values(neighbor)[0];
      this.nodePos = [...prevRoom.nodePos];
      switch(exitDir) {
        case "up":
          this.neighbors.down = prevRoom;
          this.nodePos[1]++;
          break;
        case "down":
          this.neighbors.up = prevRoom;
          this.nodePos[1]--;
          break;
        case "left":
          this.neighbors.right = prevRoom;
          this.nodePos[0]--;
          break;
        case "right":
          this.neighbors.left = prevRoom;
          this.nodePos[0]++;
          break;
      }
    } else {
      this.nodePos = [0,0];
    }

    Global.ROOMS[`${this.nodePos}`] = this;
  }

  draw(ctx) {
    this.objects.forEach(object => object.draw(ctx));
    ctx.fillStyle = "#333333";
    ctx.font = "20px arial";
    ctx.fillText(`Room [ ${this.nodePos} ]`, 15, 30);
  }
}

export default Room;