import createColBox from "./collision_box";
import { collidedWithSide } from "./utils/func_utils";

function createEntity(pos, width, height, spritePalette, colBoxOptions) {
  const colBoxWidth = colBoxOptions?.width ?? width / 2;
  const colBoxHeight = colBoxOptions?.height ?? height / 3;

  const entity = {
    pos,
    width,
    height,
    spritePalette,
    drawOptions: {
      image: spritePalette,
      palX: 0,
      palY: 0,
      _sWidth: width,
      _sHeight: height,
      x: pos[0],
      y: pos[1],
      _dWidth: width,
      _dHeight: height,
    },
    collisions: {
      top: false,
      bottom: false,
      left: false,
      right: false,
    },
  };

  entity.colBox = createColBox(entity, colBoxWidth, colBoxHeight);
  entity.top = entity.colBox.top;
  entity.bottom = entity.colBox.bottom;
  entity.left = entity.colBox.left;
  entity.right = entity.colBox.right;
  entity.center = entity.colBox.center;

  entity.colBoxHook = () => {
    const [x, y] = entity.pos;
    const cx = x + ((entity.width - entity.colBox.width) / 2);
    const cy = y + (entity.height - entity.colBox.height);
    return [cx, cy];
  };

  entity.updateSides = () => {
    entity.colBox.centerOnEntity();
    entity.center = entity.colBox.center;
    entity.top = entity.colBox.top;
    entity.bottom = entity.colBox.bottom;
    entity.left = entity.colBox.left;
    entity.right = entity.colBox.right;
  };

  entity.collidedOnSide = (side, otherObject) => {
    const opposites = { top: "bottom", bottom: "top", left: "right", right: "left" };
    const otherSide = opposites[side] || null;
    entity.collisions[side] = collidedWithSide(side, entity[side], otherObject[otherSide]);
    return entity.collisions[side];
  };

  entity.draw = (ctx) => {
    ctx.drawImage(...Object.values(entity.drawOptions));
    entity.colBox.centerOnEntity();
    entity.colBox.draw(ctx);
  };

  return entity;
}

export default createEntity;
