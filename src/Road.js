import SpriteImage from './SpriteImage';

class Road {
  constructor(ctx, inputStates) {
    this.ctx = ctx;
    this.inputStates = inputStates;
    this.speed = 0.5;
    this.totalSeconds = 0;
  }

  setImage(img, ...args) {
    this.sprite = new SpriteImage(img, ...args);
  }

  update(dt) {
    const { width: cW } = this.ctx.canvas;
    const { height: sH, width: sW } = this.sprite;
    this.totalSeconds += dt;
    const numImages = Math.ceil(cW / sW) + 1;
    const yPos = this.totalSeconds * this.speed % sH;

    this.ctx.save();
    this.ctx.translate(0, yPos);
    for (let i = 0; i < numImages; i++) {
      this.sprite.draw(this.ctx, cW / 2 - sW / 2, -i * sH, 1)
    }
    this.ctx.restore();
  }
}

export default Road;
