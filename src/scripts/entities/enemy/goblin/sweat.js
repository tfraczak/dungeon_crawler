import Random from "@utils/random";
import GOBLIN_CONFIG from "./config";

const drawDrop = (ctx, x, y, scale, alpha) => {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#8ee8ff";
  ctx.strokeStyle = "#2d89b8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(x, y, 2.2 * scale, 3.6 * scale, -0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

export const setupGoblinSweat = (goblin) => {
  const baseDraw = goblin.draw;
  const drops = Array.from({ length: 3 }, (_, i) => ({
    drift: Random.range(9, 14),
    phaseOffsetMs: Random.int(0, GOBLIN_CONFIG.sweat.periodMs - 1),
    scale: Random.range(0.7, 1.15),
    side: i === 0 ? -1 : i === 1 ? 1 : Random.pick([-1, 1]),
    xOffset: Random.range(6, 12),
    yOffset: Random.range(4, 9),
  }));

  goblin.draw = (ctx) => {
    baseDraw(ctx);
    if (goblin.hp >= GOBLIN_CONFIG.lowHpThreshold || goblin.hasStolenCoin) return;

    const now = Date.now();
    const headY = goblin.pos[1] + 8;
    const headX = goblin.center[0];

    for (const drop of drops) {
      const phase = ((now + drop.phaseOffsetMs) % GOBLIN_CONFIG.sweat.periodMs) / GOBLIN_CONFIG.sweat.periodMs;
      const x = headX + (drop.side * drop.xOffset);
      const y = headY + drop.yOffset + (phase * drop.drift);
      const alpha = 0.9 * (1 - phase);
      const scale = drop.scale + (phase * 0.25);
      drawDrop(ctx, x, y, scale, alpha);
    }
  };
};
