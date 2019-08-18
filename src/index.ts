// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import Canvas from './Canvas';
import Rect from './objects/Rect';
import Base from './objects/Base';

const FPS = 60.0;
let timer: number;

function main({ canvas }: { canvas: Canvas }) {
  const objects: Base[] = [];

  const width = 10;
  const height = 10;
  let x = canvas.size.width / 2;
  let y = canvas.size.height - height;
  const style = 'blue';
  const player = new Rect({ canvas, x, y, width, height, style });
  objects.push(player);

  // const pressedArrow: { [key: string]: boolean } = {
  //   ArrowUp: false,
  //   ArrowRight: false,
  //   ArrowDown: false,
  //   ArrowLeft: false,
  // };
  const moveByArrow: { [key: string]: [boolean, number[]] } = {
    ArrowUp: [false, [0, -1]],
    ArrowRight: [false, [1, 0]],
    ArrowDown: [false, [0, 1]],
    ArrowLeft: [false, [-1, 0]],
  };
  document.addEventListener('keydown', e => {
    console.log('down', e.key);
    if (moveByArrow[e.key] !== undefined) {
      moveByArrow[e.key][0] = true;
    }
  });
  document.addEventListener('keyup', e => {
    if (moveByArrow[e.key] !== undefined) {
      moveByArrow[e.key][0] = false;
    }
  });

  timer = setInterval(() => {
    const m = Object.values(moveByArrow).reduce(
      (sum, cur) => {
        const c = cur[0] ? cur[1] : [0, 0];
        return [sum[0] + c[0], sum[1] + c[1]];
      },
      [0, 0]
    );
    const params = player.getParams();
    x = params.x + m[0] * 3;
    y = params.y + m[1] * 3;
    player.move({ x, y });
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
