class Wall {
  constructor(pos, width, height) {
    this.width = width;
    this.height = height;
    this.pos = pos;
    const [x,y] = this.pos;
    const topLeft = this.pos;
    const topRight = [x+this.width,y];
    const bottomRight = [x+this.width,y+this.height];
    const bottomLeft = [x,y+this.height];
    this.top = [[topLeft[0],topRight[0]], topLeft[1]];
    this.bottom = [[bottomLeft[0],bottomRight[0]], bottomLeft[1]];
    this.right = [topRight[0], [topRight[1],bottomRight[1]]];
    this.left = [topLeft[0], [topLeft[1],bottomLeft[1]]];
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#transparent";
    ctx.fillRect(...this.pos, this.width, this.height);
  }

}

export default Wall;