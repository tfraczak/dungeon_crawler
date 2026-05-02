const makeMask = (player) => {
  const mask = typeof document === "undefined" ? null : document.createElement("canvas");
  if (mask) {
    mask.width = player.width;
    mask.height = player.height;
  }
  return {
    mask,
    ctx: mask?.getContext("2d"),
  };
};

export default makeMask;
