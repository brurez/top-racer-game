import Input from "./Input";
import Timer from "./Timer";
import Player from "./Player";
import Road from "./Road";
import Load from "./Load";
import Vehicle from "./Vehicle";
import collision from "./collision";

import audi from "./images/Topdown_vehicle_sprites_pack/Audi.png";
import truck from "./images/Topdown_vehicle_sprites_pack/truck.png";
import road from "./images/road.png";
import taxi from "./images/Topdown_vehicle_sprites_pack/taxi.png";
import car from "./images/Topdown_vehicle_sprites_pack/Car.png";

const GAME_STATE = {
  MAIN_MENU: 0,
  RUNNING: 1,
  GAME_OVER: 2
};

const TIME_BETWEEN_LEVELS = 5000; // 5 seconds

class Game {
  constructor() {
    this.inputStates = {};

    // game states
    this.currentGameState = GAME_STATE.RUNNING;
    this.currentLevel = 1;
    this.currentLevelTime = TIME_BETWEEN_LEVELS;
  }

  start(canvasElement) {
    // Canvas, context etc.
    this.canvas = canvasElement;

    // important, we will draw with this object
    this.ctx = this.canvas.getContext("2d");
    // default police for text
    this.ctx.font = "20px Arial";
    // Create the different key and mouse listeners
    Input.listen(this.inputStates, this.canvas);

    this.player = new Player(this.ctx, this.inputStates);
    this.road = new Road(this.ctx, this.inputStates);

    this.truck = new Vehicle(this.ctx);
    this.taxi = new Vehicle(this.ctx);
    this.car = new Vehicle(this.ctx);

    this.loadAssets(images => {
      this.player.setImage(images[audi], 78, 24, 96, 216);
      this.road.setImage(images[road], 0, 0, 840, 650);
      this.truck.setImage(images[truck], 78, 24, 96, 216);
      this.car.setImage(images[car], 78, 24, 96, 216);
      this.taxi.setImage(images[taxi], 72, 18, 102, 220);

      this.car.scale = 0.79;
      this.taxi.scale = 0.68;

      this.player.moveToStartPosition();
      this.taxi.moveToStartPosition(200);
      this.truck.moveToStartPosition(450);
      this.car.moveToStartPosition(700);

      this.truck.speed.y = 0.12;
      this.taxi.speed.y = 0.09;

      requestAnimationFrame(this.mainLoop.bind(this));
    });
  }

  loadAssets(cb) {
    Load.images(audi, road, truck, taxi, car).then(images => cb(images));
  }

  clearCanvas() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
  }

  mainLoop(time) {
    // number of ms since last frame draw
    const dt = Timer.getDelta(time);

    this.clearCanvas();

    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, 0, 100, 100);

    this.road.update(dt);
    this.player.update(dt);
    this.truck.update(dt);
    this.taxi.update(dt);
    this.car.update(dt);

    if (
      collision(this.player, this.truck) ||
      collision(this.player, this.taxi) ||
      collision(this.player, this.car)
    ) {
      this.currentGameState = GAME_STATE.GAME_OVER;
    }

    switch (this.currentGameState) {
      case GAME_STATE.RUNNING:
        if (this.currentLevelTime < 0) {
          this.goToNextLevel();
        }

        break;
      case GAME_STATE.MAIN_MENU:
        // TO DO !
        break;
      case GAME_STATE.GAME_OVER:
        this.ctx.fillText("GAME OVER", 50, 100);
        this.ctx.fillText("Press SPACE to start again", 50, 150);
        this.ctx.fillText("Move with arrow keys", 50, 200);
        this.ctx.fillText("Survive 5 seconds for next level", 50, 250);

        break;
      default:
        break;
    }

    // call the animation loop every 1/60th of second
    requestAnimationFrame(this.mainLoop.bind(this));
  }

  goToNextLevel() {
    // reset time available for next level
    // 5 seconds in this example
    this.currentLevelTime = 5000;
    this.currentLevel++;
    // Add two balls per level
  }

  startNewGame() {
    this.currentLevelTime = 5000;
    this.currentLevel = 1;
    this.currentGameState = GAME_STATE.RUNNING;
  }

  displayScore() {
    const { ctx, currentLevel, currentLevelTime } = this;
    ctx.save();
    ctx.fillStyle = "Green";
    ctx.fillText("Level: " + currentLevel, 300, 30);
    ctx.fillText("Time: " + (currentLevelTime / 1000).toFixed(1), 300, 60);
    ctx.restore();
  }
}

export default Game;
