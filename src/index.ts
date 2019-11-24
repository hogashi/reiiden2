// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import Canvas from './Canvas';
import BaseObject from './objects/BaseObject';
import Player from './objects/Player';

const FPS = 58;
let fpsCounter = 0;
let timer: number;
let fpsTimer: number;

function main({ canvas }: { canvas: Canvas }) {
  const objects: BaseObject[] = [];

  const margin = 3;
  const width = 20;
  const height = 20;
  const x = (canvas.size.width - width) / 2;
  const y = canvas.size.height - height - margin;
  const style = 'red';
  const player = new Player({ canvas, x, y, width, height, margin, style });
  objects.push(player);

  timer = setInterval(() => {
    fpsCounter += 1;

    canvas.clear();
    objects.forEach(object => {
      object.render();
    });
  }, 1000.0 / FPS);

  fpsTimer = setInterval(() => {
    const fps = fpsCounter;
    console.log(`FPS: ${fps}`);
    fpsCounter = 0;
  }, 1000);
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
  if (e.key === 'Escape') {
    clearInterval(fpsTimer);
  }
});
