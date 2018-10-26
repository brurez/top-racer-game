let oldTime = 0;

const Timer = {
  getDelta(currentTime) {
    const delta = currentTime - oldTime;
    oldTime = currentTime;
    return delta;
  },
  distanceToMove(delta, speed) {
    return (speed * delta) / 1000;
  }
};

export default Timer;
