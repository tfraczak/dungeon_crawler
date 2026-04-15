function createGameState() {
  return {
    keys: {
      w: false,
      a: false,
      s: false,
      d: false,
      Shift: false,
      Enter: false,
    },
    session: {},
    sprites: {},
    bgImgs: {},
    gameOptions: {},
    reset() {
      if (this.session.game) {
        this.session.game.requestStop = true;
      }
      this.session = {};
    },
  };
}

export default createGameState;
