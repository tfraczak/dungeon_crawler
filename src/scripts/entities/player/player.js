import createEntity from "@entities/entity";
import { createEquipmentById } from "@items/equipment/registry";
import { createWeaponById, DEFAULT_WEAPON_ID } from "@items/equipment/weapons/registry";
import createFists from "@items/equipment/weapons/fists/fists/fists";
import {
  createEquipmentState,
  createInventory,
  equipItem,
  unequipItem,
} from "@items/equipment/inventory";
import { EQUIPMENT_SLOTS, HAND_SLOTS, uniqueEquippedItems } from "@items/equipment/slots";
import * as GAME_CONFIG from "@core/game_config";
import DEV_FLAGS, { configValue } from "@core/dev_flags";
import TEST_STATE, { TEST_IDS } from "@core/player_testing";
import { roomChange } from "@world/room/generation";
import playFootstep from "./sound";
import setupPlayerStatusEffects from "./status_effects";
import setupPlayerVisualEffects from "./visual_effects";

const { baseSpeed: BASE_SPEED } = GAME_CONFIG.world;

function createPlayer(pos, width, height, spritePalette, gameState) {
  const player = createEntity(pos, width, height, spritePalette);
  const cfg = GAME_CONFIG.entities.player;
  const flyingHitBox = {
    width: width / 2,
    height: height / 2,
    pos: [pos[0] + (width / 4), pos[1] + 6],
  };

  player.gameState = gameState;
  player.speed = BASE_SPEED * configValue({
    value: cfg.speedMultiplier,
    override: DEV_FLAGS.playerSpeedMultiplier,
  });
  player.normalizedSpeed = player.speed / Math.sqrt(2);
  player.pace = 24 / player.speed;
  player.speedModifier = 1;
  player.sprinting = false;
  player.stamina = cfg.stamina;
  player.invulnerable = 0;
  player.hp = cfg.hp;
  player.strength = cfg.strength;
  player.stride = {
    up:    { stepCount: 0, lastPhase: -1, palY: 48 * 3 },
    down:  { stepCount: 0, lastPhase: -1, palY: 48 * 0 },
    left:  { stepCount: 0, lastPhase: -1, palY: 48 * 1 },
    right: { stepCount: 0, lastPhase: -1, palY: 48 * 2 },
  };

  player.newRoomPos = (dir) => {
    switch (dir) {
      case "up":    player.pos[1] = 720 - 24; break;
      case "down":  player.pos[1] = -24; break;
      case "left":  player.pos[0] = 720 - 24; break;
      case "right": player.pos[0] = -24; break;
    }
  };

  // Stride is a 4-phase cycle: idle, left-foot-down, idle, right-foot-down.
  // Each phase lasts `pace` frames. We compute the current phase from
  // stepCount and fire the footstep sound only on transitions into a
  // foot-down phase, which is robust to fractional pace values (e.g. sprint).
  player.stridePalettePos = (direction) => {
    player.pace = 24 / (player.speed * player.speedModifier);
    const stride = player.stride[direction];
    const cycleLength = Math.max(1, 4 * player.pace);
    const phase = Math.floor((stride.stepCount % cycleLength) / player.pace) % 4;

    if (phase !== stride.lastPhase) {
      if (phase === 1 || phase === 3) playFootstep(player.speedModifier > 1);
      stride.lastPhase = phase;
    }

    stride.stepCount++;
    if (stride.stepCount >= cycleLength) stride.stepCount = 0;

    switch (phase) {
      case 1:  return 48 * 0;
      case 3:  return 48 * 2;
      default: return 48 * 1;
    }
  };

  player.wallCheck = (walls) => {
    for (let wall of walls) { if (player.collidedOnSide("top", wall)) break; }
    if (player.collisions.top) {
      player.pos[1] = player.collisions.top - 32;
    }

    for (let wall of walls) { if (player.collidedOnSide("bottom", wall)) break; }
    if (player.collisions.bottom) {
      player.pos[1] = player.collisions.bottom - 48;
    }

    for (let wall of walls) { if (player.collidedOnSide("left", wall)) break; }
    if (player.collisions.left) {
      player.pos[0] = player.collisions.left - 12;
    }

    for (let wall of walls) { if (player.collidedOnSide("right", wall)) break; }
    if (player.collisions.right) {
      player.pos[0] = player.collisions.right - 36;
    }
  };

  player.invulCheck = () => {
    return Math.floor(player.invulnerable / 5) % 2 === 0;
  };

  player.inventory = createInventory();
  player.equipment = createEquipmentState();
  player.lastEquipResult = null;
  player.keyCount = 0;
  const starterWeapon = player.inventory.add(createWeaponById(TEST_STATE[TEST_IDS.d] || DEFAULT_WEAPON_ID, gameState));
  equipItem(player.equipment, starterWeapon, EQUIPMENT_SLOTS.mainHand);
  if (TEST_STATE[TEST_IDS.e]) {
    const starterShield = createEquipmentById(TEST_STATE[TEST_IDS.e], gameState);
    if (starterShield?.equipmentKind === "shield") {
      equipItem(player.equipment, player.inventory.add(starterShield), EQUIPMENT_SLOTS.offHand);
    }
  }
  player.addInventoryItem = item => player.inventory.add(item);
  player.compatibleInventoryItems = slot => player.inventory.items.filter(item => item.compatibleSlots?.includes(slot));
  player.equipInventoryItem = (instanceId, slot) => {
    const item = player.inventory.find(instanceId);
    if (!item) return { ok: false, reason: "Item is not in inventory." };
    const result = equipItem(player.equipment, item, slot);
    player.lastEquipResult = result;
    player.attackTimer = 0;
    player.attackCooldownTimer = 0;
    player.blockCooldownTimer = 0;
    player.blockImpactTimer = 0;
    player.attackHitIds.clear();
    return result;
  };
  player.unequipSlot = (slot) => {
    unequipItem(player.equipment, player.equipment[slot]);
    player.lastEquipResult = { ok: true };
  };
  player.equippedItems = () => uniqueEquippedItems(player.equipment);
  // Unarmed fallback. Created once and reused so the punch-cooldown / damage
  // roll state on the weapon is stable across frames.
  const unarmedWeapon = createFists();
  player.activeWeapon = () => (
    HAND_SLOTS.map(slot => player.equipment[slot]).find(item => item?.equipmentKind === "weapon")
    ?? unarmedWeapon
  );
  player.activeShield = () => (
    HAND_SLOTS.map(slot => player.equipment[slot]).find(item => item?.equipmentKind === "shield")
    ?? null
  );
  Object.defineProperty(player, "weapon", {
    get: () => player.activeWeapon(),
    set: (weapon) => {
      if (!weapon) return;
      const owned = player.inventory.add(weapon);
      equipItem(player.equipment, owned, EQUIPMENT_SLOTS.mainHand);
    },
  });
  player.facing = "down";
  player.attackTimer = 0;          // frames remaining in current swing
  player.attackCooldownTimer = 0;  // frames before next swing allowed
  player.attackHitIds = new Set(); // enemy keys already hit this swing
  player.blockCooldownTimer = 0;
  player.blockImpactTimer = 0;
  player.knockbackVx = 0;
  player.knockbackVy = 0;
  player.velocity = [0, 0];
  player.flyingHitBox = flyingHitBox;

  player.updateFlyingHitBox = () => {
    const x = player.pos[0] + ((player.width - player.flyingHitBox.width) / 2);
    const y = player.pos[1] + 6;
    player.flyingHitBox.pos = [x, y];
    player.flyingHitBox.center = [
      x + (player.flyingHitBox.width / 2),
      y + (player.flyingHitBox.height / 2),
    ];
  };

  player.flyingHitBox.draw = (ctx) => {
    if (!DEV_FLAGS.showCollisionBoxes) return;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#00aaff";
    ctx.strokeRect(
      player.flyingHitBox.pos[0],
      player.flyingHitBox.pos[1],
      player.flyingHitBox.width,
      player.flyingHitBox.height,
    );
  };

  const baseUpdateSides = player.updateSides;
  player.updateSides = () => {
    baseUpdateSides();
    player.updateFlyingHitBox();
  };
  player.updateFlyingHitBox();
  const statusEffects = setupPlayerStatusEffects(player);
  const visualEffects = setupPlayerVisualEffects(player);

  player.hit = () => {
    player.invulnerable = cfg.invulnerabilityFrames;
  };

  const knockbackBounds = 35;

  player.wallCheckKnockback = (walls) => {
    for (let wall of walls) { if (player.collidedOnSide("top", wall, knockbackBounds)) break; }
    if (player.collisions.top) {
      player.pos[1] = player.collisions.top - 32;
      player.knockbackVy = 0;
    }
    for (let wall of walls) { if (player.collidedOnSide("bottom", wall, knockbackBounds)) break; }
    if (player.collisions.bottom) {
      player.pos[1] = player.collisions.bottom - 48;
      player.knockbackVy = 0;
    }
    for (let wall of walls) { if (player.collidedOnSide("left", wall, knockbackBounds)) break; }
    if (player.collisions.left) {
      player.pos[0] = player.collisions.left - 12;
      player.knockbackVx = 0;
    }
    for (let wall of walls) { if (player.collidedOnSide("right", wall, knockbackBounds)) break; }
    if (player.collisions.right) {
      player.pos[0] = player.collisions.right - 36;
      player.knockbackVx = 0;
    }
  };

  player.applyKnockback = (walls) => {
    if (Math.abs(player.knockbackVx) < 0.1 && Math.abs(player.knockbackVy) < 0.1) {
      player.knockbackVx = 0;
      player.knockbackVy = 0;
      return;
    }
    player.pos[0] += player.knockbackVx;
    player.pos[1] += player.knockbackVy;

    // Prevent knockback from pushing through exit zones
    player.pos[0] = Math.max(-24, Math.min(696, player.pos[0]));
    player.pos[1] = Math.max(-24, Math.min(696, player.pos[1]));

    player.updateSides();
    player.wallCheckKnockback(walls);
    player.knockbackVx *= 0.7;
    player.knockbackVy *= 0.7;
    player.updateSides();
  };

  player.isAttacking = () => player.attackTimer > 0;

  player.attackHitbox = () =>
    player.weapon.computeHitbox(player.center, player.facing, player.attackTimer);

  // The shield is "raised" whenever the player wants to block — keys.c is held,
  // a shield is equipped, and the post-impact cooldown has elapsed. We track
  // this separately from `isBlocking` so we can pause stamina regen even
  // during the single frame the drain takes the pool to 0 (and `isBlocking`
  // briefly returns false).
  player.isShieldRaised = () => {
    const shield = player.activeShield();
    return Boolean(shield && player.blockCooldownTimer === 0 && player.gameState.keys.c);
  };

  player.isBlocking = () => player.isShieldRaised() && player.stamina > 0;

  // Per-direction offset of the shield's center from the player's center.
  // Each direction is hand-tuned to read as "held snug against the body":
  //   - up:    pulled IN toward the body so the shield mostly hides behind
  //            the player and only its top edge peeks above the head when
  //            drawn behind the sprite (see drawShieldBehind).
  //   - down:  small forward offset so the shield sits across the player's
  //            torso/hands, not floating below the feet.
  //   - left/right: 24 px reach matches the side-profile sprite's natural
  //            "arm extended forward" pose.
  const SHIELD_OFFSETS = Object.freeze({
    up:    Object.freeze([0, -16]),
    down:  Object.freeze([0, 8]),
    left:  Object.freeze([-24, 0]),
    right: Object.freeze([24, 0]),
  });

  const computeShieldDrawState = () => {
    const shield = player.activeShield();
    if (!shield || (!player.isBlocking() && player.blockImpactTimer <= 0)) return null;
    const offset = SHIELD_OFFSETS[player.facing] ?? SHIELD_OFFSETS.down;
    return {
      shield,
      cx: player.center[0] + offset[0],
      cy: player.center[1] + offset[1],
    };
  };

  const drawShieldSprite = (ctx, state) => {
    // Up/down facing shows the shield face-on; left/right facing shows the
    // edge profile. The side asset is authored with its convex face pointing
    // LEFT, so flip horizontally when the player faces right.
    const facingHorizontal = player.facing === "left" || player.facing === "right";
    const sideSprite = state.shield.spriteSide;
    const useSide = facingHorizontal && sideSprite?.complete;
    const sprite = useSide ? sideSprite : state.shield.sprite;
    if (!sprite?.complete) return;
    if (useSide && player.facing === "right") {
      ctx.save();
      ctx.translate(state.cx, state.cy);
      ctx.scale(-1, 1);
      ctx.drawImage(sprite, -18, -18, 36, 36);
      ctx.restore();
    } else {
      ctx.drawImage(sprite, state.cx - 18, state.cy - 18, 36, 36);
    }
  };

  const drawImpactArc = (ctx, state) => {
    if (player.blockImpactTimer <= 0) return;
    // Brief 180° arc fanning OUT in front of the shield (away from the
    // player) when a hit is blocked. The closed half-disc + outer stroke
    // reads as a deflected impact rather than a status aura around the
    // shield.
    const facingAngle = {
      up: -Math.PI / 2,
      down: Math.PI / 2,
      left: Math.PI,
      right: 0,
    }[player.facing] ?? Math.PI / 2;
    const arcStart = facingAngle - Math.PI / 2;
    const arcEnd = facingAngle + Math.PI / 2;

    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = "rgba(120, 180, 255, 0.28)";
    ctx.beginPath();
    ctx.arc(state.cx, state.cy, 30, arcStart, arcEnd);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "rgba(230, 245, 255, 0.9)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(state.cx, state.cy, 30, arcStart, arcEnd);
    ctx.stroke();
    ctx.restore();
  };

  // Pre-draw pass for the shield when the player is facing AWAY from the
  // camera. game.js calls this immediately before `player.draw(ctx)` so the
  // player's body sprite paints over the lower half of the shield, leaving
  // only the top peeking out above the head — which is what a shield held
  // forward (in front of the player's chest) looks like from behind. For
  // every other facing the shield draws on top of the player in drawBlock,
  // so this is a no-op.
  player.drawShieldBehind = (ctx) => {
    if (player.facing !== "up") return;
    const state = computeShieldDrawState();
    if (!state) return;
    drawShieldSprite(ctx, state);
  };

  player.drawBlock = (ctx) => {
    const state = computeShieldDrawState();
    if (!state) return;
    // Skip the sprite when facing up — drawShieldBehind handled it before
    // the player drew, so re-painting it here would put it back on top of
    // the head. The impact arc, however, always draws on top so a blocked
    // hit reads clearly regardless of facing.
    if (player.facing !== "up") drawShieldSprite(ctx, state);
    drawImpactArc(ctx, state);
  };

  const baseDraw = player.draw;
  player.draw = (ctx) => {
    baseDraw(ctx);
    statusEffects.draw(ctx);
    visualEffects.draw(ctx);
    player.flyingHitBox.draw(ctx);
  };

  player.move = (walls) => {
    const previousCenter = [...player.center];
    const keys = player.gameState.keys;
    const [up, down, left, right, shift] = [
      keys["w"], keys["s"], keys["a"], keys["d"], keys["Shift"],
    ];

    const moving = up || down || left || right;
    player.speed = BASE_SPEED * configValue({
      value: cfg.speedMultiplier,
      override: DEV_FLAGS.playerSpeedMultiplier,
    });
    player.normalizedSpeed = player.speed / Math.sqrt(2);

    statusEffects.update();
    visualEffects.update();

    player.sprinting = shift && player.stamina > 0 && moving;
    if (player.sprinting) {
      player.speedModifier = configValue({
        value: cfg.sprintMultiplier,
        override: DEV_FLAGS.playerSprintMultiplier,
      });
      player.stamina -= configValue({
        value: cfg.staminaDrain,
        override: DEV_FLAGS.playerStaminaDrain,
      }) * statusEffects.staminaDrainMultiplier();
    } else {
      player.speedModifier = 1;
    }

    statusEffects.applySpeedModifiers();

    // While blocking, the shield's size dictates how heavily movement is
    // restricted (small=0.75x, medium=0.5x, large=0.25x). Stacks
    // multiplicatively with sprint and status effect modifiers.
    if (player.isBlocking()) {
      const blockingShield = player.activeShield();
      player.speedModifier *= blockingShield.block.speedMultiplier ?? 1;
    }

    if (player.stamina < 0) player.stamina = 0;
    // Hold-to-block prevents stamina regen the same way hold-to-sprint does:
    // release `e` (or let the shield drop) before stamina recovers.
    if (player.stamina < cfg.stamina && !player.isShieldRaised()) {
      if (!moving) {
        player.stamina += configValue({
          value: cfg.staminaRegenIdle,
          override: DEV_FLAGS.playerStaminaRegenIdle,
        });
      } else if (!shift) {
        player.stamina += configValue({
          value: cfg.staminaRegenMoving,
          override: DEV_FLAGS.playerStaminaRegenMoving,
        });
      }
    }
    if (TEST_STATE[TEST_IDS.b]) player.stamina = cfg.stamina;
    if (player.invulnerable) player.invulnerable--;
    if (player.invulnerable < 0) player.invulnerable = 0;
    if (player.blockCooldownTimer > 0) player.blockCooldownTimer--;
    if (player.blockImpactTimer > 0) player.blockImpactTimer--;

    player.applyKnockback(walls);

    if (player.attackCooldownTimer > 0) player.attackCooldownTimer--;
    if (player.attackTimer > 0) player.attackTimer--;

    // Start a new attack: drain stamina, set timers, clear hit tracking
    const weapon = player.weapon;
    // Bleed stamina each frame the shield is up. When this drops the pool to
    // 0, `isBlocking()` returns false next frame and the shield naturally
    // drops until the player releases `e` and lets stamina regen.
    if (player.isBlocking()) {
      player.stamina -= player.activeShield().block.staminaCost;
      if (player.stamina < 0) player.stamina = 0;
    }

    if (keys[" "] && !player.isBlocking() && player.attackCooldownTimer === 0 && player.stamina >= weapon.staminaCost) {
      player.stamina -= weapon.staminaCost;
      player.attackTimer = weapon.duration;
      player.attackCooldownTimer = weapon.cooldown;
      player.attackHitIds.clear();
      weapon.onAttackStart();
    }

    if (up) player.facing = "up";
    if (down) player.facing = "down";
    if (left) player.facing = "left";
    if (right) player.facing = "right";

    player.wallCheck(walls);

    if (up) {
      if ((left || right) && !player.collisions.top) { // normalize diagonal speed unless blocked on top
        player.pos[1] += -player.normalizedSpeed * player.speedModifier;
      } else {
        player.pos[1] += -player.speed * player.speedModifier;
      }
      player.drawOptions.palY = player.stride.up.palY;
      if (!left && !right) {
        player.drawOptions.palX = player.stridePalettePos("up");
      }
    }

    if (down) {
      if (left || right) {
        player.pos[1] += player.normalizedSpeed * player.speedModifier;
      } else {
        player.pos[1] += player.speed * player.speedModifier;
      }
      player.drawOptions.palY = player.stride.down.palY;
      if (!left && !right) {
        player.drawOptions.palX = player.stridePalettePos("down");
      }
    }

    if (left) {
      if ((up || down) && !player.collisions.left) { // normalize diagonal speed unless blocked on left
        player.pos[0] += -player.normalizedSpeed * player.speedModifier;
      } else {
        player.pos[0] += -player.speed * player.speedModifier;
      }
      player.drawOptions.palY = player.stride.left.palY;
      player.drawOptions.palX = player.stridePalettePos("left");
    }

    if (right) {
      if (up || down) {
        player.pos[0] += player.normalizedSpeed * player.speedModifier;
      } else {
        player.pos[0] += player.speed * player.speedModifier;
      }
      player.drawOptions.palY = player.stride.right.palY;
      player.drawOptions.palX = player.stridePalettePos("right");
    }

    if (!up && !down && !right && !left) {
      player.drawOptions.palX = 48 * 1;
    }

    statusEffects.applyMovementDrift(up, down, left, right);
    player.updateSides();
    player.wallCheck(walls);

    const beingKnockedBack = player.knockbackVx !== 0 || player.knockbackVy !== 0;
    const [x, y] = player.pos;
    let exitDir;
    if (!beingKnockedBack && x < -24) {
      exitDir = "left";
      player.newRoomPos(exitDir);
      roomChange(exitDir, player.gameState.session.game.room, player.gameState);
    } else if (!beingKnockedBack && x > 720 - 24) {
      exitDir = "right";
      player.newRoomPos(exitDir);
      roomChange(exitDir, player.gameState.session.game.room, player.gameState);
    } else if (!beingKnockedBack && y < -24) {
      exitDir = "up";
      player.newRoomPos(exitDir);
      roomChange(exitDir, player.gameState.session.game.room, player.gameState);
    } else if (!beingKnockedBack && y > 720 - 24) {
      exitDir = "down";
      player.newRoomPos(exitDir);
      roomChange(exitDir, player.gameState.session.game.room, player.gameState);
    }

    if (!player.invulCheck()) {
      player.drawOptions.palX = 48 * 3;
    }

    player.updateSides();
    player.velocity = exitDir
      ? [0, 0]
      : [
        player.center[0] - previousCenter[0],
        player.center[1] - previousCenter[1],
      ];
    player.drawOptions.x = player.pos[0];
    player.drawOptions.y = player.pos[1];
  };

  return player;
}

export default createPlayer;
