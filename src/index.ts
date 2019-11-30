// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import Canvas from './Canvas';
import Base from './objects/Base';
import Player from './objects/Player';
import Onmyo from './objects/Onmyo';
import Masu from './objects/Masu';

const FPS = 58;
let fpsCounter = 0;
let renderTimer: number;
let fpsTimer: number;

function main({ canvas }: { canvas: Canvas }) {
  const objects: Base[] = [];

  const margin = 3;
  const masuSize = 40;
  const playerSize = 20;
  const circleRadius = 20;

  objects.push(
    new Masu({
      canvas,
      x: (canvas.size.width - masuSize) / 2,
      y: (canvas.size.height - masuSize) / 2,
      width: masuSize,
      height: masuSize,
      style: 'green',
    }),
    new Player({
      canvas,
      x: (canvas.size.width - playerSize) / 2,
      y: playerSize + margin,
      width: playerSize,
      height: playerSize,
      margin,
      style: 'red',
    }),
    new Onmyo({
      canvas,
      x: (canvas.size.width - circleRadius) / 2,
      y: (canvas.size.height - circleRadius) / 2,
      radius: circleRadius,
      margin,
      style: 'blue',
    })
  );

  renderTimer = setInterval(() => {
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
    clearInterval(renderTimer);
    clearInterval(fpsTimer);
  }
});
