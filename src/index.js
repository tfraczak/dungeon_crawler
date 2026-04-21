import "./styles/index.scss";
import installListeners from "@ui/install_listeners";
import { ALL_PATHS } from "@core/constants";
import { getVariantCount } from "@world/room/map_variants";
import createGameState from "@core/game_state";
import createGameStart from "@scripts/main";
import * as GAME_CONFIG from "@core/game_config";

const { width: WIDTH, height: HEIGHT } = GAME_CONFIG.world;

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
    //   3. Auto-computed from the device viewport (NEW default)
    //   4. 1.35 emergency fallback if window dimensions are unavailable
    //
    // Auto-zoom targets a constant number of TILES visible vertically in
    // landscape — that keeps the play-feel consistent across devices: the
    // player always sees roughly the same slice of the room, but bigger
    // screens render those tiles with more physical pixels (crisper sprites)
    // up to a cap so iPad Pro doesn't end up with absurdly chunky pixels.
    //
    // We assume the typical player won't resize their window after boot, so
    // the value is computed once and reused on resize/orientation change.
    // Reload the page to recalc.
    const ZOOM_FALLBACK = 1.625;
    const ZOOM_KEY = "mobileZoom";
    const ZOOM_AUTO_MIN = 1.5;            // never undersample pixel art / tiny sprites
    const ZOOM_AUTO_MAX = 3.5;            // tablet cap — beyond this, show more world
    const ZOOM_AUTO_TILES_TALL = 5;       // target ~5 tiles tall in landscape (zoomed-in feel)
    const TILE = 48;
    const isValidZoom = (n) => Number.isFinite(n) && n >= 0.5 && n <= 5;

    const computeAutoZoom = () => {
      // Use the SHORT axis so the calc is stable whether the page first
      // loads in landscape or portrait. innerWidth/innerHeight are CSS px
      // (already DPR-normalized), which is what the canvas back-buffer is
      // sized in below.
      const landscapeH = Math.min(window.innerWidth, window.innerHeight);
      if (!landscapeH) return ZOOM_FALLBACK;
      const z = landscapeH / (ZOOM_AUTO_TILES_TALL * TILE);
      return Math.max(ZOOM_AUTO_MIN, Math.min(ZOOM_AUTO_MAX, z));
    };

    const params = new URLSearchParams(window.location.search);
    const queryZoom = parseFloat(params.get("zoom"));
    let storedZoom = NaN;
    try { storedZoom = parseFloat(localStorage.getItem(ZOOM_KEY)); } catch { /* localStorage may be unavailable */ }

    let MOBILE_ZOOM;
    if (isValidZoom(queryZoom)) {
      MOBILE_ZOOM = queryZoom;
      try { localStorage.setItem(ZOOM_KEY, String(queryZoom)); } catch { /* ignore */ }
    } else if (isValidZoom(storedZoom)) {
      MOBILE_ZOOM = storedZoom;
    } else {
      MOBILE_ZOOM = computeAutoZoom();
    }
    gameState.mobileZoom = MOBILE_ZOOM;

    // Size the canvas back-buffer to the viewport, but CAP to the room
    // dimensions so the camera viewport can never extend past the room
    // boundary (otherwise the page wallpaper would bleed in around the
    // edges of the room). Then set CSS dimensions explicitly so each world
    // pixel maps to integer CSS pixels — this keeps pixel art crisp AND,
    // when capped, leaves the canvas smaller than the viewport. The flex
    // parent (`#display-wrapper`) centers it, so any leftover space shows
    // the wallpaper as a clean letterbox around the play area.
    const sizeCanvas = () => {
      const wantedW = Math.floor(window.innerWidth / MOBILE_ZOOM);
      const wantedH = Math.floor(window.innerHeight / MOBILE_ZOOM);
      canvas.width = Math.min(wantedW, WIDTH);
      canvas.height = Math.min(wantedH, HEIGHT);
      canvas.style.width = `${canvas.width * MOBILE_ZOOM}px`;
      canvas.style.height = `${canvas.height * MOBILE_ZOOM}px`;
    };
    sizeCanvas();

    const updateOrientation = () => {
      if (window.innerWidth > window.innerHeight) {
        document.body.classList.remove("portrait");
        sizeCanvas();
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
  coinSprite.src = "./src/assets/entities/coin/sprite.png";
  coinSprite.onload = () => {
    gameState.sprites.coin = coinSprite;
  };

  let hpPotionSprite = new Image();
  hpPotionSprite.src = "./src/assets/entities/hp_potion/sprite.png";
  hpPotionSprite.onload = () => {
    gameState.sprites.hpPotion = hpPotionSprite;
  };

  let ladderSprite = new Image();
  ladderSprite.src = "./src/assets/entities/ladder/sprite.png";
  ladderSprite.onload = () => {
    gameState.sprites.ladder = ladderSprite;
  };

  let monstersSprites = new Image();
  monstersSprites.src = "./src/assets/entities/enemy/sprite.png";
  monstersSprites.onload = () => {
    gameState.sprites.monsters = monstersSprites;
  };

  // Win-screen backdrops. Each scene has a desktop (square) and mobile (16:9)
  // variant; picker is `gameState.isMobile`-driven at climb time. We preload
  // both up front so the cinematic doesn't pop a missing image when the
  // climb completes — eight ~1MB PNGs is well within budget for a one-time
  // boot cost on a desktop game.
  gameState.sprites.endOfGame = {};
  for (const sceneId of GAME_CONFIG.endScenes) {
    gameState.sprites.endOfGame[sceneId] = { desktop: null, mobile: null };
    for (const orientation of ["desktop", "mobile"]) {
      const img = new Image();
      img.src = `./src/assets/entities/ladder/end_of_game/${sceneId}/${orientation}.png`;
      img.onload = () => {
        gameState.sprites.endOfGame[sceneId][orientation] = img;
      };
    }
  }

  
  for (let path of ALL_PATHS) {
    path = path.split("").sort().join("");
    const variantCount = getVariantCount(path.length, path);
    for (let i = 0; i < variantCount; i++) {
      const background = new Image();
      background.src = `./src/assets/world/room/backgrounds/${path.length}/${path}/${i}.png`;

      background.onload = () => {
        gameState.bgImgs[`${path.length}${path}${i}`] = background;
      };
    }
  }

  let playerSprite = new Image();
  playerSprite.src = "./src/assets/entities/player/classes/rogue/walk.png";
  
  playerSprite.onload = () => {
    gameState.gameOptions.ctx = ctx;
    gameState.gameOptions.playerSprite = playerSprite;
    const gameStart = createGameStart(gameState);
    gameStart.prompt();
  }
});
