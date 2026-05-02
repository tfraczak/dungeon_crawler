import DEV_FLAGS from "@core/dev_flags";
import Random from "@utils/random";
import { playPoisonStatusEffect } from "./sound";

const makePoisonBubble = (width, height, stagger = true) => {
  const maxLife = Random.int(34, 58);
  return {
    x: Random.range(width * 0.28, width * 0.72),
    y: Random.range(height * 0.48, height * 0.92),
    radius: Random.range(1.5, 3.6),
    driftX: Random.range(-0.18, 0.18),
    rise: Random.range(0.35, 0.75),
    life: stagger ? Random.int(0, maxLife - 1) : 0,
    maxLife,
  };
};

const poisonIntensity = player => (
  player.poisonDuration > 0
    ? Math.max(0, Math.min(1, player.poisonTimer / player.poisonDuration))
    : 0
);

const poisonPulseActive = player => (
  player.poisonTimer > 0
  && (player.poisonDuration - player.poisonTimer) % 60 < player.poisonConfig.stumblePulseFrames
);

const updatePoisonBubbles = (player) => {
  if (player.poisonTimer <= 0) {
    player.poisonBubbles = [];
    return;
  }

  const visibleCount = Math.round(player.poisonConfig.bubbleCount * poisonIntensity(player));
  player.poisonBubbles = player.poisonBubbles.slice(0, visibleCount).map((bubble) => {
    const next = { ...bubble };
    next.life++;
    next.x += next.driftX;
    next.y -= next.rise;
    if (next.life >= next.maxLife || next.y < player.height * 0.2) {
      return makePoisonBubble(player.width, player.height, false);
    }
    return next;
  });
};

export const setupPoisonStatus = (player) => {
  player.poisonTimer = 0;
  player.poisonDuration = 0;
  player.poisonDamageTickTimer = 0;
  player.poisonBubbles = [];
  player.poisonConfig = {
    durationFrames: 0,
    damageTickFrames: 60,
    damageMin: 1,
    damageMax: 2,
    stumblePulseFrames: 0,
    stumbleSlowMultiplier: 1,
    stumbleDriftStrength: 0,
    staminaDrainMultiplier: 1,
    bubbleCount: 0,
  };

  player.applyPoison = (poisonConfig) => {
    playPoisonStatusEffect();
    player.poisonConfig = {
      ...player.poisonConfig,
      ...poisonConfig,
    };
    player.poisonDuration = player.poisonConfig.durationFrames;
    player.poisonTimer = player.poisonDuration;
    player.poisonDamageTickTimer = player.poisonConfig.damageTickFrames;
    player.poisonBubbles = Array.from(
      { length: player.poisonConfig.bubbleCount },
      () => makePoisonBubble(player.width, player.height),
    );
  };
};

export const updatePoisonStatus = (player) => {
  if (player.poisonTimer > 0) {
    player.poisonTimer--;
    player.poisonDamageTickTimer--;
    if (player.poisonDamageTickTimer <= 0) {
      player.poisonDamageTickTimer = player.poisonConfig.damageTickFrames;
      const damage = Math.round(
        Random.int(player.poisonConfig.damageMin, player.poisonConfig.damageMax) * poisonIntensity(player),
      );
      if (!DEV_FLAGS.godMode && damage > 0) {
        player.hp -= damage;
        if (player.hp < 0) player.hp = 0;
      }
    }
  }
  if (player.poisonTimer < 0) player.poisonTimer = 0;
  updatePoisonBubbles(player);
};

export const applyPoisonSpeedModifier = (player) => {
  if (!poisonPulseActive(player)) return;

  const intensity = poisonIntensity(player);
  player.speedModifier *= 1 - ((1 - player.poisonConfig.stumbleSlowMultiplier) * intensity);
};

export const poisonStaminaDrainMultiplier = (player) => {
  const intensity = poisonIntensity(player);
  return 1 + ((player.poisonConfig.staminaDrainMultiplier - 1) * intensity);
};

export const applyPoisonMovementDrift = (player, up, down, left, right) => {
  if (!poisonPulseActive(player)) return;

  const dirX = (right ? 1 : 0) - (left ? 1 : 0);
  const dirY = (down ? 1 : 0) - (up ? 1 : 0);
  const dist = Math.sqrt((dirX * dirX) + (dirY * dirY));
  if (dist === 0) return;

  const pulseIndex = Math.floor((player.poisonDuration - player.poisonTimer) / 60);
  const driftSign = pulseIndex % 2 === 0 ? 1 : -1;
  const drift = player.speed * player.poisonConfig.stumbleDriftStrength * poisonIntensity(player);
  player.pos[0] += (-dirY / dist) * drift * driftSign;
  player.pos[1] += (dirX / dist) * drift * driftSign;
};

export const drawPoisonStatus = (ctx, player, poisonMask) => {
  if (player.poisonTimer <= 0 || !poisonMask.ctx) return;

  const intensity = poisonIntensity(player);
  const alpha = intensity * 0.44;
  poisonMask.ctx.clearRect(0, 0, player.width, player.height);
  poisonMask.ctx.drawImage(
    player.spritePalette,
    player.drawOptions.palX,
    player.drawOptions.palY,
    player.width,
    player.height,
    0,
    0,
    player.width,
    player.height,
  );
  poisonMask.ctx.globalCompositeOperation = "source-in";
  poisonMask.ctx.fillStyle = `rgba(160, 70, 210, ${alpha})`;
  poisonMask.ctx.fillRect(0, 0, player.width, player.height);
  poisonMask.ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(poisonMask.mask, player.pos[0], player.pos[1]);

  for (const bubble of player.poisonBubbles) {
    const bubbleAlpha = Math.sin((bubble.life / bubble.maxLife) * Math.PI) * 0.72 * intensity;
    ctx.save();
    ctx.globalAlpha = bubbleAlpha;
    ctx.fillStyle = "rgba(190, 70, 235, 0.8)";
    ctx.strokeStyle = "rgba(245, 205, 255, 0.8)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(player.pos[0] + bubble.x, player.pos[1] + bubble.y, bubble.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
};
