import createEntity from "../entity";
import GAME_CONFIG from "../../core/game_config";
import { playHpPotionSound, playHpPotionDrop } from "../../sounds";
import applyDropBehavior from "../../effects/drop";

let hpPotionIdCounter = 0;

// Health potion: a static 32x32 bottle sprite with two procedural particle
// pools layered on top -- bubbles rising inside the liquid and red heal
// crosses drifting up either side. Each particle picks its own random column,
// lifetime, and respawn delay so two potions on screen never animate in sync.
// Picking one up heals the player up to GAME_CONFIG.player.hp.
function createHpPotion(pos, width, height, spritePalette, gameState) {
  const potion = createEntity(pos, width, height, spritePalette, { width, height });

  potion.id = `hp_potion_${hpPotionIdCounter++}`;
  potion.gameState = gameState;
  potion.drawOptions.palX = 0;
  potion.drawOptions.palY = 0;

  applyDropBehavior(potion, playHpPotionDrop);

  // -------------------------------------------------------------------------
  // Procedural bubbles + heal crosses. Particles share a common shape: each
  // has a `life` counter that ticks up every animate frame; values below 0
  // are a "dormant" delay so the pool doesn't always show its full count;
  // values in 0..maxLife are the active rise. On reaching maxLife the slot
  // is replaced with a freshly randomized particle.
  // -------------------------------------------------------------------------
  const bubbleCfg = GAME_CONFIG.hpPotion.bubble;
  const crossCfg = GAME_CONFIG.hpPotion.cross;

  const makeBubble = (stagger) => {
    const x = bubbleCfg.colMin + Math.floor(Math.random() * bubbleCfg.colRange);
    const maxLife = bubbleCfg.lifeMin + Math.random() * bubbleCfg.lifeRand;
    const delay = Math.random() * bubbleCfg.delayRand;
    return {
      x,
      maxLife,
      life: stagger ? Math.random() * (maxLife + delay) - delay : -delay,
    };
  };
  const makeCross = (stagger) => {
    const side = Math.random() < 0.5 ? "left" : "right";
    const baseX = side === "left" ? crossCfg.leftXMin : crossCfg.rightXMin;
    const x = baseX + Math.floor(Math.random() * crossCfg.xJitter);
    const maxLife = crossCfg.lifeMin + Math.random() * crossCfg.lifeRand;
    const delay = Math.random() * crossCfg.delayRand;
    return {
      x,
      maxLife,
      life: stagger ? Math.random() * (maxLife + delay) - delay : -delay,
    };
  };

  potion.bubbles = Array.from({ length: bubbleCfg.count }, () => makeBubble(true));
  potion.crosses = Array.from({ length: crossCfg.count }, () => makeCross(true));

  potion.updateParticles = () => {
    for (let i = 0; i < potion.bubbles.length; i++) {
      const b = potion.bubbles[i];
      b.life++;
      if (b.life >= b.maxLife) potion.bubbles[i] = makeBubble(false);
    }
    for (let i = 0; i < potion.crosses.length; i++) {
      const c = potion.crosses[i];
      c.life++;
      if (c.life >= c.maxLife) potion.crosses[i] = makeCross(false);
    }
  };

  // Bubble palette mirrors the original baked-in pixels: pinkish white body
  // for most of the rise, near-white as it nears the surface (read as
  // "catching the light just before popping").
  const BUBBLE_BODY = "#fcd6d6";
  const BUBBLE_BRIGHT = "#fcf4f4";
  // Heal cross: dim brick on entry/exit, bright pink-red mid-rise.
  const CROSS_DIM = "#aa3c50";
  const CROSS_BRIGHT = "#fc6078";

  const drawBubble = (ctx, ox, oy, b) => {
    if (b.life <= 0) return;
    const t = b.life / b.maxLife;
    const y = Math.round(bubbleCfg.yBottom + (bubbleCfg.yTop - bubbleCfg.yBottom) * t);
    ctx.fillStyle = t > 0.65 ? BUBBLE_BRIGHT : BUBBLE_BODY;
    ctx.fillRect(ox + b.x, oy + y, 1, 1);
    ctx.fillRect(ox + b.x + 1, oy + y, 1, 1);
  };

  const drawCross = (ctx, ox, oy, c) => {
    if (c.life <= 0) return;
    const t = c.life / c.maxLife;
    const cy = Math.round(crossCfg.yBottom + (crossCfg.yTop - crossCfg.yBottom) * t);
    const bright = t > 0.2 && t < 0.8;
    ctx.fillStyle = bright ? CROSS_BRIGHT : CROSS_DIM;
    const cx = c.x;
    ctx.fillRect(ox + cx, oy + cy - 1, 1, 1);
    ctx.fillRect(ox + cx - 1, oy + cy, 1, 1);
    ctx.fillRect(ox + cx, oy + cy, 1, 1);
    ctx.fillRect(ox + cx + 1, oy + cy, 1, 1);
    ctx.fillRect(ox + cx, oy + cy + 1, 1, 1);
  };

  potion.draw = (ctx) => {
    ctx.drawImage(...Object.values(potion.drawOptions));
    if (!potion.dropping) {
      const ox = potion.drawOptions.x;
      const oy = potion.drawOptions.y;
      for (const b of potion.bubbles) drawBubble(ctx, ox, oy, b);
      for (const c of potion.crosses) drawCross(ctx, ox, oy, c);
    }
    potion.colBox.centerOnEntity();
    potion.colBox.draw(ctx);
  };

  potion.collect = () => {
    if (potion.dropping) return false;
    const player = potion.gameState.session.player;
    if (
      potion.collidedOnSide("top", player) ||
      potion.collidedOnSide("bottom", player) ||
      potion.collidedOnSide("left", player) ||
      potion.collidedOnSide("right", player)
    ) {
      playHpPotionSound();
      return true;
    }
    return false;
  };

  potion.animate = (room) => {
    if (potion.dropping) {
      potion.updateDrop(room);
      return;
    }
    potion.updateParticles();
  };

  return potion;
}

export default createHpPotion;
