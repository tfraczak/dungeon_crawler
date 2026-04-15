function createWall(pos, width, height) {
  const [x, y] = pos;
  const topLeft = pos;
  const topRight = [x + width, y];
  const bottomRight = [x + width, y + height];
  const bottomLeft = [x, y + height];

  return {
    pos,
    width,
    height,
    top: [[topLeft[0], topRight[0]], topLeft[1]],
    bottom: [[bottomLeft[0], bottomRight[0]], bottomLeft[1]],
    right: [topRight[0], [topRight[1], bottomRight[1]]],
    left: [topLeft[0], [topLeft[1], bottomLeft[1]]],
    draw(ctx) {
      ctx.beginPath();
      ctx.fillStyle = "transparent";
      ctx.fillRect(...pos, width, height);
    },
  };
}

export default createWall;
