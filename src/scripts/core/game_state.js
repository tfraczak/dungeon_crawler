function createGameState() {
  return {
    isMobile: navigator.maxTouchPoints > 0 && matchMedia('(hover: none)').matches,
    keys: {
      w: false,
      a: false,
      s: false,
      d: false,
      Shift: false,
      Enter: false,
      " ": false,
    },
    mobileZoom: 1,
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
