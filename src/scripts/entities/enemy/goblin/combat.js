import DEV_FLAGS, { configValue } from "@core/dev_flags";
import createCoin from "@entities/coin/coin";
import { playCoinStolen } from "@entities/coin/sound";
import { resolveIncomingPlayerHit } from "@entities/player/incoming_hit";
import createDagger from "@items/equipment/weapons/daggers/dagger/dagger";
import createShortsword from "@items/equipment/weapons/swords/shortsword/shortsword";
import Random from "@utils/random";
import GOBLIN_CONFIG from "./config";

const facingToward = (from, to) => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  if (Math.abs(dy) > Math.abs(dx)) return dy < 0 ? "up" : "down";
  return dx < 0 ? "left" : "right";
};

const drawStealArc = (ctx, center, facing, attackTimer, weapon) => {
  const hitbox = weapon.computeHitbox(center, facing, attackTimer);
  const progress = Math.max(0, Math.min(1, 1 - (attackTimer / weapon.duration)));
  const sweepStart = hitbox.startAngle;
  const sweepEnd = hitbox.endAngle;
  const outerR = hitbox.range * 0.82;
  const innerR = hitbox.range * 0.48;
  const alpha = Math.max(0, 0.85 * (1 - progress * 0.35));
  const steps = 16;

  ctx.save();
  ctx.lineCap = "round";
  for (let i = 0; i < 3; i++) {
    const t = i / 2;
    const radius = innerR + ((outerR - innerR) * t);
    ctx.beginPath();
    for (let step = 0; step <= steps; step++) {
      const sweepT = step / steps;
      const angle = sweepStart + ((sweepEnd - sweepStart) * sweepT);
      const x = hitbox.x + (Math.cos(angle) * radius);
      const y = hitbox.y + (Math.sin(angle) * radius);
      if (step === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(255, 232, 138, ${alpha * (0.35 + t * 0.45)})`;
    ctx.lineWidth = 2.8 - t;
    ctx.stroke();
  }
  ctx.restore();
};

const applyPlayerHit = (player, goblin) => {
  const result = resolveIncomingPlayerHit(player, {
    source: goblin,
    sourceCenter: goblin.center,
    hitCenter: player.center,
    damage: () => goblin.weapon.rollDamage(),
    knockback: goblin.weapon.knockback,
  });
  return result.hit;
};

const roomHasUnclaimedStolenCoin = (room) => (
  Object.values(room?.coins ?? {}).some(coin => coin.stolen && !coin.claimedBy)
);

const spawnStolenCoin = (goblin, player, gameState) => {
  const coin = createCoin(
    [player.center[0] - 8, player.center[1] - 8],
    16, 16, gameState.sprites.coin, gameState,
  );
  coin.stolen = true;
  coin.stolenBy = goblin.id;
  coin.claimedBy = null;
  coin.startDrop(player.center[0], player.center[1]);
  coin.updateSides();
  goblin.room.coins[coin.id] = coin;
  playCoinStolen();
};

export const setupGoblinDaggerCombat = (goblin, gameState) => {
  goblin.weapon = createDagger({
    sprite: gameState.sprites.dagger,
    range: GOBLIN_CONFIG.dagger.range,
    cooldown: GOBLIN_CONFIG.dagger.cooldown,
    duration: GOBLIN_CONFIG.dagger.duration,
  });
  goblin.attackTimer = 0;
  goblin.attackCooldownTimer = 0;
  goblin.attackHitPlayer = false;
  goblin.attackFacing = "down";
  goblin.stealTimer = 0;
  goblin.stealFacing = "down";
  goblin.actionLockoutTimer = 0;
  goblin.attacksSinceStealAttempt = 1;
  goblin.stealWeapon = createShortsword({
    sprite: gameState.sprites.shortsword,
    duration: GOBLIN_CONFIG.steal.animationDuration,
    knockback: 0,
    range: GOBLIN_CONFIG.steal.range,
  });

  goblin.isAttacking = () => goblin.attackTimer > 0;
  goblin.isStealing = () => goblin.stealTimer > 0;

  const startAttack = (player) => {
    goblin.attackFacing = facingToward(goblin.center, player.center);
    goblin.spriteDir = goblin.attackFacing;
    goblin.attackTimer = goblin.weapon.duration;
    goblin.attackCooldownTimer = goblin.weapon.cooldown;
    goblin.attackHitPlayer = false;
    goblin.actionLockoutTimer = GOBLIN_CONFIG.steal.actionLockoutFrames;
    goblin.attacksSinceStealAttempt++;
    goblin.weapon.onAttackStart();
  };

  const startStealAttempt = (player) => {
    goblin.stealFacing = facingToward(goblin.center, player.center);
    goblin.spriteDir = goblin.stealFacing;
    goblin.stealTimer = goblin.stealWeapon.duration;
    goblin.actionLockoutTimer = GOBLIN_CONFIG.steal.actionLockoutFrames;
    goblin.attacksSinceStealAttempt = 0;

    const stealChance = configValue({
      value: GOBLIN_CONFIG.steal.chance,
      override: DEV_FLAGS.enemyGoblinStealChance,
    });
    if (
      gameState.session.coinCount <= 0
      || roomHasUnclaimedStolenCoin(goblin.room)
      || !Random.chance(Math.max(0, Math.min(1, stealChance)))
    ) {
      return;
    }

    gameState.session.coinCount--;
    spawnStolenCoin(goblin, player, gameState);
  };

  const attackHitbox = () => (
    goblin.weapon.computeHitbox(goblin.center, goblin.attackFacing)
  );

  const canTrySteal = (player) => {
    if (gameState.session.coinCount <= 0) return false;
    if (player.invulnerable) return false;
    if (goblin.attacksSinceStealAttempt < GOBLIN_CONFIG.steal.attacksBetweenAttempts) return false;
    const facing = facingToward(goblin.center, player.center);
    const hitbox = goblin.stealWeapon.computeHitbox(goblin.center, facing);
    return goblin.stealWeapon.hitsTarget(hitbox, player.colBox);
  };

  goblin.hitPlayer = () => {
    const player = gameState.session.player;
    if (!player) return;

    if (goblin.attackCooldownTimer > 0) goblin.attackCooldownTimer--;
    if (goblin.attackTimer > 0) goblin.attackTimer--;
    if (goblin.stealTimer > 0) goblin.stealTimer--;
    if (goblin.actionLockoutTimer > 0) goblin.actionLockoutTimer--;
    if (goblin.hp < GOBLIN_CONFIG.lowHpThreshold || goblin.hasStolenCoin || goblin.coinAlertActive) {
      goblin.attackTimer = 0;
      return;
    }

    if (
      !goblin.isAttacking()
      && !goblin.isStealing()
      && goblin.actionLockoutTimer === 0
      && goblin.attackCooldownTimer > 0
      && canTrySteal(player)
    ) {
      startStealAttempt(player);
    }

    if (!goblin.isAttacking() && !goblin.isStealing() && goblin.actionLockoutTimer === 0 && goblin.attackCooldownTimer === 0) {
      const facing = facingToward(goblin.center, player.center);
      const hitbox = goblin.weapon.computeHitbox(goblin.center, facing);
      if (goblin.weapon.hitsTarget(hitbox, player.colBox)) startAttack(player);
    }

    if (!goblin.isAttacking() || goblin.attackHitPlayer) return;

    const hitbox = attackHitbox();
    if (goblin.weapon.hitsTarget(hitbox, player.colBox)) {
      goblin.attackHitPlayer = applyPlayerHit(player, goblin);
      if (goblin.attackHitPlayer) goblin.weapon.onHit();
    }
  };

  const baseDraw = goblin.draw;
  goblin.draw = (ctx) => {
    if (goblin.isStealing() && goblin.stealFacing === "up") {
      drawStealArc(ctx, goblin.center, goblin.stealFacing, goblin.stealTimer, goblin.stealWeapon);
    }
    if (goblin.isAttacking() && goblin.attackFacing === "up") {
      goblin.weapon.drawSlash(ctx, goblin.center, goblin.attackFacing, goblin.attackTimer);
    }
    baseDraw(ctx);
    if (goblin.isAttacking() && goblin.attackFacing !== "up") {
      goblin.weapon.drawSlash(ctx, goblin.center, goblin.attackFacing, goblin.attackTimer);
    }
    if (goblin.isStealing() && goblin.stealFacing !== "up") {
      drawStealArc(ctx, goblin.center, goblin.stealFacing, goblin.stealTimer, goblin.stealWeapon);
    }
  };
};
