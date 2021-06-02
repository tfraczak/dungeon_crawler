export const collidedWithSide = (side, thisSide, otherSide) => {
  let collided = false;
  if (side === "top" || side === "bottom") {
    const thisYVal = thisSide[1];
    const [thisXMin, thisXMax] = thisSide[0];
    const otherYVal = otherSide[1];
    const [otherXMin, otherXMax] = otherSide[0];
    
    switch (side) {
      case "top":
        collided = 
          (thisYVal < otherYVal) &&
          (thisXMin < otherXMax) &&
          (thisXMax > otherXMin) &&
          (Math.round(thisYVal/10) === Math.round(otherYVal/10));
        break;
      case "bottom":
        collided = 
          (thisYVal > otherYVal) &&
          (thisXMin < otherXMax) &&
          (thisXMax > otherXMin) &&
          (Math.round(thisYVal/10) === Math.round(otherYVal/10));
        break;
      default:
        break;
    }

    if (collided) return otherYVal;

  } else {
    const thisXVal = thisSide[0];
    const [thisYMin, thisYMax] = thisSide[1];
    const otherXVal = otherSide[0];
    const [otherYMin, otherYMax] = otherSide[1];
    
    switch (side) {
      case "left":
        collided = 
          (thisXVal < otherXVal) &&
          (thisYMin < otherYMax) &&
          (thisYMax > otherYMin) &&
          (Math.round(thisXVal/10) === Math.round(otherXVal/10));
          break;
      case "right":
        collided = 
          (thisXVal > otherXVal) &&
          (thisYMin < otherYMax) &&
          (thisYMax > otherYMin) &&
          (Math.round(thisXVal/10) === Math.round(otherXVal/10));
          break;
      default:
        break;
    }

    if (collided) return otherXVal;
    
  }

  return false;

};