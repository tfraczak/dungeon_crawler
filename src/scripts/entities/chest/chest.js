import createEntity from "@entities/entity";
import createCoin from "@entities/coin/coin";
import createEquipmentPickup from "@entities/equipment_pickup/equipment_pickup";
import { createEquipmentById, EQUIPMENT_ITEMS } from "@items/equipment/registry";
import Random from "@utils/random";

let chestIdCounter = 0;

const BRUTE_EQUIPMENT_CHANCE = 0.35;
const KEY_EXTRA_EQUIPMENT_CHANCE = 0.25;
const HIT_SHAKE_FRAMES = 10;
const DEBRIS_COUNT = 16;

// Key-open animation timeline (in frames @ ~60fps). The chest swings the
// lid up over LID_FRAMES, holds the open silhouette for HOLD_FRAMES so the
// player gets a clear "you opened it" beat, then fades out over FADE_FRAMES
// before the room sweeps it (`chest.done = true`). Total ≈ 1.17s.
const KEY_OPEN_LID_FRAMES = 18;
const KEY_OPEN_HOLD_FRAMES = 24;
const KEY_OPEN_FADE_FRAMES = 28;
const KEY_OPEN_TOTAL_FRAMES = KEY_OPEN_LID_FRAMES + KEY_OPEN_HOLD_FRAMES + KEY_OPEN_FADE_FRAMES;

// 0 (closed) → 1 (fully swung open) based on the key-open timer. Stays 0
// for brute breaks (those skip the open animation and go straight to debris)
// and for never-opened chests.
const lidOpenProgress = (chest) => {
  if (!chest.opened || chest.broken) return 0;
  return Math.min(1, chest.openTimer / KEY_OPEN_LID_FRAMES);
};

// 1 (fully visible) → 0 (gone). Stays 1 during the swing-open and hold
// phases; only the trailing fade window drops alpha. Used as `globalAlpha`
// for the whole chest draw.
const chestFadeProgress = (chest) => {
  if (!chest.opened || chest.broken) return 1;
  const fadeStart = KEY_OPEN_LID_FRAMES + KEY_OPEN_HOLD_FRAMES;
  if (chest.openTimer < fadeStart) return 1;
  return Math.max(0, 1 - (chest.openTimer - fadeStart) / KEY_OPEN_FADE_FRAMES);
};

const makeWoodDebris = (chest) => (
  Array.from({ length: DEBRIS_COUNT }, () => {
    const angle = Random.range(0, Math.PI * 2);
    const speed = Random.range(1.2, 4.2);
    const life = Random.int(28, 48);
    return {
      x: chest.center[0] + Random.range(-18, 18),
      y: chest.center[1] + Random.range(-14, 12),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - Random.range(1.8, 3.4),
      w: Random.int(4, 10),
      h: Random.int(2, 5),
      angle: Random.range(0, Math.PI),
      spin: Random.range(-0.26, 0.26),
      life,
      maxLife: life,
      color: Random.pick(["#8f4f2c", "#a76234", "#5b361c", "#3d3232"]),
    };
  })
);

const updateDebris = (chest) => {
  for (const shard of chest.debris) {
    shard.life--;
    shard.x += shard.vx;
    shard.y += shard.vy;
    shard.vy += 0.18;
    shard.vx *= 0.96;
    shard.vy *= 0.96;
    shard.angle += shard.spin;
    shard.spin *= 0.97;
  }
  chest.debris = chest.debris.filter(shard => shard.life > 0);
  chest.done = chest.debris.length === 0;
};

