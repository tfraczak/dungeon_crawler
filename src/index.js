import "./styles/index.scss";
import installListeners from "./scripts/utils/install_listeners";
import * as Global from "./scripts/utils/global_vars";
import GameStart from "./scripts/game_start";



document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("display");
  canvas.width = Global.WIDTH;
  canvas.height = Global.HEIGHT;
  const ctx = canvas.getContext("2d");

  installListeners(Global.KEYS);

  // let font = new FontFace("Press Start 2P", 'url(https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap)');
  // font.load().then(() => {
  //   Global.FONT = font;
  // });

  // const font = new FontFace("Press Start 2P", 'url(https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap)');
  // font.load().then(Global.FONT["font"] = font);

  let coinSprite = new Image();
  coinSprite.src = "./dist/assets/images/coin/coin.png";
  coinSprite.onload = () => {
    Global.SPRITES.coin = coinSprite;
  };

  let monstersSprites = new Image();
  monstersSprites.src = "./dist/assets/images/enemies/monsters.png";
  monstersSprites.onload = () => {
    Global.SPRITES.monsters = monstersSprites;
  };
  
  for (let path of Global.ALL_PATHS) {
    path = path.split("").sort().join("");
    for (let i = 0; i < 3; i++) {
      const background = new Image();
      background.src = `./dist/assets/images/map_imgs/${path.length}/${path}/map${i}.png`;
      
      background.onload = () => {
        Global.BG_IMGS[`${path.length}${path}${i}`] = background;
        // Global.GB_IMGS["4DLRU0"] = background
      };
    }
  }

  let playerSprite = new Image();
  playerSprite.src = "./dist/assets/images/rogue/rogue_walk.png";
  
  playerSprite.onload = () => {
    let gameStart = new GameStart(ctx, playerSprite);
    Global.GAME_OPTIONS["ctx"] = ctx;
    Global.GAME_OPTIONS["playerSprite"] = playerSprite;
    gameStart.prompt();
    
  }

});