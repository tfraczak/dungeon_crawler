import "./styles/index.scss";
import installListeners from "./scripts/utils/install_listeners";
import { WIDTH, HEIGHT, ALL_PATHS } from "./scripts/utils/global_vars";
import createGameState from "./scripts/core/game_state";
import createGameStart from "./scripts/main";

document.addEventListener("DOMContentLoaded", () => {
  const gameState = createGameState();

  // Reveal `.dev-only` UI (wrench icon + Dev Options drawer) in non-prod
  // builds. Webpack replaces process.env.NODE_ENV at build time, so this
  // branch is stripped from the production bundle entirely.
  if (process.env.NODE_ENV !== "production") {
    document.body.classList.add("dev-mode");
  }

  const canvas = document.getElementById("display");
  const ctx = canvas.getContext("2d");

  if (gameState.isMobile) {
    document.body.classList.add("mobile");

    // Mobile zoom is configurable via (in priority order):
    //   1. ?zoom=<n> query param (URL override, also persists to localStorage)
    //   2. localStorage["mobileZoom"] (sticky user preference)
    //   3. 1.35 default (chosen for mid-range phone density)
    // Valid range is [0.5, 5]; out-of-range values fall back to the default.
    const ZOOM_DEFAULT = 1.35;
    const ZOOM_KEY = "mobileZoom";
    const isValidZoom = (n) => Number.isFinite(n) && n >= 0.5 && n <= 5;
    const params = new URLSearchParams(window.location.search);
    const queryZoom = parseFloat(params.get("zoom"));
    let storedZoom = NaN;
    try { storedZoom = parseFloat(localStorage.getItem(ZOOM_KEY)); } catch { /* localStorage may be unavailable */ }

    let MOBILE_ZOOM = ZOOM_DEFAULT;
    if (isValidZoom(queryZoom)) {
      MOBILE_ZOOM = queryZoom;
      try { localStorage.setItem(ZOOM_KEY, String(queryZoom)); } catch { /* ignore */ }
    } else if (isValidZoom(storedZoom)) {
      MOBILE_ZOOM = storedZoom;
    }
    gameState.mobileZoom = MOBILE_ZOOM;

    canvas.width = Math.floor(window.innerWidth / MOBILE_ZOOM);
    canvas.height = Math.floor(window.innerHeight / MOBILE_ZOOM);

    const updateOrientation = () => {
      if (window.innerWidth > window.innerHeight) {
        document.body.classList.remove("portrait");
        canvas.width = Math.floor(window.innerWidth / MOBILE_ZOOM);
        canvas.height = Math.floor(window.innerHeight / MOBILE_ZOOM);
      } else {
        document.body.classList.add("portrait");
        // Portrait pauses the game loop; drop any stuck input so the player
        // doesn't resume mid-sprint or mid-swing when landscape returns.
        Object.keys(gameState.keys).forEach(k => { gameState.keys[k] = false; });
      }
    };
    updateOrientation();
    window.addEventListener("resize", updateOrientation);
    window.addEventListener("orientationchange", () => {
      setTimeout(updateOrientation, 100);
    });
  } else {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
  }

  installListeners(gameState);

  let coinSprite = new Image();
  coinSprite.src = "./dist/assets/images/coin/coin.png";
  coinSprite.onload = () => {
    gameState.sprites.coin = coinSprite;
  };

  let potionSprite = new Image();
  potionSprite.src = "./dist/assets/images/potion/potion.png";
  potionSprite.onload = () => {
    gameState.sprites.potion = potionSprite;
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
    const gameStart = createGameStart(gameState);
    gameStart.prompt();
  }
});
