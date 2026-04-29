const FRAME_SIZE = 48;
const FRAMES_PER_ENEMY_COLUMN = 3;
const FRAMES_PER_ENEMY_ROW = 4;

export const setupAnimation = (enemy, spriteGridPos) => {
  const { row, column } = spriteGridPos;
  const palXOffset = column * FRAMES_PER_ENEMY_COLUMN * FRAME_SIZE;
  const palYOffset = row * FRAMES_PER_ENEMY_ROW * FRAME_SIZE;

  enemy.palXOffset = palXOffset;
  enemy.stride = {
    up:    { stepCount: 0, palY: (FRAME_SIZE * 3) + palYOffset },
    down:  { stepCount: 0, palY: (FRAME_SIZE * 0) + palYOffset },
    left:  { stepCount: 0, palY: (FRAME_SIZE * 1) + palYOffset },
    right: { stepCount: 0, palY: (FRAME_SIZE * 2) + palYOffset },
  };

  // Derive a 4-phase cycle (idle, foot/wing down, idle, foot/wing down).
  enemy.stridePalettePos = (direction) => {
    enemy.pace = Math.max(1, enemy.animationPace(enemy));
    const stride = enemy.stride[direction];
    const cycleLength = Math.max(1, 4 * enemy.pace);
    const phase = Math.floor((stride.stepCount % cycleLength) / enemy.pace) % 4;

    stride.stepCount++;
    if (stride.stepCount >= cycleLength) stride.stepCount = 0;

    switch (phase) {
      case 1:  return (FRAME_SIZE * 0) + enemy.palXOffset;
      case 3:  return (FRAME_SIZE * 2) + enemy.palXOffset;
      default: return (FRAME_SIZE * 1) + enemy.palXOffset;
    }
  };
};

export const updateSpriteFrame = (enemy) => {
  switch (enemy.spriteDir) {
    case "up":
      enemy.drawOptions.palY = enemy.stride.up.palY;
      enemy.drawOptions.palX = enemy.stridePalettePos("up");
      break;
    case "down":
      enemy.drawOptions.palY = enemy.stride.down.palY;
      enemy.drawOptions.palX = enemy.stridePalettePos("down");
      break;
    case "left":
      enemy.drawOptions.palY = enemy.stride.left.palY;
      enemy.drawOptions.palX = enemy.stridePalettePos("left");
      break;
    case "right":
      enemy.drawOptions.palY = enemy.stride.right.palY;
      enemy.drawOptions.palX = enemy.stridePalettePos("right");
      break;
    default:
      enemy.drawOptions.palX = enemy.palXOffset + FRAME_SIZE;
      break;
  }
};
