import { newGame } from "./utils/func_utils";

function createGameStart(gameState) {
  const ctx = gameState.gameOptions.ctx;
  const playerSprite = gameState.gameOptions.playerSprite;

  const gs = {
    fpsInterval: 1000 / 60,
    theta: 0,
  };

  gs.step = () => {
    gs.requestId = requestAnimationFrame(gs.step);
    let now = Date.now();
    let elapsed = now - gs.then;
    if (elapsed > gs.fpsInterval) {
      const fontFamily = "Courier New";
      gs.theta += 0.01;
      const red = Math.floor(127 * Math.sin(1.1 * gs.theta) + 1);
      const green = Math.floor(127 * Math.sin(1.2 * gs.theta) + 1);
      const blue = Math.floor(127 * Math.sin(1.5 * gs.theta) + 1);
      const color = `rgba(${red},${green},${blue}, 0.7)`;
      ctx.clearRect(0, 0, 720, 720);
      ctx.drawImage(gameState.bgImgs["4DLRU0"], 0, 0);
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 720, 720);
      ctx.fillStyle = "#fffaf4";
      ctx.font = `bold 48px ${fontFamily}`;
      ctx.fillText("Press ENTER", 48 * 4, 48 * 4);
      ctx.font = `bold 24px ${fontFamily}`;
      ctx.fillText("...to begin a new crawl!", 48 * 5, 48 * 4.55);

      ctx.drawImage(playerSprite, 48, 0, 48, 48, 48 * 7, 48 * 7, 48, 48);

      if (gameState.keys["Enter"]) {
        cancelAnimationFrame(gs.requestId);
        const restart = document.getElementById("restart");
        restart.removeAttribute("disabled");
        newGame(gameState);
      }
    }
  };

  gs.prompt = () => {
    gs.then = Date.now();
    gs.step();
  };

  return gs;
}

export default createGameStart;
