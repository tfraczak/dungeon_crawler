import TEST_STATE, { TEST_IDS } from "@core/player_testing";

const FACING_VECTOR = Object.freeze({
  up: Object.freeze([0, -1]),
  down: Object.freeze([0, 1]),
  left: Object.freeze([-1, 0]),
  right: Object.freeze([1, 0]),
});

const isSourceInFront = (player, sourceCenter, blockAngle) => {
  const forward = FACING_VECTOR[player.facing] ?? FACING_VECTOR.down;
  const dx = sourceCenter[0] - player.center[0];
  const dy = sourceCenter[1] - player.center[1];
  const dist = Math.sqrt((dx * dx) + (dy * dy)) || 1;
  const dot = ((dx / dist) * forward[0]) + ((dy / dist) * forward[1]);
  return dot >= Math.cos(blockAngle / 2);
};

const knockSourceBack = (source, player, amount) => {
  if (!source || !Number.isFinite(amount) || amount <= 0) return;
  const dx = source.center[0] - player.center[0];
  const dy = source.center[1] - player.center[1];
  const dist = Math.sqrt((dx * dx) + (dy * dy)) || 1;
  source.knockbackVx = (dx / dist) * amount;
  source.knockbackVy = (dy / dist) * amount;
  source.onKnockback?.();
};

export const resolveIncomingPlayerHit = (player, {
  source = null,
  sourceCenter,
  hitCenter = player.center,
  damage,
  knockback = 0,
  applyStatus = () => {},
  onBlocked = () => {},
  onHit = () => {},
} = {}) => {
  if (player.invulnerable) return { hit: false, blocked: false };

  const shield = player.activeShield?.();
  const canBlock = (
    shield
    && player.isBlocking?.()
    && sourceCenter
    && isSourceInFront(player, sourceCenter, shield.block.blockAngle)
  );

  if (canBlock) {
    player.blockImpactTimer = 12;
    player.blockCooldownTimer = shield.block.cooldown;
    shield.onBlock?.();
    knockSourceBack(source, player, shield.block.attackerKnockback);
    // damageReduction = 1 nullifies the hit; anything less lets that
    // fraction of the damage through (e.g. 0.7 means a 10-dmg hit deals 3).
    // Status effects and player.hit() shake are skipped on a partial block —
    // the shield "ate" the worst of it.
    const reduction = shield.block.damageReduction ?? 1;
    if (reduction < 1 && !TEST_STATE[TEST_IDS.a]) {
      const raw = typeof damage === "function" ? damage() : damage;
      const passthrough = raw * (1 - reduction);
      if (passthrough > 0) {
        player.hp -= passthrough;
        if (player.hp < 0) player.hp = 0;
      }
    }
    onBlocked({ shield });
    return { hit: true, blocked: true };
  }

  const dx = hitCenter[0] - (sourceCenter?.[0] ?? player.center[0]);
  const dy = hitCenter[1] - (sourceCenter?.[1] ?? player.center[1]);
  const dist = Math.sqrt((dx * dx) + (dy * dy)) || 1;
  player.knockbackVx = (dx / dist) * knockback;
  player.knockbackVy = (dy / dist) * knockback;
  if (!TEST_STATE[TEST_IDS.a]) {
    player.hp -= typeof damage === "function" ? damage() : damage;
    if (player.hp < 0) player.hp = 0;
  }
  applyStatus();
  player.hit();
  onHit();
  return { hit: true, blocked: false };
};
