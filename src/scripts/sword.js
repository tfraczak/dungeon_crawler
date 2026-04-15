import GAME_CONFIG from "./game_config";

function drawSwordSlash(ctx, player) {
  const hitbox = player.attackHitbox();
  const duration = GAME_CONFIG.player.attackDuration;
  const progress = 1 - (player.attackTimer / duration);
  const arcSpan = hitbox.endAngle - hitbox.startAngle;
  const sweepEnd = hitbox.startAngle + arcSpan * progress;
  const sweepStart = hitbox.startAngle;
  const outerR = hitbox.range;
  const innerR = hitbox.range * 0.4;
  const alpha = Math.max(0, 0.85 * (1 - progress * 0.5));

  ctx.save();

  // Tapered crescent — thick at leading edge, tapering to a point at the tail
  ctx.beginPath();
  const steps = 24;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = sweepStart + (sweepEnd - sweepStart) * t;
    ctx.lineTo(hitbox.x + Math.cos(angle) * outerR, hitbox.y + Math.sin(angle) * outerR);
  }
  for (let i = steps; i >= 0; i--) {
    const t = i / steps;
    const angle = sweepStart + (sweepEnd - sweepStart) * t;
    const taper = outerR - (outerR - innerR) * Math.pow(t, 3);
    ctx.lineTo(hitbox.x + Math.cos(angle) * taper, hitbox.y + Math.sin(angle) * taper);
  }
  ctx.closePath();
  ctx.fillStyle = `rgba(230, 220, 240, ${alpha})`;
  ctx.fill();
  ctx.strokeStyle = `rgba(160, 150, 180, ${alpha * 0.6})`;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Inner glow along the leading edge
  const glowAlpha = alpha * 0.4;
  const midR = (outerR + innerR) / 2;
  const glowSpan = (sweepEnd - sweepStart) * 0.25;
  ctx.beginPath();
  ctx.arc(hitbox.x, hitbox.y, midR, Math.max(sweepEnd - glowSpan, sweepStart), sweepEnd);
  ctx.strokeStyle = `rgba(255, 255, 255, ${glowAlpha})`;
  ctx.lineWidth = (outerR - innerR) * 0.3;
  ctx.stroke();

  // Hilt at the leading edge
  const hiltAngle = sweepEnd;
  const hiltInner = innerR * 0.45;
  const hiltOuter = innerR * 0.95;
  ctx.beginPath();
  ctx.moveTo(hitbox.x + Math.cos(hiltAngle) * hiltInner, hitbox.y + Math.sin(hiltAngle) * hiltInner);
  ctx.lineTo(hitbox.x + Math.cos(hiltAngle) * hiltOuter, hitbox.y + Math.sin(hiltAngle) * hiltOuter);
  ctx.strokeStyle = `rgba(60, 50, 70, ${alpha})`;
  ctx.lineWidth = 3.5;
  ctx.lineCap = "round";
  ctx.stroke();

  // Crossguard
  const crossLen = 5;
  const perpAngle = hiltAngle + Math.PI / 2;
  const guardX = hitbox.x + Math.cos(hiltAngle) * hiltOuter;
  const guardY = hitbox.y + Math.sin(hiltAngle) * hiltOuter;
  ctx.beginPath();
  ctx.moveTo(guardX + Math.cos(perpAngle) * crossLen, guardY + Math.sin(perpAngle) * crossLen);
  ctx.lineTo(guardX - Math.cos(perpAngle) * crossLen, guardY - Math.sin(perpAngle) * crossLen);
  ctx.strokeStyle = `rgba(50, 40, 60, ${alpha})`;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.restore();
}

export default drawSwordSlash;
