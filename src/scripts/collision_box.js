function createColBox(entity, width, height) {
  const colBox = { entity, width, height };

  colBox.originPos = () => {
    const [ex, ey] = [colBox.entity.pos[0], colBox.entity.pos[1]];
    const [ew, eh] = [colBox.entity.width, colBox.entity.height];
    const x = ex + ((ew - width) / 2);
    const y = ey + eh - height;
    return [x, y];
  };

  colBox.pos = colBox.originPos();

  const computeSides = () => {
    const [x, y] = colBox.pos;
    const topLeft = colBox.pos;
    const topRight = [x + width, y];
    const bottomRight = [x + width, y + height];
    const bottomLeft = [x, y + height];
    colBox.center = [x + (width / 2), y + (height / 2)];
    colBox.top = [[topLeft[0], topRight[0]], topLeft[1]];
    colBox.bottom = [[bottomLeft[0], bottomRight[0]], bottomLeft[1]];
    colBox.right = [topRight[0], [topRight[1], bottomRight[1]]];
    colBox.left = [topLeft[0], [topLeft[1], bottomLeft[1]]];
  };

  computeSides();

  colBox.updateSides = computeSides;

  colBox.draw = (ctx) => {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "transparent";
    ctx.strokeRect(colBox.pos[0], colBox.pos[1], colBox.width, colBox.height);
  };

  colBox.centerOnEntity = () => {
    colBox.pos = colBox.entity.colBoxHook();
    colBox.updateSides();
  };

  return colBox;
}

export default createColBox;
