

class ColBox {
  constructor(entity, width, height) {
    this.entity = entity;
    this.width = width;
    this.height = height;
    this.pos = this.originPos();

    const [x,y] = this.pos;
    const topLeft = this.pos;
    const topRight = [x+width,y];
    const bottomRight = [x+width,y+height];
    const bottomLeft = [x,y+height];
    
    this.center = [x+(width/2),y+(height/2)];
    this.top = [[topLeft[0],topRight[0]], topLeft[1]];
    this.bottom = [[bottomLeft[0],bottomRight[0]], bottomLeft[1]];
    this.right = [topRight[0], [topRight[1],bottomRight[1]]];
    this.left = [topLeft[0], [topLeft[1],bottomLeft[1]]];
    this.sides = [this.top, this.bottom, this.right, this.left];
    
  }
  draw(ctx) {
    ctx.strokeStyle = "transparent";
    ctx.strokeRect(
      this.pos[0],
      this.pos[1],
      this.width,
      this.height,
    )
  }

  updateSides() {
    const [x,y] = this.pos;
    const topLeft = this.pos;
    const topRight = [x+this.width,y];
    const bottomRight = [x+this.width,y+this.height];
    const bottomLeft = [x,y+this.height];
    this.center = [x+(this.width/2),y+(this.height/2)];
    this.top = [[topLeft[0],topRight[0]], topLeft[1]];
    this.bottom = [[bottomLeft[0],bottomRight[0]], bottomLeft[1]];
    this.right = [topRight[0], [topRight[1],bottomRight[1]]];
    this.left = [topLeft[0], [topLeft[1],bottomLeft[1]]];
  }

  originPos() {
    const [ex,ey] = [this.entity.pos[0], this.entity.pos[1]];
    const [ew,eh] = [this.entity.width, this.entity.height];
    const [tw,th] = [this.width, this.height];
    const x = ex + ((ew-tw)/2);
    const y = ey + eh - th;
    return [x,y];
  }

  centerOnEntity() {
    this.pos = this.entity.colBoxHook();
    this.updateSides();
  }

}

export default ColBox;