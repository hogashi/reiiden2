import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Canvas from './Canvas';
import Rect from './objects/Rect';
import BaseObject from './objects/BaseObject';

const FPS = 40.0;
let timer: number;

function main({ canvas }: { canvas: Canvas }) {
  const objects: BaseObject[] = [];

  const x = 10;
  const y = 20;
  const width = canvas.size.width / 2;
  const height = canvas.size.height / 2;
  const player = new Rect({ canvas, x, y, width, height });
  objects.push(player);

  timer = setInterval(() => {
    const date = new Date();
    const newWidth =
      width *
      0.025 *
      (Math.floor(date.getSeconds() * 1000 + date.getMilliseconds() / 100) %
        40);
    const newHeight =
      height *
      0.015 *
      (Math.floor(
        600 - (date.getSeconds() * 1000 + date.getMilliseconds()) / 100
      ) %
        77);
    console.log(newWidth, newHeight);
    player.setParams({ width: newWidth, height: newHeight });
    canvas.clear();
    objects.forEach(object => {
      object.render();
    });
  }, 1000.0 / FPS);
}

function init() {
  const root = document.getElementById('root');
  if (!root) {
    return;
  }
  const canvas = new Canvas({
    parent: root,
    size: {
      width: 640,
      height: 400,
    },
  });

  main({ canvas });
}

init();

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    clearInterval(timer);
  }
});
