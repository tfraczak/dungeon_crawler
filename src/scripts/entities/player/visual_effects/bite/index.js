import Random from "@utils/random";

export const setupBiteEffect = (player) => {
  player.biteMarks = [];

  player.showBiteMark = (hitCenter, biteConfig = {}) => {
    const duration = biteConfig.markDurationFrames ?? 18;
    const snapFrames = biteConfig.snapFrames ?? 5;
    const width = biteConfig.markWidth ?? 28;
    const fangLength = biteConfig.fangLength ?? 13;
    const openDistance = biteConfig.openDistance ?? 20;
    const closedGap = biteConfig.closedGap ?? 0;
    const verticalOffset = biteConfig.verticalOffset ?? 0;
    const oozeCount = biteConfig.oozeCount ?? 0;
    const x = hitCenter?.[0] ?? player.center[0];
    const y = (hitCenter?.[1] ?? player.center[1]) + verticalOffset;
    player.biteMarks.push({
      offsetX: Math.max(10, Math.min(player.width - 10, x - player.pos[0])),
      offsetY: Math.max(10, Math.min(player.height - 12, y - player.pos[1])),
      width,
      fangLength,
      snapFrames,
      openDistance,
      closedGap,
      oozes: Array.from({ length: oozeCount }, () => ({
        origin: Random.chance(0.5) ? "top" : "bottom",
        startX: Random.range(-(width * 0.38), width * 0.38),
        startY: Random.range(-2, 3),
        endX: Random.range(-8, 8),
        controlX: Random.range(-9, 9),
        length: Random.range(24, 46),
        width: Random.range(3, 6),
        delay: snapFrames + Random.int(0, 5),
      })),
      life: duration,
      maxLife: duration,
    });
    player.biteMarks = player.biteMarks.slice(-4);
  };
};

export const updateBiteEffects = (player) => {
  player.biteMarks.forEach((mark) => { mark.life--; });
  player.biteMarks = player.biteMarks.filter(mark => mark.life > 0);
};

export const drawBiteEffects = (ctx, player) => {
  for (const mark of player.biteMarks) {
    const alpha = Math.max(0, mark.life / mark.maxLife);
    const age = mark.maxLife - mark.life;
    const snapProgress = Math.min(1, age / mark.snapFrames);
    const snapEase = 1 - ((1 - snapProgress) ** 3);
    const openOffset = mark.openDistance * (1 - snapEase);
    const x = player.pos[0] + mark.offsetX;
    const y = player.pos[1] + mark.offsetY;
    const spread = mark.width / 2;
    const fangLength = mark.fangLength;
    const nonFangLength = fangLength * 0.58;
    const closedGap = mark.closedGap ?? 0;
    const toothWidth = Math.max(5, mark.width / 7);
    const drawToothSet = (baseY, direction) => {
      const teeth = [
        { x: -0.78, length: fangLength * 1.05, width: toothWidth * 1.15 },
        { x: -0.38, length: nonFangLength, width: toothWidth },
        { x: 0, length: nonFangLength, width: toothWidth * 0.9 },
        { x: 0.38, length: nonFangLength, width: toothWidth },
        { x: 0.78, length: fangLength * 1.05, width: toothWidth * 1.15 },
      ];

      for (const tooth of teeth) {
        const centerX = x + (spread * tooth.x);
        const rootY = baseY;
        const tipY = baseY + (tooth.length * direction);
        ctx.beginPath();
        ctx.moveTo(centerX - tooth.width, rootY);
        ctx.lineTo(centerX, tipY);
        ctx.lineTo(centerX + tooth.width, rootY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    };

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 2;
    ctx.shadowColor = "rgba(45, 0, 35, 0.7)";
    ctx.shadowBlur = 3;
    ctx.fillStyle = "rgba(255, 250, 220, 0.98)";
    ctx.strokeStyle = "rgba(35, 0, 25, 0.95)";
    drawToothSet(y + openOffset + nonFangLength + (closedGap / 2), -1);
    drawToothSet(y - openOffset - nonFangLength - (closedGap / 2), 1);

    ctx.shadowBlur = 0;
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = `rgba(190, 25, 75, ${0.82 * snapEase})`;
    ctx.beginPath();
    ctx.arc(x, y + 4, spread * 0.62, 0.14 * Math.PI, 0.86 * Math.PI);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = `rgba(190, 25, 75, ${0.58 * snapEase})`;
    ctx.beginPath();
    ctx.arc(x, y - 4, spread * 0.42, 1.14 * Math.PI, 1.86 * Math.PI);
    ctx.stroke();
    for (const ooze of mark.oozes) {
      const oozeAge = age - ooze.delay;
      if (oozeAge < 0) continue;
      const oozeDuration = Math.max(1, mark.maxLife - ooze.delay);
      const oozeProgress = Math.min(1, oozeAge / oozeDuration);
      const oozeAlpha = alpha * Math.sin(oozeProgress * Math.PI) * 0.85;
      const startX = x + ooze.startX;
      const startY = (
        ooze.origin === "top"
          ? y - openOffset - (closedGap / 2)
          : y + openOffset + (closedGap / 2)
      ) + ooze.startY;
      const endX = startX + (ooze.endX * oozeProgress);
      const endY = startY + (ooze.length * oozeProgress);
      ctx.save();
      ctx.globalAlpha = oozeAlpha;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(115, 10, 180, 1)";
      ctx.lineWidth = ooze.width;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(
        startX + ooze.controlX,
        startY + (ooze.length * 0.35 * oozeProgress),
        endX - (ooze.controlX * 0.45),
        startY + (ooze.length * 0.72 * oozeProgress),
        endX,
        endY,
      );
      ctx.stroke();
      ctx.strokeStyle = "rgba(240, 170, 255, 0.78)";
      ctx.lineWidth = Math.max(1.2, ooze.width * 0.42);
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }
};
