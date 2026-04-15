class GameState {
  constructor() {
    this.keys = {
      w: false,
      a: false,
      s: false,
      d: false,
      Shift: false,
      Enter: false,
    };
    this.session = {};
    this.sprites = {};
    this.bgImgs = {};
    this.gameOptions = {};
  }

  reset() {
    if (this.session.game) {
      this.session.game.requestStop = true;
    }
    this.session = {};
  }
}

export default GameState;
