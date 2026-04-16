const overlaps = (entity, rx, ry, rw, rh) => {
  const cx = entity.pos[0], cy = entity.pos[1];
  return cx < rx + rw && cx + entity.width > rx &&
         cy < ry + rh && cy + entity.height > ry;
};

const bounceOffWall = (entity, rx, ry, rw, rh) => {
  if (!overlaps(entity, rx, ry, rw, rh)) return;
  const prevX = entity.pos[0] - entity.dropVx;
  const prevY = entity.pos[1] - entity.dropVy;
  const wasLeft = prevX + entity.width <= rx;
  const wasRight = prevX >= rx + rw;
  const wasAbove = prevY + entity.height <= ry;
  const wasBelow = prevY >= ry + rh;
  if (wasLeft) {
    entity.pos[0] = rx - entity.width;
    entity.dropVx *= -0.6;
  } else if (wasRight) {
    entity.pos[0] = rx + rw;
    entity.dropVx *= -0.6;
  } else if (wasAbove) {
    entity.pos[1] = ry - entity.height;
    entity.dropVy *= -0.6;
  } else if (wasBelow) {
    entity.pos[1] = ry + rh;
    entity.dropVy *= -0.6;
  } else {
    const overlapX = Math.min(entity.pos[0] + entity.width, rx + rw) - Math.max(entity.pos[0], rx);
    const overlapY = Math.min(entity.pos[1] + entity.height, ry + rh) - Math.max(entity.pos[1], ry);
    if (overlapX < overlapY) {
      entity.pos[0] += (entity.dropVx > 0 ? -overlapX : overlapX);
      entity.dropVx *= -0.6;
    } else {
      entity.pos[1] += (entity.dropVy > 0 ? -overlapY : overlapY);
      entity.dropVy *= -0.6;
    }
  }
};

const deflectOffEntity = (entity, rx, ry, rw, rh) => {
  if (!overlaps(entity, rx, ry, rw, rh)) return;
  const ecx = entity.pos[0] + entity.width / 2;
  const ecy = entity.pos[1] + entity.height / 2;
  const rcx = rx + rw / 2;
  const rcy = ry + rh / 2;
  let dx = ecx - rcx;
  let dy = ecy - rcy;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  dx /= dist;
  dy /= dist;
  const speed = Math.sqrt(entity.dropVx * entity.dropVx + entity.dropVy * entity.dropVy);
  entity.dropVx = dx * speed * 0.6;
  entity.dropVy = dy * speed * 0.6;
  entity.pos[0] += dx * 2;
  entity.pos[1] += dy * 2;
};

const DROP_FRICTION = 0.98;
const DROP_GRAVITY = 0.3;
const DROP_BOUNCE_DAMPEN = 0.4;
const DROP_XY_DAMPEN = 0.7;
const DROP_BOUNCES = 3;

const applyDropBehavior = (entity, dropSoundFn) => {
  entity.dropping = false;

  entity.startDrop = (originX, originY) => {
    entity.dropping = true;
    entity.pos[0] = originX - entity.width / 2;
    entity.pos[1] = originY - entity.height / 2;
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random();
    entity.dropVx = Math.cos(angle) * speed;
    entity.dropVy = Math.sin(angle) * speed;
    entity.dropZ = 0;
    entity.dropVz = 5 + Math.random() * 2;
    entity.dropBounces = DROP_BOUNCES;
    entity.dropSoundPlayed = false;
  };

  entity.updateDrop = (room) => {
    if (!entity.dropping) return;

    entity.dropVz -= DROP_GRAVITY;
    entity.dropZ += entity.dropVz;

    if (entity.dropZ <= 0) {
      entity.dropZ = 0;
      entity.dropBounces--;

      if (!entity.dropSoundPlayed) {
        dropSoundFn();
        entity.dropSoundPlayed = true;
      }

      if (entity.dropBounces <= 0) {
        entity.dropping = false;
      } else {
        entity.dropVz = Math.abs(entity.dropVz) * DROP_BOUNCE_DAMPEN;
        entity.dropVx *= DROP_XY_DAMPEN;
        entity.dropVy *= DROP_XY_DAMPEN;
      }
    }

    entity.dropVx *= DROP_FRICTION;
    entity.dropVy *= DROP_FRICTION;
    entity.pos[0] += entity.dropVx;
    entity.pos[1] += entity.dropVy;

    for (const wall of room.walls) {
      bounceOffWall(entity, wall.pos[0], wall.pos[1], wall.width, wall.height);
    }

    const player = entity.gameState.session.player;
    const pBox = player.colBox;
    deflectOffEntity(entity, pBox.pos[0], pBox.pos[1], pBox.width, pBox.height);

    for (const enemy of Object.values(room.enemies)) {
      const eBox = enemy.colBox;
      deflectOffEntity(entity, eBox.pos[0], eBox.pos[1], eBox.width, eBox.height);
    }

    entity.drawOptions.x = entity.pos[0];
    entity.drawOptions.y = entity.pos[1] - entity.dropZ;
    entity.updateSides();
  };
};

export default applyDropBehavior;
