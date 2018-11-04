import Input from "./Input";
import Timer from "./Timer";
import Player from "./Player";
import Road from "./Road";
import Load from "./Load";
import Vehicle from "./Vehicle";

import audi from "./images/Topdown_vehicle_sprites_pack/Audi.png";
import truck from "./images/Topdown_vehicle_sprites_pack/truck.png";
import road from "./images/road.png";
import taxi from "./images/Topdown_vehicle_sprites_pack/taxi.png";
import car from "./images/Topdown_vehicle_sprites_pack/Car.png";
import collision from "./collision";

const TIME_BETWEEN_LEVELS = 5000;

const GAME_STATE = {
  MAIN_MENU: 0,
  RUNNING: 1,
  GAME_OVER: 2
};

const INITIAL_SPEED = {
  TRUCK: 0.15,
  CAR: 0.12,
  TAXI: 0.14,
  ROAD: 0.4
};

class Game {
  constructor() {
    this.inputStates = {};

    // game states
    this.currentGameState = GAME_STATE.RUNNING;
    this.currentLevel = 1;
    this.currentLevelTime = TIME_BETWEEN_LEVELS;
  }

  loadAssets(cb) {
    Load.images(audi, road, truck, taxi, car).then(images => cb(images));
  }

  start(canvasElement) {
    // Canvas, context etc.
    this.canvas = canvasElement;

    // important, we will draw with this object
    this.ctx = this.canvas.getContext("2d");
    // default police for text
    this.ctx.font = "22px Consola";
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

      this.resetEntities();

      requestAnimationFrame(this.mainLoop.bind(this));
    });
  }

  resetEntities() {
    this.player.moveToStartPosition();
    this.taxi.moveToStartPosition(200);
    this.truck.moveToStartPosition(450);
    this.car.moveToStartPosition(700);

    this.road.speed.y = INITIAL_SPEED.ROAD;
    this.truck.speed.y = INITIAL_SPEED.TRUCK;
    this.taxi.speed.y = INITIAL_SPEED.TAXI;
    this.car.speed.y = INITIAL_SPEED.CAR;
  }

  clearCanvas() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
  }

  running(dt) {
    this.clearCanvas();

    this.road.update(dt);
    this.player.update(dt);
    this.truck.update(dt);
    this.taxi.update(dt);
    this.car.update(dt);

    this.displayScore();

    this.currentLevelTime -= dt;

    if (this.player.checkCollision(this.truck, this.taxi, this.car)) {
      this.currentGameState = GAME_STATE.GAME_OVER;
    }

    Game.checkCollision(this.car, this.truck);
    Game.checkCollision(this.car, this.taxi);
    Game.checkCollision(this.taxi, this.truck);
  }

  static checkCollision(entity1, entity2) {
    if (collision(entity1, entity2, 20)) {
      if (collision(entity1, entity2)) {
        entity1.moveToStartPosition();
      } else {
        entity1.speed = { ...entity2.speed };
      }
    }
  }

  gameOver() {
    const { width: cW } = this.ctx.canvas;
    this.ctx.save();
    this.ctx.fillStyle = "White";
    this.ctx.fillText("GAME OVER", cW / 2, 100);
    this.ctx.fillText("Press SPACE to start again", cW / 2, 150);
    this.ctx.fillText("Move with arrow keys", cW / 2, 200);
    this.ctx.fillText("Survive 5 seconds for next level", cW / 2, 250);
    this.ctx.restore();
  }

  mainLoop(time) {
    // number of ms since last frame draw
    const dt = Timer.getDelta(time);

    switch (this.currentGameState) {
      case GAME_STATE.RUNNING:
        this.running(dt);

        if (this.currentLevelTime < 0) {
          this.goToNextLevel();
        }

        break;
      case GAME_STATE.MAIN_MENU:
        // TO DO !
        break;
      case GAME_STATE.GAME_OVER:
        this.gameOver();
        if (this.inputStates.space) this.startNewGame();
        break;
      default:
        break;
    }

    // call the animation loop every 1/60th of second
    requestAnimationFrame(this.mainLoop.bind(this));
  }

  goToNextLevel() {
    // reset time available for next level
    this.currentLevelTime = TIME_BETWEEN_LEVELS;
    this.currentLevel++;

    const difficult = 1.2;

    this.road.speed.y *= difficult;
    this.truck.speed.y *= difficult;
    this.car.speed.y *= difficult;
    this.taxi.speed.y *= difficult;
  }

  startNewGame() {
    this.currentLevelTime = TIME_BETWEEN_LEVELS;
    this.currentLevel = 1;
    this.currentGameState = GAME_STATE.RUNNING;
    this.resetEntities();
  }

  displayScore() {
    const { ctx, currentLevel, currentLevelTime } = this;
    ctx.save();
    ctx.fillStyle = "White";
    ctx.fillText("Level: " + currentLevel, 300, 30);
    ctx.fillText("Time: " + (currentLevelTime / 1000).toFixed(1), 300, 60);
    ctx.restore();
  }
}

export default Game;
