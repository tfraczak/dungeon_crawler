import Player from "./player";
import Room from "./room";
import * as Global from "./utils/global_vars";

class Game {
  constructor(ctx, playerSprite) {
    const startingPos = [48*7, 48*7];
    this.player = new Player(startingPos, ...Global.SPRITE_DIMS, playerSprite);
    this.ctx = ctx;
    // const room = { "left": new Room() }; // testing new Room(room)
    this.startingRoom = new Room();
    this.room = this.startingRoom;
    Global.ROOMS[`${this.startingRoom.nodePos}`] = this.startingRoom;
    this.player.draw(ctx);
    Global.SESSION.game = this;
  }

  play() {
    const that = this;
    setInterval(() => {
      that.ctx.clearRect(0,0, Global.WIDTH, Global.HEIGHT);
      that.player.move(that.room.objects);
      that.room.draw(that.ctx);
      that.player.draw(that.ctx);
    }, Global.FPS)
  }
}

export default Game;