// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import Canvas from './Canvas';
import Rect from './objects/Rect';
import Base from './objects/Base';

const FPS = 60.0;
let timer: number;

function main({ canvas }: { canvas: Canvas }) {
  const objects: Base[] = [];

  let x = 10;
  let y = 20;
  const width = canvas.size.width / 2;
  const height = canvas.size.height / 2;
  const style = 'blue';
  const player = new Rect({ canvas, x, y, width, height, style });
  objects.push(player);

  let signX = 1;
  let signY = 1;

  timer = setInterval(() => {
    const date = new Date();
    x += Math.floor(0.01 * date.getMilliseconds()) * signX;
    y +=
      Math.floor(
        0.06 *
          Math.abs(
            160 -
              (date.getMilliseconds() / 10 + (5 - (date.getSeconds() % 5)) * 20)
          )
      ) * signY;
    signX =
      x > canvas.size.width - player.getParams().width ? -1 : x < 0 ? 1 : signX;
    signY =
      y > canvas.size.height - player.getParams().height
        ? -1
        : y < 0
        ? 1
        : signY;
    console.log(x, y);
    player.setParams({ x, y });
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
