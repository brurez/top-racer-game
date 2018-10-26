import './index.css';
import Game from './Game'

window.onload = function init() {
  const game = new Game();
  game.start(document.querySelector('#root'));
};
