class SpriteImage {
  constructor(img, x, y, width, height) {
    this.img = img; // the whole image that contains all sprites
    this.x = x; // x, y position of the sprite image in the whole image
    this.y = y;
    this.width = width; // width and height of the sprite image
    this.height = height;
  }

  // xPos and yPos = position where the sprite should be drawn,
  // scale = rescaling factor between 0 and 1
  draw(ctx, xPos, yPos, scale) {
    ctx.drawImage(
      this.img,
      this.x,
      this.y, // x, y, width and height of img to extract
      this.width,
      this.height,
      xPos,
      yPos, // x, y, width and height of img to draw
      this.width * scale,
      this.height * scale
    );
  }
}

export default SpriteImage;
