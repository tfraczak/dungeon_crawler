import * as Global from "./global_vars";
import Room from "../room";

export const collidedWithSide = (side, thisSide, otherSide) => {
  let collided = false;
  let upperDiff, lowerDiff;
  const upperBounds = 10;
  const lowerBounds = 0;
  if (side === "top" || side === "bottom") {
    const thisYVal = thisSide[1];
    const [thisXMin, thisXMax] = thisSide[0];
    const otherYVal = otherSide[1];
    const [otherXMin, otherXMax] = otherSide[0];
    
    switch (side) {
      case "top":
        upperDiff = (otherYVal - thisYVal) < upperBounds;
        lowerDiff = (otherYVal - thisYVal) > lowerBounds;
        collided = 
          (thisYVal < otherYVal) &&
          (thisXMin < otherXMax) &&
          (thisXMax > otherXMin) &&
          upperDiff && lowerDiff;
        break;
      case "bottom":
        upperDiff = (thisYVal - otherYVal) < upperBounds;
        lowerDiff = (thisYVal - otherYVal) > lowerBounds;
        collided = 
          (thisYVal > otherYVal) &&
          (thisXMin < otherXMax) &&
          (thisXMax > otherXMin) &&
          upperDiff && lowerDiff;
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
        upperDiff = (otherXVal - thisXVal) < upperBounds;
        lowerDiff = (otherXVal - thisXVal) > lowerBounds;
        collided = 
          (thisXVal < otherXVal) &&
          (thisYMin < otherYMax) &&
          (thisYMax > otherYMin) &&
          upperDiff && lowerDiff;
          break;
      case "right":
        upperDiff = (thisXVal - otherXVal) < upperBounds;
        lowerDiff = (thisXVal - otherXVal) > lowerBounds;
        collided = 
          (thisXVal > otherXVal) &&
          (thisYMin < otherYMax) &&
          (thisYMax > otherYMin) &&
          upperDiff && lowerDiff;
          break;
      default:
        break;
    }

    if (collided) return otherXVal;
    
  }

  return false;

};

const addAllExistingNeighbors = room => {
  
  let up = [...room.nodePos];
  up[1] += 1;
  up = up.toString();
  let down = [...room.nodePos];
  down[1] -= 1;
  down = down.toString();
  let left = [...room.nodePos];
  left[0] -= 1;
  left = left.toString();
  let right = [...room.nodePos];
  right[0] += 1;
  right = right.toString();

  if (Global.ROOMS[up]) room.neighbors.up = Global.ROOMS[up];
  if (Global.ROOMS[down]) room.neighbors.down = Global.ROOMS[down];
  if (Global.ROOMS[left]) room.neighbors.left = Global.ROOMS[left];
  if (Global.ROOMS[right]) room.neighbors.right = Global.ROOMS[right];
}

export const roomChange = (exitDir, currRoom) => {
  let nextNodePos = [...currRoom.nodePos];
  switch(exitDir) {
    case "up":
      nextNodePos[1] += 1;
      break;
    case "down":
      nextNodePos[1] -= 1;
      break;
    case "left":
      nextNodePos[0] -= 1;
      break;
    case "right":
      nextNodePos[0] += 1;
      break;
  }
  if (Global.ROOMS[`${nextNodePos}`]) {
    Global.SESSION.game.room = Global.ROOMS[`${nextNodePos}`];
  } else {
    const neighbor = { [exitDir]: currRoom };
    Global.SESSION.game.room = new Room(neighbor);
    addAllExistingNeighbors(currRoom);
    addAllExistingNeighbors(Global.SESSION.game.room);
  }
};