import "./styles/index.scss";
import Game from "./scripts/game";
import installListeners from "./scripts/utils/install_listeners";
import * as Global from "./scripts/utils/global_vars";
import { newGame } from "./scripts/utils/func_utils";



document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("display");
  canvas.width = Global.WIDTH;
  canvas.height = Global.HEIGHT;
  const ctx = canvas.getContext("2d");

  installListeners(Global.KEYS);
  
  let playerSprite = new Image();
  playerSprite.src = "../src/assets/images/rogue/rogue_walk.png";
  
  playerSprite.onload = () => {
    Global.GAME_OPTIONS["ctx"] = ctx;
    Global.GAME_OPTIONS["playerSprite"] = playerSprite;
    newGame();
  }

});