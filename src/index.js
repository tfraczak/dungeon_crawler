import "./styles/index.scss";
import installListeners from "./scripts/utils/install_listeners";
import * as Global from "./scripts/utils/global_vars";
import { newGame } from "./scripts/utils/func_utils";
import coinImg from "./assets/images/coin/coin.png";
import playerImg from "./assets/images/rogue/rogue_walk.png";



document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("display");
  canvas.width = Global.WIDTH;
  canvas.height = Global.HEIGHT;
  const ctx = canvas.getContext("2d");

  installListeners(Global.KEYS);

  

  let coinSprite = new Image();
  coinSprite.src = coinImg;
  coinSprite.onload = () => {
    Global.SPRITES.coin = coinSprite;
  };
  
  for (let path of Global.ALL_PATHS) {
    path = path.split("").sort().join("");
    for (let i = 0; i < 3; i++) {
      const background = new Image();
      background.src = `./src/assets/images/map_imgs/${path.length}/${path}/map${i}.png`;
      
      background.onload = () => {
        Global.BG_IMGS[`${path.length}${path}${i}`] = background;
        // Global.GB_IMGS["4DLRU0"] = background
      };
    }
  }

  let playerSprite = new Image();
  playerSprite.src = playerImg;
  
  playerSprite.onload = () => {
    setTimeout(() => {
      Global.GAME_OPTIONS["ctx"] = ctx;
    Global.GAME_OPTIONS["playerSprite"] = playerSprite;
    newGame();
    },1000);
    
  }

});