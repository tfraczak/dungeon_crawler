import * as GAME_CONFIG from "@core/game_config";
import TEST_STATE, { TEST_IDS } from "@core/player_testing";
import Random from "@utils/random";
import { boxesOverlap } from "./collision_boxes";

const bottomProbeFor = (box) => ({
  width: box.width,
  height: 3,
  pos: [box.pos[0], box.pos[1] + box.height],
  center: [box.pos[0] + (box.width / 2), box.pos[1] + box.height + 1],
});

export const setupCombat = (enemy, cfg) => {
  enemy.damage = () => Random.int(cfg.damageMin, cfg.damageMax);

  enemy.alive = () => enemy.hp > 0;

  enemy.takeDamage = (amount, knockback) => {
    enemy.hp -= amount;
    if (enemy.hp < 0) enemy.hp = 0;
    const player = enemy.gameState.session.player;
    const dx = enemy.center[0] - player.center[0];
    const dy = enemy.center[1] - player.center[1];
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const factor = cfg.knockbackFactor ?? 1;
    enemy.knockbackVx = (dx / dist) * knockback * factor;
    enemy.knockbackVy = (dy / dist) * knockback * factor;
    if (knockback > 0) enemy.onKnockback?.();
  };

  enemy.hitPlayer = () => {
    const player = enemy.gameState.session.player;
    const playerHitBox = enemy.flying ? player.flyingHitBox : player.colBox;
    const flyingHitBoxProbe = enemy.flying ? bottomProbeFor(playerHitBox) : null;
    const canHitPlayer = enemy.flying
      ? boxesOverlap(enemy.colBox, playerHitBox) || boxesOverlap(enemy.colBox, flyingHitBoxProbe)
      : enemy.distToPlayer() < cfg.hitDistance;

    if (canHitPlayer && !player.invulnerable) {
      const hitCenter = (
        enemy.flying
        && !boxesOverlap(enemy.colBox, playerHitBox)
        && boxesOverlap(enemy.colBox, flyingHitBoxProbe)
      )
        ? flyingHitBoxProbe.center
        : (playerHitBox.center ?? player.center);
      const dx = hitCenter[0] - enemy.center[0];
      const dy = hitCenter[1] - enemy.center[1];
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const knockback = GAME_CONFIG.entities.player.hitKnockback;
      player.knockbackVx = (dx / dist) * knockback;
      player.knockbackVy = (dy / dist) * knockback;
      if (!TEST_STATE[TEST_IDS.a]) {
        player.hp -= enemy.damage();
        if (player.hp < 0) player.hp = 0;
      }
      player.hit();
      enemy.onPlayerHit?.(player, { hitCenter });
    }
  };
};
