import Player from "./player";
import Room from "./room";
import { SPRITE_DIMS, WIDTH, HEIGHT } from "./utils/global_vars";

class Game {
  constructor(gameState) {
    this.gameState = gameState;
    const { ctx, playerSprite } = gameState.gameOptions;
    this.fpsInterval = 1000/60;
    this.toPlayer = 100;
    const startingPos = [48*7, 48*7];
    this.player = new Player(startingPos, ...SPRITE_DIMS, playerSprite, gameState);
    this.ctx = ctx;
    gameState.session.player = this.player;
    gameState.session.rooms = {};
    gameState.session.game = this;
    gameState.session.stop = false;
    gameState.session.coinCount = 0;
    this.startingRoom = new Room(null, gameState);
    this.room = this.startingRoom;
    this.player.draw(ctx);
    this.gameStep = this.gameStep.bind(this);
    this.stop = this.stop.bind(this);
    this.play();
  }

  gameOver() {
    return this.win() || this.lose();
  }

  win(){
    return this.gameState.session.coinCount > 9;
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
      this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
      this.player.move(this.room.walls);
      Object.values(this.room.enemies).forEach(enemy => enemy.move(this.room.walls));
      this.room.animate();
      this.room.draw(this.ctx);
      this.player.draw(this.ctx);
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
  }
}

export default Game;