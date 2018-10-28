const getMousePos = (e, canvas) => {
  // necessary to take into account CSS boudaries
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
};

const addWindowListeners = (inputStates) => {
  //add the listener to the main, window object, and update the states
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 37) {
      inputStates.left = true;
    } else if (event.keyCode === 38) {
      inputStates.up = true;
    } else if (event.keyCode === 39) {
      inputStates.right = true;
    } else if (event.keyCode === 40) {
      inputStates.down = true;
    } else if (event.keyCode === 32) {
      inputStates.space = true;
    }
  }, false);

  //if the key will be released, change the states object
  document.addEventListener('keyup', function (event) {
    if (event.keyCode === 37) {
      inputStates.left = false;
    } else if (event.keyCode === 38) {
      inputStates.up = false;
    } else if (event.keyCode === 39) {
      inputStates.right = false;
    } else if (event.keyCode === 40) {
      inputStates.down = false;
    } else if (event.keyCode === 32) {
      inputStates.space = false;
    }
  }, false);
};

const addCanvasListeners = (inputStates, canvas) => {
  // Mouse event listeners
  canvas.addEventListener('mousemove', function (e) {
    inputStates.mousePos = getMousePos(e, canvas);
  }, false);

  canvas.addEventListener('mousedown', function (e) {
    inputStates.mousedown = true;
    inputStates.mouseButton = e.button;
  }, false);

  canvas.addEventListener('mouseup', function (e) {
    inputStates.mousedown = false;
  }, false);
};

const Input = {
  listen(inputStates = {}, canvas) {
    addWindowListeners(inputStates);
    addCanvasListeners(inputStates, canvas);
  }  
};

export default Input;
