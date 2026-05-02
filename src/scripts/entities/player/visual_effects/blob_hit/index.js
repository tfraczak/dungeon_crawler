import Random from "@utils/random";

const makeBurstPoints = () => (
  Array.from({ length: 20 }, (_, index) => {
    const outer = index % 2 === 0;
    const baseAngle = (index / 20) * Math.PI * 2;
    return {
      angle: baseAngle + Random.range(-0.08, 0.08),
      radius: outer ? Random.range(0.92, 1.24) : Random.range(0.48, 0.68),
    };
  })
);

const drawBurstPath = (ctx, x, y, points, radius, scaleY) => {
  ctx.beginPath();
  points.forEach((point, index) => {
    const px = x + (Math.cos(point.angle) * radius * point.radius);
    const py = y + (Math.sin(point.angle) * radius * point.radius * scaleY);
    if (index === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();
};

export const setupBlobHitEffect = (player) => {
  player.blobHitMarks = [];

  player.showBlobHit = (hitCenter, hitConfig = {}) => {
    const duration = hitConfig.durationFrames ?? 30;
    const burstDurationFrames = hitConfig.burstDurationFrames ?? hitConfig.powDurationFrames ?? 14;
    const splatCount = hitConfig.splatCount ?? 8;
    const oozeCount = hitConfig.oozeCount ?? 7;
    const x = hitCenter?.[0] ?? player.center[0];
    const y = hitCenter?.[1] ?? player.center[1];
    const oozeCenter = player.flyingHitBox?.center ?? player.center;
    const oozeOffsetY = (oozeCenter[1] - player.pos[1]) + (player.height * 0.16);
    player.blobHitMarks.push({
      offsetX: Math.max(10, Math.min(player.width - 10, x - player.pos[0])),
      offsetY: Math.max(10, Math.min(player.height - 8, y - player.pos[1])),
      oozeOffsetX: Math.max(10, Math.min(player.width - 10, oozeCenter[0] - player.pos[0])),
      oozeOffsetY: Math.max(8, Math.min(player.height - 8, oozeOffsetY)),
      oozeColor: hitConfig.oozeColor ?? "rgba(60, 165, 235, 0.92)",
      oozeHighlightColor: hitConfig.oozeHighlightColor ?? "rgba(190, 235, 255, 0.7)",
      splats: Array.from({ length: splatCount }, () => ({
        x: Random.range(-10.5, 10.5),
        y: Random.range(-6, 6),
        radiusX: Random.range(2.25, 6),
        radiusY: Random.range(1.5, 4.5),
        angle: Random.range(0, Math.PI),
        alpha: Random.range(0.45, 0.9),
      })),
      oozes: Array.from({ length: oozeCount }, () => ({
        startX: Random.range(-11.25, 11.25),
        startY: Random.range(-3, 6),
        endX: Random.range(-7.5, 7.5),
        controlX: Random.range(-9, 9),
        length: Random.range(14, 30),
        width: Random.range(3.25, 5.75),
        distanceScale: Random.range(0.62, 0.74),
        speed: Random.range(0.42, 0.58),
        wobble: Random.range(0.4, 1.6),
        lumps: Array.from({ length: Random.int(1, 3) }, () => ({
          at: Random.range(0.28, 0.78),
          radius: Random.range(1.5, 3.5),
        })),
        phase: Random.range(0, Math.PI * 2),
        delay: Random.int(2, 8),
      })),
      life: duration,
      maxLife: duration,
      burstDurationFrames,
      burstPoints: makeBurstPoints(),
    });
    player.blobHitMarks = player.blobHitMarks.slice(-4);
  };
};

export const updateBlobHitEffects = (player) => {
  player.blobHitMarks.forEach((mark) => { mark.life--; });
  player.blobHitMarks = player.blobHitMarks.filter(mark => mark.life > 0);
};

export const drawBlobHitEffects = (ctx, player) => {
  for (const mark of player.blobHitMarks) {
    const alpha = Math.max(0, mark.life / mark.maxLife);
    const age = mark.maxLife - mark.life;
    const x = player.pos[0] + mark.offsetX;
    const y = player.pos[1] + mark.offsetY;
    const oozeX = player.pos[0] + mark.oozeOffsetX;
    const oozeY = player.pos[1] + mark.oozeOffsetY;
    const burstAlpha = Math.max(0, 1 - (age / mark.burstDurationFrames));
    const burstRadius = 6 + (age * 0.75);

    if (burstAlpha > 0) {
      ctx.save();
      ctx.globalAlpha = burstAlpha * 0.32;
      ctx.setLineDash([2, 2]);
      ctx.strokeStyle = "rgba(20, 75, 130, 0.85)";
      ctx.lineWidth = 2;
      drawBurstPath(ctx, x + 2, y + 2, mark.burstPoints, burstRadius * 0.96, 0.78);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = burstAlpha;
      ctx.strokeStyle = "rgba(245, 250, 255, 0.95)";
      ctx.lineWidth = 3.5;
      drawBurstPath(ctx, x, y, mark.burstPoints, burstRadius, 0.78);
      ctx.stroke();
      ctx.strokeStyle = "rgba(20, 55, 90, 0.95)";
      ctx.lineWidth = 1.5;
      drawBurstPath(ctx, x, y, mark.burstPoints, burstRadius, 0.78);
      ctx.stroke();
      ctx.restore();
    }

    for (const splat of mark.splats) {
      const splatAlpha = alpha * splat.alpha;
      ctx.save();
      ctx.globalAlpha = splatAlpha;
      ctx.translate(oozeX + splat.x, oozeY + splat.y);
      ctx.rotate(splat.angle);
      ctx.fillStyle = mark.oozeColor;
      ctx.strokeStyle = mark.oozeHighlightColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, splat.radiusX, splat.radiusY, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    for (const ooze of mark.oozes) {
      const oozeAge = age - ooze.delay;
      if (oozeAge < 0) continue;
      const oozeDuration = Math.max(1, mark.maxLife - ooze.delay);
      const oozeProgress = Math.min(1, (oozeAge / oozeDuration) * (ooze.speed ?? 1));
      const easedProgress = (1 - ((1 - oozeProgress) ** 2)) * (ooze.distanceScale ?? 1);
      const oozeAlpha = alpha * Math.sin(oozeProgress * Math.PI) * 0.95;
      const startX = oozeX + ooze.startX;
      const startY = oozeY + ooze.startY;
      const sag = ooze.length * easedProgress;
      const endX = startX + (ooze.endX * easedProgress) + (Math.sin((age * 0.12) + ooze.phase) * ooze.wobble * easedProgress);
      const endY = startY + sag;
      ctx.save();
      ctx.globalAlpha = oozeAlpha;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = mark.oozeColor;
      ctx.lineWidth = ooze.width;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(
        startX + ooze.controlX,
        startY + (sag * 0.28),
        endX - (ooze.controlX * 0.35),
        startY + (sag * 0.72),
        endX,
        endY,
      );
      ctx.stroke();
      ctx.strokeStyle = mark.oozeHighlightColor;
      ctx.lineWidth = Math.max(1, ooze.width * 0.35);
      ctx.stroke();
      ctx.fillStyle = mark.oozeColor;
      ctx.strokeStyle = mark.oozeHighlightColor;
      ctx.lineWidth = 1;
      for (const lump of ooze.lumps) {
        const lumpProgress = Math.min(1, easedProgress / lump.at);
        const lumpX = startX + ((endX - startX) * lump.at * lumpProgress);
        const lumpY = startY + (sag * lump.at * lumpProgress);
        ctx.beginPath();
        ctx.ellipse(lumpX, lumpY, lump.radius * 1.1, lump.radius * 0.85, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.ellipse(endX, endY, ooze.width * 0.9, ooze.width * 1.15, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }
};
