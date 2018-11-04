import SpriteImage from './SpriteImage';

class SpriteAnimation {
  constructor() {
    this.spriteArray = [];
    this.currentFrame = 0;
    this.delayBetweenFrames = 10;

    this.extractSprites = function(
      spritesheet,
      nbPostures,
      nbFramesPerPosture,
      spriteWidth,
      spriteHeight
    ) {
      // number of sprites to extract
      const nbSprites = nbPostures * nbFramesPerPosture - 1;
      // number of sprites per row in the spritesheet
      const nbSpritesPerRow = Math.floor(spritesheet.width / spriteWidth);

      // Extract each sprite
      for (let index = 0; index < nbSprites; index++) {
        // Computation of the x and y position that corresponds to the sprite
        // index
        // x is the rest of index/nbSpritesPerRow * width of a sprite
        const x = (index % nbSpritesPerRow) * spriteWidth;
        // y is the divisor of index by nbSpritesPerRow * height of a sprite
        const y = Math.floor(index / nbSpritesPerRow) * spriteHeight;

        // build a spriteImage object
        const s = new SpriteImage(spritesheet, x, y, spriteWidth, spriteHeight);

        this.spriteArray.push(s);
      }
    };

    this.then = performance.now();
    this.totalTimeSinceLastRedraw = 0;

    this.draw = function(ctx, x, y) {
      // Use time based animation to draw only a few images per second
      const now = performance.now();
      const delta = now - this.then;

      // draw currentSpriteImage
      const currentSpriteImage = this.spriteArray[this.currentFrame];
      // x, y, scale. 1 = size unchanged
      currentSpriteImage.draw(ctx, x, y, 1);

      // if the delay between images is elapsed, go to the next one
      if (this.totalTimeSinceLastRedraw > this.delayBetweenFrames) {
        // Go to the next sprite image
        this.currentFrame++;
        this.currentFrame %= this.spriteArray.length;

        // reset the total time since last image has been drawn
        this.totalTimeSinceLastRedraw = 0;
      } else {
        // sum the total time since last redraw
        this.totalTimeSinceLastRedraw += delta;
      }

      this.then = now;
    };

    this.setNbImagesPerSecond = function(nb) {
      // elay in ms between images
      this.delayBetweenFrames = 1000 / nb;
    };
  }
}

export default SpriteAnimation
