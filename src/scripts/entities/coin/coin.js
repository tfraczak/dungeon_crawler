import createEntity from "../entity";
import GAME_CONFIG from "../../core/game_config";
import { playCoinSound, playCoinDrop } from "../../sounds";
import applyDropBehavior from "../../effects/drop";

let coinIdCounter = 0;

function createCoin(pos, width, height, spritePalette, gameState) {
  const coin = createEntity(pos, width, height, spritePalette, { width, height });

  coin.id = `coin_${coinIdCounter++}`;
  coin.gameState = gameState;
  coin.frameInterval = GAME_CONFIG.coin.frameInterval;
  coin.frameCount = 0;
  coin.drawOptions.palY = 0;

  applyDropBehavior(coin, playCoinDrop);

  // Visually scale the coin up while keeping the 16x16 sprite source frames
  // and collision box intact. The larger render is centered on the entity's
  // logical position so pickup behavior is unchanged.
  const frameSize = width;
  const renderSize = GAME_CONFIG.coin.renderSize;
  const renderOffset = (renderSize - frameSize) / 2;

  // Procedural sparkle particles. Each coin maintains a small pool of
  // sparkles that spawn at random angles/radii around the coin edge, fade in
  // and out over a randomized lifetime, then respawn at a fresh position.
  // Randomizing initial age avoids the "all blink in unison" look when many
  // coins are on screen — each coin (and each sparkle within it) shimmers
  // independently. Suppressed while dropping so the bounce trail stays clean.
  const cfg = GAME_CONFIG.coin.sparkle;
  const coinCenter = frameSize / 2;
  const makeSparkle = (stagger) => {
    const angle = Math.random() * Math.PI * 2;
    const radius = cfg.radiusMin + Math.random() * cfg.radiusRand;
    const maxLife = cfg.lifeMin + Math.random() * cfg.lifeRand;
    return {
      dx: Math.round(Math.cos(angle) * radius),
      dy: Math.round(Math.sin(angle) * radius),
      life: stagger ? Math.random() * maxLife : 0,
      maxLife,
    };
  };
  coin.sparkles = Array.from({ length: cfg.count }, () => makeSparkle(true));
  coin.updateSparkles = () => {
    for (let i = 0; i < coin.sparkles.length; i++) {
      const s = coin.sparkles[i];
      s.life++;
      if (s.life >= s.maxLife) coin.sparkles[i] = makeSparkle(false);
    }
  };

  // Warm-gold palette matching the coin highlights. Phase is derived from
  // the sparkle's normalized lifetime so every particle eases through
  // dim -> mid -> bright halo -> mid -> dim over its own random duration.
  const SPARKLE_BRIGHT = "#fff8c8";
  const SPARKLE_MID = "#e6d296";
  const SPARKLE_DIM = "#b4a06e";
  const phaseForLife = (t) => {
    if (t < 0.15) return "dim";
    if (t < 0.4) return "mid";
    if (t < 0.6) return "bright";
    if (t < 0.8) return "mid";
    if (t < 1) return "dim";
    return null;
  };
  const drawSparkle = (ctx, cx, cy, phase) => {
    const dot = (x, y) => ctx.fillRect(x, y, 1, 1);
    if (phase === "bright") {
      ctx.fillStyle = SPARKLE_BRIGHT;
      dot(cx, cy - 1); dot(cx - 1, cy); dot(cx, cy); dot(cx + 1, cy); dot(cx, cy + 1);
      ctx.fillStyle = SPARKLE_MID;
      dot(cx, cy - 2); dot(cx - 2, cy); dot(cx + 2, cy); dot(cx, cy + 2);
    } else if (phase === "mid") {
      ctx.fillStyle = SPARKLE_MID;
      dot(cx, cy - 1); dot(cx - 1, cy); dot(cx, cy); dot(cx + 1, cy); dot(cx, cy + 1);
    } else if (phase === "dim") {
      ctx.fillStyle = SPARKLE_DIM;
      dot(cx, cy);
    }
  };

  coin.draw = (ctx) => {
    const dz = coin.dropping ? coin.dropZ : 0;
    ctx.drawImage(
      coin.spritePalette,
      coin.drawOptions.palX, coin.drawOptions.palY,
      frameSize, frameSize,
      coin.pos[0] - renderOffset, coin.pos[1] - dz - renderOffset,
      renderSize, renderSize,
    );
    if (!coin.dropping) {
      const cx = coin.pos[0] + coinCenter;
      const cy = coin.pos[1] - dz + coinCenter;
      for (const s of coin.sparkles) {
        const phase = phaseForLife(s.life / s.maxLife);
        if (phase) drawSparkle(ctx, cx + s.dx, cy + s.dy, phase);
      }
    }
    coin.colBox.centerOnEntity();
    coin.colBox.draw(ctx);
  };

  coin.collect = () => {
    if (coin.dropping) return false;
    const player = coin.gameState.session.player;
    if (
      coin.collidedOnSide("top", player) ||
      coin.collidedOnSide("bottom", player) ||
      coin.collidedOnSide("left", player) ||
      coin.collidedOnSide("right", player)
    ) {
      playCoinSound();
      return true;
    }
    return false;
  };

  coin.animate = (room) => {
    if (coin.dropping) {
      coin.updateDrop(room);
      return;
    }

    coin.updateSparkles();

    const i = coin.frameInterval;
    const c = coin.frameCount;
    const w = coin.width;
    if (c < i) {
      coin.drawOptions.palX = w * 0;
    } else if (c < i * 2) {
      coin.drawOptions.palX = w * 1;
    } else if (c < i * 3) {
      coin.drawOptions.palX = w * 2;
    } else if (c < i * 4) {
      coin.drawOptions.palX = w * 3;
    } else if (c < i * 5) {
      coin.drawOptions.palX = w * 4;
    } else if (c < i * 6) {
      coin.drawOptions.palX = w * 5;
    } else if (c < i * 7) {
      coin.drawOptions.palX = w * 6;
    } else if (c < i * 8) {
      coin.drawOptions.palX = w * 7;
    } else {
      coin.drawOptions.palX = w * 0;
      coin.frameCount = 0;
      return;
    }
    coin.frameCount++;
  };

  return coin;
}

export default createCoin;
