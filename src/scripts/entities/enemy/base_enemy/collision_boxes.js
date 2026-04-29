import DEV_FLAGS from "@core/dev_flags";

export const boxesOverlap = (a, b) => {
  const overlapX = Math.min(a.pos[0] + a.width, b.pos[0] + b.width) - Math.max(a.pos[0], b.pos[0]);
  const overlapY = Math.min(a.pos[1] + a.height, b.pos[1] + b.height) - Math.max(a.pos[1], b.pos[1]);
  return overlapX > 0 && overlapY > 0;
};

export const anchorMainColBox = (enemy, anchor) => {
  if (anchor !== "center") return;

  enemy.colBoxHook = () => {
    const [x, y] = enemy.pos;
    const cx = x + ((enemy.width - enemy.colBox.width) / 2);
    const cy = y + ((enemy.height - enemy.colBox.height) / 2);
    return [cx, cy];
  };
  enemy.updateSides();
};

export const setupHeadColBox = (enemy, options) => {
  enemy.headColBox = null;
  enemy.updateHeadColBox = () => {};
  enemy.drawHeadColBox = () => {};
  if (enemy.flying) return;

  const headColBox = {
    width: options.headColBox?.width ?? enemy.width / 2,
    height: options.headColBox?.height ?? enemy.height / 2,
    pos: [enemy.pos[0], enemy.pos[1]],
  };
  const headOffsetY = options.headColBox?.offsetY ?? 6;

  enemy.headColBox = headColBox;
  enemy.updateHeadColBox = () => {
    const x = enemy.pos[0] + ((enemy.width - headColBox.width) / 2);
    const y = enemy.pos[1] + headOffsetY;
    headColBox.pos = [x, y];
    headColBox.center = [
      x + (headColBox.width / 2),
      y + (headColBox.height / 2),
    ];
  };
  enemy.drawHeadColBox = (ctx) => {
    if (!DEV_FLAGS.showCollisionBoxes) return;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#00aaff";
    ctx.strokeRect(headColBox.pos[0], headColBox.pos[1], headColBox.width, headColBox.height);
  };

  const baseUpdateSides = enemy.updateSides;
  enemy.updateSides = () => {
    baseUpdateSides();
    enemy.updateHeadColBox();
  };
  enemy.updateHeadColBox();
};
