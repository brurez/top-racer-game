import SpriteImage from "./SpriteImage";
import Road from "./Road";

class Vehicle {
  constructor(ctx) {
    this.ctx = ctx;
    this.scale = 0.9;
    this.speed = {
      x: 0,
      y: 0.1
    };
  }

  setImage(img, ...args) {
    this.sprite = new SpriteImage(img, ...args);
  }

  moveToStartPosition() {
    this.lane = Vehicle.getRandomInt(0, Road.LANE_CENTER.length - 1);
    const { height: sH, width: sW } = this.sprite;
    this.position = { x: Road.LANE_CENTER[this.lane] - sW / 2, y: -sH };
  }

  update(dt) {
    this.position.y += this.speed.y * dt;
    this.sprite.draw(this.ctx, this.position.x, this.position.y, this.scale);

    if (this.position.y > this.ctx.canvas.height) {
      this.moveToStartPosition();
    }
  }

  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
}

export default Vehicle;
