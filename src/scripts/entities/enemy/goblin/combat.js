import DEV_FLAGS from "@core/dev_flags";
import createDagger from "@items/equipment/weapons/daggers/dagger/dagger";

const LOW_HP_THRESHOLD = 10;
const GOBLIN_DAGGER_RANGE = 12;
const GOBLIN_DAGGER_COOLDOWN = 90;
const GOBLIN_DAGGER_DURATION = 8;

const facingToward = (from, to) => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  if (Math.abs(dy) > Math.abs(dx)) return dy < 0 ? "up" : "down";
  return dx < 0 ? "left" : "right";
};

const applyPlayerHit = (player, goblin) => {
  if (player.invulnerable) return false;

  const dx = player.center[0] - goblin.center[0];
  const dy = player.center[1] - goblin.center[1];
  const dist = Math.sqrt((dx * dx) + (dy * dy)) || 1;
  player.knockbackVx = (dx / dist) * goblin.weapon.knockback;
  player.knockbackVy = (dy / dist) * goblin.weapon.knockback;

  if (!DEV_FLAGS.godMode) {
    player.hp -= goblin.weapon.rollDamage();
    if (player.hp < 0) player.hp = 0;
  }

  player.hit();
  return true;
};

export const setupGoblinDaggerCombat = (goblin, gameState) => {
  goblin.weapon = createDagger({
    sprite: gameState.sprites.dagger,
    range: GOBLIN_DAGGER_RANGE,
    cooldown: GOBLIN_DAGGER_COOLDOWN,
    duration: GOBLIN_DAGGER_DURATION,
  });
  goblin.attackTimer = 0;
  goblin.attackCooldownTimer = 0;
  goblin.attackHitPlayer = false;
  goblin.attackFacing = "down";

  goblin.isAttacking = () => goblin.attackTimer > 0;

  const startAttack = (player) => {
    goblin.attackFacing = facingToward(goblin.center, player.center);
    goblin.spriteDir = goblin.attackFacing;
    goblin.attackTimer = goblin.weapon.duration;
    goblin.attackCooldownTimer = goblin.weapon.cooldown;
    goblin.attackHitPlayer = false;
  };

  const attackHitbox = () => (
    goblin.weapon.computeHitbox(goblin.center, goblin.attackFacing)
  );

  goblin.hitPlayer = () => {
    const player = gameState.session.player;
    if (!player) return;

    if (goblin.attackCooldownTimer > 0) goblin.attackCooldownTimer--;
    if (goblin.attackTimer > 0) goblin.attackTimer--;
    if (goblin.hp < LOW_HP_THRESHOLD) {
      goblin.attackTimer = 0;
      return;
    }

    if (!goblin.isAttacking() && goblin.attackCooldownTimer === 0) {
      const facing = facingToward(goblin.center, player.center);
      const hitbox = goblin.weapon.computeHitbox(goblin.center, facing);
      if (goblin.weapon.hitsTarget(hitbox, player.colBox)) startAttack(player);
    }

    if (!goblin.isAttacking() || goblin.attackHitPlayer) return;

    const hitbox = attackHitbox();
    if (goblin.weapon.hitsTarget(hitbox, player.colBox)) {
      goblin.attackHitPlayer = applyPlayerHit(player, goblin);
    }
  };

  const baseDraw = goblin.draw;
  goblin.draw = (ctx) => {
    if (goblin.isAttacking() && goblin.attackFacing === "up") {
      goblin.weapon.drawSlash(ctx, goblin.center, goblin.attackFacing, goblin.attackTimer);
    }
    baseDraw(ctx);
    if (goblin.isAttacking() && goblin.attackFacing !== "up") {
      goblin.weapon.drawSlash(ctx, goblin.center, goblin.attackFacing, goblin.attackTimer);
    }
  };
};
