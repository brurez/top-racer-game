class Brick {
  static width = 50;
  static height = 20;

  constructor(x, y, { color }){
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw(ctx) {
    ctx.save();

    ctx.restore();
  }
}

export default Brick;
