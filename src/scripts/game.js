import Player from "./player";
import Room from "./room";
import * as Global from "./utils/global_vars";

class Game {
  constructor(ctx, playerSprite) {
    const startingPos = [48*7, 48*7];
    this.player = new Player(startingPos, ...Global.SPRITE_DIMS, playerSprite);
    Global.SESSION.player = this.player;
    this.ctx = ctx;
    // const room = { "left": new Room() }; // testing new Room(room)
    this.startingRoom = new Room();
    this.room = this.startingRoom;
    this.player.draw(ctx);
    Global.SESSION.game = this;
    Global.SESSION.stop = false;
    this.gameStep = this.gameStep.bind(this);
    this.stop = this.stop.bind(this);
    Global.SESSION.game.play();
  }

  stop() {
    if (this.requestId) {
      this.requestStop = true;
    }
  }

  gameStep() {
    this.requestId = undefined;
    if (!this.requestId) {
      const player = Global.SESSION.player;
      this.ctx.clearRect(0,0, Global.WIDTH, Global.HEIGHT);
      player.move(this.room.objects);
      this.room.draw(this.ctx);
      player.draw(this.ctx);
      this.requestId = requestAnimationFrame(this.gameStep);
      if (this.requestStop) {
        cancelAnimationFrame(this.requestId);
        return;
      }
    }
  }

  play() {
    this.gameStep();
    requestAnimationFrame(this.gameStep);
  }
}

export default Game;