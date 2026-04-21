// `world` mixes its own literal keys (width/height/tileSize/baseSpeed) with
// the `room` subtree, so it can't be a pure barrel — it imports the `room`
// namespace and freezes the assembled object instead.
import * as room from "./room";

export default Object.freeze({
  baseSpeed: 1,
  height: 720,
  room,
  tileSize: 48,
  width: 720,
});
