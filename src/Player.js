import SpriteImage from "./SpriteImage";
import collision from "./collision";
import SpriteAnimation from "./SpriteAnimation";

class Player {
  static maxSpeed = 0.5;
  static RUNNING = "running";
  static EXPLODING = "exploding";

  constructor(ctx, inputStates) {
    this.ctx = ctx;
    this.inputStates = inputStates;
    this.position = {
      x: 0,
      y: 0
    };
    this.scale = 0.7;
    this.state = Player.RUNNING;
  }

  get height() {
    return this.sprite.height * this.scale;
  }

  get width() {
    return this.sprite.width * this.scale;
  }

  setState(state) {
    this.state = state;
  }

  setImage(img, ...args) {
    this.sprite = new SpriteImage(img, ...args);
  }

  setExplosion(img) {
    this.explosion = new SpriteAnimation();
    this.explosion.extractSprites(img, 16, 10, 64, 64);
  }

  checkCollision(...entities) {
    return !!entities.find(ent => collision(this, ent, -20));
  }

  moveToStartPosition() {
    const { height: cH, width: cW } = this.ctx.canvas;
    this.position = {
      x: cW / 2 - (this.sprite.width * this.scale) / 2,
      y: cH - 16 - this.sprite.height * this.scale
    };
  }

  setPosition(x, y) {
    this.position = { x, y };
  }

  update(dt) {
    switch (this.state) {
      case Player.RUNNING:
        if (this.inputStates.left) {
          this.position.x += -Player.maxSpeed * dt;
        }
        if (this.inputStates.right) {
          this.position.x += Player.maxSpeed * dt;
        }

        this.sprite.draw(
          this.ctx,
          this.position.x,
          this.position.y,
          this.scale
        );
        break;

      case Player.EXPLODING:
        this.explosion.draw(this.ctx, this.position.x, this.position.y );
        break;

      default:
        break;
    }
  }
}

export default Player;