const drawDebris = (ctx, chest) => {
  for (const shard of chest.debris) {
    const alpha = Math.max(0, shard.life / shard.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(shard.x, shard.y);
    ctx.rotate(shard.angle);
    ctx.fillStyle = shard.color;
    ctx.fillRect(-shard.w / 2, -shard.h / 2, shard.w, shard.h);
    ctx.strokeStyle = `rgba(43, 27, 23, ${alpha})`;
    ctx.lineWidth = 1;
    ctx.strokeRect(-shard.w / 2, -shard.h / 2, shard.w, shard.h);
    ctx.restore();
  }
};

// Treasure-chest palette tuned to read like the reference: warm reddish
// wood with a hint of grain, dark iron straps with copper rivets, and a
// silvery padlock hung off the front clasp.
const CHEST_COLORS = Object.freeze({
  woodDark: "#5b2d18",
  woodMid: "#8a4422",
  woodLight: "#b06434",
  woodHighlight: "#d4895a",
  woodOutline: "#2b1410",
  ironDark: "#2c2520",
  ironMid: "#4a3f37",
  ironLight: "#7a6a5d",
  rivet: "#c98353",
  rivetDark: "#5a3416",
  lockBody: "#9aa0a8",
  lockShade: "#5b626c",
  lockShackle: "#b8bec6",
  lockOutline: "#1a1d22",
  damage: "#f1d9a1",
  damageDark: "#7a4a1f",
});
const CHEST_WIDTH = 40;
const CHEST_LEFT_OFFSET = 4;
const CHEST_BOTTOM_OFFSET = 46;
const CHEST_LID_BASE_OFFSET = 22;
const CHEST_LID_PEAK_OFFSET = 6;

const lidPath = (ctx, x, y) => {
  ctx.beginPath();
  ctx.moveTo(x + CHEST_LEFT_OFFSET, y + CHEST_LID_BASE_OFFSET);
  ctx.bezierCurveTo(
    x + CHEST_LEFT_OFFSET, y + CHEST_LID_PEAK_OFFSET,
    x + CHEST_LEFT_OFFSET + CHEST_WIDTH, y + CHEST_LID_PEAK_OFFSET,
    x + CHEST_LEFT_OFFSET + CHEST_WIDTH, y + CHEST_LID_BASE_OFFSET,
  );
  ctx.lineTo(x + CHEST_LEFT_OFFSET + CHEST_WIDTH, y + CHEST_LID_BASE_OFFSET + 4);
  ctx.lineTo(x + CHEST_LEFT_OFFSET, y + CHEST_LID_BASE_OFFSET + 4);
  ctx.closePath();
};

const bodyPath = (ctx, x, y) => {
  ctx.beginPath();
  ctx.moveTo(x + CHEST_LEFT_OFFSET, y + CHEST_LID_BASE_OFFSET + 4);
  ctx.lineTo(x + CHEST_LEFT_OFFSET + CHEST_WIDTH, y + CHEST_LID_BASE_OFFSET + 4);
  ctx.lineTo(x + CHEST_LEFT_OFFSET + CHEST_WIDTH, y + CHEST_BOTTOM_OFFSET - 4);
  ctx.quadraticCurveTo(
    x + CHEST_LEFT_OFFSET + CHEST_WIDTH, y + CHEST_BOTTOM_OFFSET,
    x + CHEST_LEFT_OFFSET + CHEST_WIDTH - 4, y + CHEST_BOTTOM_OFFSET,
  );
  ctx.lineTo(x + CHEST_LEFT_OFFSET + 4, y + CHEST_BOTTOM_OFFSET);
  ctx.quadraticCurveTo(
    x + CHEST_LEFT_OFFSET, y + CHEST_BOTTOM_OFFSET,
    x + CHEST_LEFT_OFFSET, y + CHEST_BOTTOM_OFFSET - 4,
  );
  ctx.closePath();
};

// Iron straps are split lid-vs-body so the lid half can be drawn inside the
// open-animation transform (lifted + foreshortened) while the body half stays
// pinned to the body. When the chest is closed both halves butt together
// pixel-perfectly and read as one continuous strap.
const drawIronStrapLid = (ctx, x, y, bandX) => {
  const baseX = x + bandX;
  const topY = y + CHEST_LID_PEAK_OFFSET + 1;
  const bottomY = y + CHEST_LID_BASE_OFFSET + 4;
  ctx.lineCap = "butt";
  ctx.lineWidth = 5;
  ctx.strokeStyle = CHEST_COLORS.ironDark;
  ctx.beginPath();
  ctx.moveTo(baseX, topY);
  ctx.lineTo(baseX, bottomY);
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.strokeStyle = CHEST_COLORS.ironMid;
  ctx.beginPath();
  ctx.moveTo(baseX - 1, topY);
  ctx.lineTo(baseX - 1, bottomY);
  ctx.stroke();

  ctx.fillStyle = CHEST_COLORS.rivet;
  ctx.strokeStyle = CHEST_COLORS.rivetDark;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(baseX, y + CHEST_LID_PEAK_OFFSET + 3, 1.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
};

const drawIronStrapBody = (ctx, x, y, bandX) => {
  const baseX = x + bandX;
  const topY = y + CHEST_LID_BASE_OFFSET + 4;
  const bottomY = y + CHEST_BOTTOM_OFFSET - 1;
  ctx.lineCap = "butt";
  ctx.lineWidth = 5;
  ctx.strokeStyle = CHEST_COLORS.ironDark;
  ctx.beginPath();
  ctx.moveTo(baseX, topY);
  ctx.lineTo(baseX, bottomY);
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.strokeStyle = CHEST_COLORS.ironMid;
  ctx.beginPath();
  ctx.moveTo(baseX - 1, topY);
  ctx.lineTo(baseX - 1, bottomY);
  ctx.stroke();

  ctx.fillStyle = CHEST_COLORS.rivet;
  ctx.strokeStyle = CHEST_COLORS.rivetDark;
  ctx.lineWidth = 1;
  for (const rivetY of [CHEST_LID_BASE_OFFSET + 1, CHEST_BOTTOM_OFFSET - 3]) {
    ctx.beginPath();
    ctx.arc(baseX, y + rivetY, 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
};

// Dark cavity revealed at the top of the body when the lid is up. We draw a
// near-black rectangle for the back wall plus a slightly warmer strip for the
// inner floor, framed by thin iron-tone edges so the seam between body and
// interior reads cleanly.
const drawChestInterior = (ctx, x, y) => {
  const left = x + CHEST_LEFT_OFFSET + 2;
  const right = x + CHEST_LEFT_OFFSET + CHEST_WIDTH - 2;
  const top = y + CHEST_LID_BASE_OFFSET + 1;
  const bottom = y + CHEST_LID_BASE_OFFSET + 12;
  const width = right - left;
  const height = bottom - top;

  ctx.fillStyle = "#15090a";
  ctx.fillRect(left, top, width, height);

  ctx.fillStyle = "#3a1f14";
  ctx.fillRect(left + 1, bottom - 3, width - 2, 3);

  ctx.strokeStyle = CHEST_COLORS.ironDark;
  ctx.lineWidth = 1;
  ctx.strokeRect(left - 0.5, top - 0.5, width + 1, height + 1);
};

const drawPadlock = (ctx, x, y) => {
  // Hasp swinging down off the lid edge.
  ctx.fillStyle = CHEST_COLORS.lockBody;
  ctx.strokeStyle = CHEST_COLORS.lockOutline;
  ctx.lineWidth = 1.5;
  ctx.fillRect(x + 21, y + 20, 6, 8);
  ctx.strokeRect(x + 21, y + 20, 6, 8);

  // Padlock body hanging below the hasp.
  ctx.fillStyle = CHEST_COLORS.lockBody;
  ctx.beginPath();
  ctx.moveTo(x + 19, y + 30);
  ctx.lineTo(x + 29, y + 30);
  ctx.quadraticCurveTo(x + 31, y + 30, x + 31, y + 32);
  ctx.lineTo(x + 31, y + 40);
  ctx.quadraticCurveTo(x + 31, y + 42, x + 29, y + 42);
  ctx.lineTo(x + 19, y + 42);
  ctx.quadraticCurveTo(x + 17, y + 42, x + 17, y + 40);
  ctx.lineTo(x + 17, y + 32);
  ctx.quadraticCurveTo(x + 17, y + 30, x + 19, y + 30);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = CHEST_COLORS.lockOutline;
  ctx.stroke();

  // Shackle.
  ctx.lineWidth = 1.6;
  ctx.strokeStyle = CHEST_COLORS.lockShackle;
  ctx.beginPath();
  ctx.arc(x + 24, y + 30, 4, Math.PI, 0);
  ctx.stroke();
  ctx.strokeStyle = CHEST_COLORS.lockOutline;
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Keyhole.
  ctx.fillStyle = CHEST_COLORS.lockOutline;
  ctx.beginPath();
  ctx.arc(x + 24, y + 35, 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(x + 23.5, y + 35, 1, 3);

  // Shading on body.
  ctx.fillStyle = CHEST_COLORS.lockShade;
  ctx.fillRect(x + 18, y + 39, 12, 3);
};

// Lid pieces (dome fill + plank shading + highlight + outline + lid-half
// iron straps). Drawn through whatever transform the caller applies — for a
// closed chest that's identity, for a key-opened chest it's a vertical lift
// plus a slight Y-compression (see `applyOpenLidTransform`).
const drawLidLayer = (ctx, x, y) => {
  ctx.fillStyle = CHEST_COLORS.woodMid;
  lidPath(ctx, x, y);
  ctx.fill();

  for (let plank = 0; plank < 4; plank++) {
    const t = plank / 3;
    const top = CHEST_LID_PEAK_OFFSET + plank * 4;
    ctx.fillStyle = plank % 2 === 0 ? CHEST_COLORS.woodLight : CHEST_COLORS.woodMid;
    ctx.globalAlpha = 0.55 - (t * 0.3);
    ctx.beginPath();
    ctx.ellipse(x + 24, y + top + 6, 17 - plank * 0.5, 4, 0, 0, Math.PI);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = CHEST_COLORS.woodHighlight;
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.ellipse(x + 22, y + 9, 10, 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.strokeStyle = CHEST_COLORS.woodOutline;
  ctx.lineWidth = 2;
  lidPath(ctx, x, y);
  ctx.stroke();

  drawIronStrapLid(ctx, x, y, 8);
  drawIronStrapLid(ctx, x, y, 24);
  drawIronStrapLid(ctx, x, y, 40);
};

// 2D approximation of the lid hinging open at its back: lift the whole lid
// up by `dy`, then squish it vertically around its bottom (seam) edge so
// the dome compresses as if rotating away from the camera. lp=0 is identity
// (closed); lp=1 is fully swung open (lid raised ~14px and squished to
// ~55% of its original height).
const applyOpenLidTransform = (ctx, lp, x, y) => {
  if (lp <= 0) return;
  const seamY = y + CHEST_LID_BASE_OFFSET + 4;
  const dy = -14 * lp;
  const scaleY = 1 - 0.45 * lp;
  ctx.translate(0, dy);
  ctx.translate(0, seamY);
  ctx.scale(1, scaleY);
  ctx.translate(0, -seamY);
};

const drawWoodChest = (ctx, chest) => {
  if (chest.broken) {
    drawDebris(ctx, chest);
    return;
  }

  const shake = chest.hitShakeTimer > 0
    ? Math.round(Math.sin(chest.hitShakeTimer * 2.4) * 2)
    : 0;
  const x = chest.pos[0] + shake;
  const y = chest.pos[1];
  const lp = lidOpenProgress(chest);
  const fade = chestFadeProgress(chest);

  ctx.save();
  ctx.globalAlpha = fade;

  // Drop shadow under the chest grounds it on the floor tile.
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.beginPath();
  ctx.ellipse(x + 24, y + 46, 18, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Wood body fill, plank lines, seam, and outline. Body geometry never
  // moves — only the lid + interior cavity respond to the open animation.
  ctx.fillStyle = CHEST_COLORS.woodMid;
  bodyPath(ctx, x, y);
  ctx.fill();

  ctx.strokeStyle = CHEST_COLORS.woodDark;
  ctx.lineWidth = 1;
  for (const plankY of [30, 36, 42]) {
    ctx.beginPath();
    ctx.moveTo(x + 6, y + plankY);
    ctx.lineTo(x + 42, y + plankY);
    ctx.stroke();
  }

  ctx.strokeStyle = CHEST_COLORS.woodOutline;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x + 4, y + CHEST_LID_BASE_OFFSET + 4);
  ctx.lineTo(x + 4 + CHEST_WIDTH, y + CHEST_LID_BASE_OFFSET + 4);
  ctx.stroke();

  ctx.lineWidth = 2;
  bodyPath(ctx, x, y);
  ctx.stroke();

  // Body-half straps + corner plates stay pinned to the body; the lid half
  // of each strap rides up with the lid in `drawLidLayer`.
  drawIronStrapBody(ctx, x, y, 8);
  drawIronStrapBody(ctx, x, y, 24);
  drawIronStrapBody(ctx, x, y, 40);

  ctx.fillStyle = CHEST_COLORS.ironDark;
  for (const [px, py, w, h] of [
    [4, 24, 4, 6],
    [40, 24, 4, 6],
    [4, 42, 6, 4],
    [38, 42, 6, 4],
  ]) {
    ctx.fillRect(x + px, y + py, w, h);
  }

  // Damage scuff is only relevant pre-open (a brute-broken chest is gone
  // by this branch; an opened one has the lid up and damage marks on the
  // body would just compete with the cavity for attention).
  if (chest.hp < chest.maxHp && !chest.opened) {
    ctx.strokeStyle = CHEST_COLORS.damage;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + 12, y + 30);
    ctx.lineTo(x + 16, y + 34);
    ctx.lineTo(x + 13, y + 38);
    ctx.stroke();
    ctx.strokeStyle = CHEST_COLORS.damageDark;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 32, y + 32);
    ctx.lineTo(x + 36, y + 38);
    ctx.stroke();
  }

  // Reveal the cavity once the lid has started lifting. Drawn between the
  // body and the lid so the lid still occludes it while the gap is small.
  if (lp > 0) drawChestInterior(ctx, x, y);

  ctx.save();
  applyOpenLidTransform(ctx, lp, x, y);
  drawLidLayer(ctx, x, y);
  ctx.restore();

  // Padlock vanishes the moment the key turns — keeps the open silhouette
  // clean and avoids a dangling lock floating mid-air over the cavity.
  if (!chest.opened) drawPadlock(ctx, x, y);

  ctx.restore();
};

const spawnCoinLoot = (chest, room, count) => {
  for (let i = 0; i < count; i++) {
    const coin = createCoin([chest.center[0] - 8, chest.center[1] - 8], 16, 16, chest.gameState.sprites.coin, chest.gameState);
    coin.startDrop(chest.center[0], chest.center[1]);
    room.coins[coin.id] = coin;
  }
};

const spawnEquipmentLoot = (chest, room, count) => {
  for (let i = 0; i < count; i++) {
    const itemId = Random.pick(EQUIPMENT_ITEMS).id;
    const item = createEquipmentById(itemId, chest.gameState);
    const pickup = createEquipmentPickup([chest.center[0] - 16, chest.center[1] - 16], item, chest.gameState);
    pickup.startDrop(chest.center[0], chest.center[1]);
    room.equipmentPickups[pickup.id] = pickup;
  }
};

function createChest(pos, gameState) {
  // Movement-collision box matches the player's "feet anchor" pattern:
  // a short band at the bottom of the sprite (y ≈ 32–48 in chest-local
  // coords). The lid + upper body float above the colBox so the player can
  // visually walk slightly behind the chest without bumping into the upper
  // silhouette — same fake-3D trick used everywhere else.
  // The default `colBoxHook` from createEntity already anchors at the bottom,
  // so we don't override it.
  const chest = createEntity(pos, 48, 48, null, { width: 36, height: 16 });
  chest.id = `chest_${chestIdCounter++}`;
  chest.gameState = gameState;
  chest.hp = 12;
  chest.maxHp = chest.hp;
  chest.opened = false;
  chest.broken = false;
  chest.done = false;
  chest.debris = [];
  chest.hitShakeTimer = 0;
  // Drives the key-open lid-swing → hold → fade-out timeline once the chest
  // is opened with a key. Stays at 0 for brute breaks (those route to the
  // debris path instead).
  chest.openTimer = 0;

  chest.open = (room, mode) => {
    if (chest.opened) return false;
    chest.opened = true;
    if (mode === "key") {
      spawnEquipmentLoot(chest, room, 1 + (Random.chance(KEY_EXTRA_EQUIPMENT_CHANCE) ? 1 : 0));
      spawnCoinLoot(chest, room, Random.int(2, 5));
      // Kick off the open animation. animate() advances openTimer each
      // frame and flips `done = true` when the timeline finishes, at which
      // point the room sweep removes the chest and the tile is walkable.
      chest.openTimer = 0;
    } else {
      if (Random.chance(BRUTE_EQUIPMENT_CHANCE)) spawnEquipmentLoot(chest, room, 1);
      spawnCoinLoot(chest, room, Random.int(1, 3));
      chest.broken = true;
      chest.debris = makeWoodDebris(chest);
    }
    // Tell the room a chest just got looted — this restarts the per-room
    // chest reroll cooldown so the next spawn can't appear until the
    // configured wait elapses.
    room.onChestOpened?.();
    return true;
  };

  chest.takeDamage = (amount, room) => {
    if (chest.opened) return;
    chest.hp -= amount;
    chest.hitShakeTimer = HIT_SHAKE_FRAMES;
    if (chest.hp <= 0) chest.open(room, "brute");
  };

  // AABB proximity check: do these two col-boxes overlap when each is
  // inflated by `margin` pixels in every direction? This is what tryKeyOpen
  // wants — "is the player adjacent on any side" — and unlike the four
  // `collidedOnSide` calls it used to use, it works correctly when the
  // player is pushed flush against the chest by movement-collision (the
  // strict `> 0` lower bound in side-collision math otherwise disqualifies
  // a perfectly-flush boundary contact).
  const boxesWithin = (a, b, margin) => (
    a.pos[0] - margin < b.pos[0] + b.width
    && a.pos[0] + a.width + margin > b.pos[0]
    && a.pos[1] - margin < b.pos[1] + b.height
    && a.pos[1] + a.height + margin > b.pos[1]
  );

  chest.tryKeyOpen = (player, room) => {
    if (chest.opened || player.keyCount <= 0) return false;
    if (boxesWithin(chest.colBox, player.colBox, 12)) {
      player.keyCount--;
      return chest.open(room, "key");
    }
    return false;
  };

  chest.animate = () => {
    if (chest.hitShakeTimer > 0) chest.hitShakeTimer--;
    if (chest.broken) {
      updateDebris(chest);
      return;
    }
    if (chest.opened && !chest.done) {
      chest.openTimer++;
      if (chest.openTimer >= KEY_OPEN_TOTAL_FRAMES) chest.done = true;
    }
  };

  chest.draw = (ctx) => {
    drawWoodChest(ctx, chest);
    if (chest.broken) return;
    chest.colBox.centerOnEntity();
    chest.colBox.draw(ctx);
  };

  return chest;
}

export default createChest;
