import createPoof from "@effects/poof";
import playPoofSound from "@entities/enemy/sound";

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
    for (const key of drops.keys) {
      room.keys[key.id] = key;
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
    for (const chest of Object.values(room.chests)) {
      if (player.attackHitIds.has(chest.id) || chest.opened) continue;
      if (weapon.hitsTarget(hitbox, chest.colBox)) {
        hitAny = true;
        player.attackHitIds.add(chest.id);
        chest.takeDamage(weapon.rollDamage(), room, "brute");
      }
    }

    if (hitAny) {
      weapon.onHit();
    }
  };
}

export default setupRoomCombat;
