import { newGame } from "./utils/func_utils";

class GameStart {
  constructor(gameState) {
    this.gameState = gameState;
    this.ctx = gameState.gameOptions.ctx;
    this.playerSprite = gameState.gameOptions.playerSprite;
    this.fpsInterval = 1000/60;
    this.theta = 0;
    this.step = this.step.bind(this);
  }

  step() {
    this.requestId = requestAnimationFrame(this.step);
    let now = Date.now();
    let elapsed = now - this.then;
    if (elapsed > this.fpsInterval) {
      const fontFamily = "Courier New";
      this.theta += 0.01;
      const red = Math.floor(127 * Math.sin(1.1 * this.theta) + 1);
      const green = Math.floor(127 * Math.sin(1.2 * this.theta) + 1);
      const blue = Math.floor(127 * Math.sin(1.5 * this.theta) + 1);
      const color = `rgba(${red},${green},${blue}, 0.7)`;
      this.ctx.clearRect(0,0,720,720);
      this.ctx.drawImage(this.gameState.bgImgs["4DLRU0"], 0, 0);
      this.ctx.fillStyle = color;
      this.ctx.fillRect(0,0,720,720);
      this.ctx.fillStyle = "#fffaf4";
      this.ctx.font = `bold 48px ${fontFamily}`;
      this.ctx.fillText("Press ENTER", 48 * 4, 48 * 4);
      this.ctx.font = `bold 24px ${fontFamily}`;
      this.ctx.fillText("...to begin a new crawl!", 48 * 5, 48 * 4.55);

      this.ctx.drawImage(this.playerSprite, 48, 0, 48, 48, 48 * 7, 48 * 7, 48, 48);

      if (this.gameState.keys["Enter"]) {
        cancelAnimationFrame(this.requestId);
        const restart = document.getElementById("restart");
        restart.removeAttribute("disabled");
        newGame(this.gameState);
      }
    }
  }

  prompt() {
    this.then = Date.now();
    this.step();
  }
}

export default GameStart;