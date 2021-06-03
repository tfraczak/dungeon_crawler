import "./styles/index.scss";
import installListeners from "./scripts/utils/install_listeners";
import * as Global from "./scripts/utils/global_vars";
import { newGame } from "./scripts/utils/func_utils";
import Entity from "./scripts/entity";



document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("display");
  canvas.width = Global.WIDTH;
  canvas.height = Global.HEIGHT;
  const ctx = canvas.getContext("2d");

  installListeners(Global.KEYS);
  
  let coinSprite = new Image();
  coinSprite.src = "../src/assets/images/coin/coin.png";
  coinSprite.onload = () => {
    Global.SPRITES.coin = coinSprite;
  };
  let playerSprite = new Image();
  playerSprite.src = "../src/assets/images/rogue/rogue_walk.png";
  
  
  playerSprite.onload = () => {
    Global.GAME_OPTIONS["ctx"] = ctx;
    Global.GAME_OPTIONS["playerSprite"] = playerSprite;
    newGame();
  }

});