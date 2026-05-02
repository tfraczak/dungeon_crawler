import GOBLIN_CONFIG from "./config";

const drawExclamation = (ctx, goblin, alpha) => {
  const x = goblin.center[0];
  const y = goblin.pos[1] - 7;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#ffe45c";
  ctx.strokeStyle = "#5f4210";
  ctx.lineWidth = 1;
  ctx.fillRect(x - 2, y, 4, 12);
  ctx.strokeRect(x - 2, y, 4, 12);
  ctx.beginPath();
  ctx.arc(x, y + 17, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

const drawGlint = (ctx, x, y, size, alpha) => {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = "#ffe88a";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x + size, y);
  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y + size);
  ctx.stroke();
  ctx.restore();
};

const drawCarrierGlints = (ctx, goblin) => {
  const phase = (Date.now() % GOBLIN_CONFIG.glint.periodMs) / GOBLIN_CONFIG.glint.periodMs;
  const pulse = Math.sin(phase * Math.PI);
  const glints = [
    { x: goblin.center[0] + 7, y: goblin.pos[1] + 21, delay: 0 },
    { x: goblin.center[0] - 6, y: goblin.pos[1] + 28, delay: 0.45 },
  ];

  glints.forEach((glint) => {
    const localPhase = (phase + glint.delay) % 1;
    const alpha = Math.max(0, Math.sin(localPhase * Math.PI)) * 0.9;
    drawGlint(ctx, glint.x, glint.y, 2.5 + (pulse * 1.5), alpha);
  });
};

export const setupGoblinStealVisuals = (goblin) => {
  const baseDraw = goblin.draw;
  goblin.coinAlertFadeTimer = 0;

  goblin.draw = (ctx) => {
    baseDraw(ctx);

    if (goblin.coinAlertActive || goblin.coinAlertFadeTimer > 0) {
      const alpha = goblin.coinAlertActive
        ? 1
        : Math.max(0, goblin.coinAlertFadeTimer / GOBLIN_CONFIG.alert.fadeFrames);
      drawExclamation(ctx, goblin, alpha);
      if (!goblin.coinAlertActive) goblin.coinAlertFadeTimer--;
    }

    if (goblin.hasStolenCoin) drawCarrierGlints(ctx, goblin);
  };
};
