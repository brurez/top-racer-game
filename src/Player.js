import SpriteImage from "./SpriteImage";

class Player {
  constructor(ctx, inputStates) {
    this.ctx = ctx;
    this.inputStates = inputStates;
  }

  setImage(img, ...args) {
    this.sprite = new SpriteImage(img, ...args);
  }

  update(dt) {
    this.sprite.draw(this.ctx, 0, 0, 1);
  }
}

export default Player;
