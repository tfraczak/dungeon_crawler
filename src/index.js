import "./styles/index.scss";
import installListeners from "./scripts/utils/install_listeners";
import { WIDTH, HEIGHT, ALL_PATHS } from "./scripts/utils/global_vars";
import GameState from "./scripts/game_state";
import GameStart from "./scripts/game_start";

document.addEventListener("DOMContentLoaded", () => {
  const gameState = new GameState();

  const canvas = document.getElementById("display");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");

  installListeners(gameState);

  let coinSprite = new Image();
  coinSprite.src = "./dist/assets/images/coin/coin.png";
  coinSprite.onload = () => {
    gameState.sprites.coin = coinSprite;
  };

  let monstersSprites = new Image();
  monstersSprites.src = "./dist/assets/images/enemies/monsters.png";
  monstersSprites.onload = () => {
    gameState.sprites.monsters = monstersSprites;
  };
  
  for (let path of ALL_PATHS) {
    path = path.split("").sort().join("");
    for (let i = 0; i < 3; i++) {
      const background = new Image();
      background.src = `./dist/assets/images/map_imgs/${path.length}/${path}/map${i}.png`;
      
      background.onload = () => {
        gameState.bgImgs[`${path.length}${path}${i}`] = background;
      };
    }
  }

  let playerSprite = new Image();
  playerSprite.src = "./dist/assets/images/rogue/rogue_walk.png";
  
  playerSprite.onload = () => {
    gameState.gameOptions.ctx = ctx;
    gameState.gameOptions.playerSprite = playerSprite;
    let gameStart = new GameStart(gameState);
    gameStart.prompt();
  }
});