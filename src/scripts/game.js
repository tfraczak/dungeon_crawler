import Player from "./player";
import Room from "./room";
import * as Global from "./utils/global_vars";

class Game {
  constructor(ctx, playerSprite) {
    this.fpsInterval = 1000/60;
    this.toPlayer = 100;
    const startingPos = [48*7, 48*7];
    this.player = new Player(startingPos, ...Global.SPRITE_DIMS, playerSprite);
    Global.SESSION.player = this.player;
    this.ctx = ctx;
    // const room = { "left": new Room() }; // testing new Room(room)
    Global.SESSION.rooms = {};
    this.startingRoom = new Room();
    this.room = this.startingRoom;
    this.player.draw(ctx);
    Global.SESSION.game = this;
    Global.SESSION.stop = false;
    Global.SESSION.coinCount = 0;
    this.gameStep = this.gameStep.bind(this);
    this.stop = this.stop.bind(this);
    Global.SESSION.game.play();
  }

  gameOver() {
    return this.win() || this.lose();
  }

  win(){
    return Global.SESSION.coinCount >= 20;
  }

  lose() {
    return this.player.hp <= 0;
  }



  stop() {
    if (this.gameOver()) {
      this.requestStop = true;
    }
  }

  gameStep() {
    this.requestId = requestAnimationFrame(this.gameStep);
    let now = Date.now();
    let elapsed = now - this.then;

    if (elapsed > this.fpsInterval) {
      this.then = now - (elapsed % this.fpsInterval);
      const player = Global.SESSION.player;
      this.ctx.clearRect(0,0, Global.WIDTH, Global.HEIGHT);
      player.move(this.room.walls);
      Object.values(this.room.enemies).forEach(enemy => enemy.move(this.room.walls));
      this.room.animate();
      this.room.draw(this.ctx);
      player.draw(this.ctx);
      this.stop();
      if (this.requestStop) {
        cancelAnimationFrame(this.requestId);
        const fontFamily = "Courier New";
        if (this.win()) {
          this.ctx.fillStyle = "rgba(0,0,0,0.5)";
          this.ctx.fillRect(0,0,720,720);
          this.ctx.fillStyle = "#fffaf4";
          this.ctx.font = `48px ${fontFamily}`;
          this.ctx.fillText("Congratulations!", 48*3, 48*4);
          this.ctx.font = `24px ${fontFamily}`;
          this.ctx.fillText("You leave with your life,", 48*4,48*5);
          this.ctx.fillText("and your pockets full!", 48*4.5,48*5.5);
          this.ctx.fillText("Click 'Restart' up top if", 48*4,48*7);
          this.ctx.fillText("you'd like to play again", 48*4.2,48*7.5);
        }
        if (this.lose()) {
          const font = Global.FONT.font;
          this.ctx.fillStyle = "rgba(0,0,0,0.5)";
          this.ctx.fillRect(0,0,720,720);
          this.ctx.fillStyle = "#fffaf4";
          this.ctx.font = `48px ${fontFamily}`;
          this.ctx.fillText("GAME OVER", 48 * 4.75, 48 * 4);
          this.ctx.font = `36px ${fontFamily}`;
          this.ctx.fillText("you lose!", 48 * 5.65, 48 * 5);
          this.ctx.font = `96px ${fontFamily}`;
          this.ctx.fillText("💀", 48 * 6.25, 48 * 7);
          this.ctx.font = `24px ${fontFamily}`;
          this.ctx.fillText("Click 'Restart' up top if", 48*4,48*9);
          this.ctx.fillText("you'd like to play again", 48*4.2,48*9.5);
        }
        return;
      }
    }
  }

  play() {
    this.then = Date.now();
    this.gameStep();
    requestAnimationFrame(this.gameStep);
  }
}

export default Game;