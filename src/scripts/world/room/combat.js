import createPoof from "@effects/poof";
import playPoofSound from "@entities/enemy/sound";
import { playSlashHit, playSlashWhiff } from "@items/equipment/weapons/swords/sound";

function setupRoomCombat(room, gameState) {
  const { session } = gameState;

  room.onEnemyKilled = (enemy, key) => {
    const [poofX, poofY] = enemy.colBox.center;
    room.poofs.push(createPoof(poofX, poofY));
    playPoofSound();

    const drops = enemy.drop();
    for (const coin of drops.coins) {
      room.coins[coin.id] = coin;
    }
    for (const potion of drops.hpPotions) {
      room.hpPotions[potion.id] = potion;
    }

    session.enemiesKilled = (session.enemiesKilled ?? 0) + 1;
    room.scheduleEnemyRespawn(enemy);
    delete room.enemies[key];
  };

  room.resolvePlayerAttack = (player) => {
    if (!player.isAttacking()) return;

    const weapon = player.weapon;
    const hitbox = player.attackHitbox();
    let hitAny = false;

    for (const [key, enemy] of Object.entries(room.enemies)) {
      if (player.attackHitIds.has(key)) continue;
      if (weapon.hitsTarget(hitbox, enemy.colBox)) {
        hitAny = true;
        player.attackHitIds.add(key);
        enemy.takeDamage(weapon.rollDamage(), weapon.knockback);
        if (!enemy.alive()) room.onEnemyKilled(enemy, key);
      }
    }

    if (hitAny) {
      playSlashHit();
    } else if (player.attackTimer === 1 && player.attackHitIds.size === 0) {
      playSlashWhiff();
    }
  };
}

export default setupRoomCombat;
