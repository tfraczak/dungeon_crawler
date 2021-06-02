import "./styles/index.scss";
import Game from "./scripts/game";
import installListeners from "./scripts/utils/install_listeners";
import * as Global from "./scripts/utils/global_vars";



document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("display");
  canvas.width = Global.WIDTH;
  canvas.height = Global.HEIGHT;
  const ctx = canvas.getContext("2d");

  installListeners(Global.KEYS);
  
  let playerSprite = new Image();
  playerSprite.src = "../src/assets/images/rogue/rogue_walk.png";
  
  playerSprite.onload = () => {
    new Game(ctx, playerSprite);
    Global.SESSION.game.play();
  }

});