// reiiden

const WIDTH = 640,
  HEIGHT = 400;

const SEQ_TITLE = 0,
  SEQ_PLAY = 1,
  SEQ_OVER = 2,
  SEQ_CLEAR = 3;

const MARGIN = 5;

let sequence;

let stage;
const MAX_STAGE = 2;

const ACCEL = 0.15,
  LOSS = 1.0;

let playerX, playerY;
const PLAYER_WIDTH = 40,
  PLAYER_HEIGHT = 20;

const BALL_RADIUS = 30;
const BALL_SPEED_INIT = -1 * (Math.sqrt(2.0 * ACCEL * HEIGHT));
let ballX, ballY, ballSpeedX, ballSpeedY;

let isBallInPlayer = false;

const BLOCK_WIDTH = 45,
  BLOCK_HEIGHT = 45,
  BLOCK_MARGIN = 5,
  BLOCK_ROW = 5,
  BLOCK_COLUMN = 12;

let blockMap = [];
const blockMaps = [
  [
    0, 0, 1,  1, 1, 0,  0, 1, 1,  1, 0, 0,
    0, 0, 1,  1, 1, 0,  0, 1, 1,  1, 0, 0,
    0, 0, 1,  0, 1, 0,  0, 1, 0,  1, 0, 0,
    0, 0, 1,  1, 1, 0,  0, 1, 1,  1, 0, 0,
    0, 0, 1,  0, 0, 0,  0, 0, 0,  1, 0, 0
  ],
  [
    0, 1, 1,  0, 1, 1,  1, 1, 1,  1, 1, 1,
    0, 1, 1,  0, 1, 1,  0, 0, 0,  0, 0, 0,
    0, 1, 1,  0, 1, 1,  1, 1, 1,  1, 1, 1,
    0, 1, 1,  0, 1, 1,  0, 0, 0,  0, 0, 0,
    0, 1, 1,  0, 1, 1,  1, 1, 1,  1, 1, 0
  ],
  [
    0, 1, 0,  1, 1, 0,  1, 0, 1,  0, 1, 0,
    1, 0, 0,  0, 0, 1,  0, 1, 0,  0, 0, 1,
    0, 1, 0,  1, 0, 1,  0, 1, 0,  1, 1, 1,
    0, 0, 1,  1, 0, 1,  1, 0, 1,  1, 1, 1,
    0, 0, 0,  1, 1, 1,  0, 1, 0,  1, 1, 0
  ]
];
let isBlockRemains;

let score = 0;

let ballLastX, ballLastY;

function setup() {
  createCanvas(640, 400);
  noStroke();
  colorMode(HSB, 100, 100, 100);

  gameInit();
}

function draw() {
  background(0);

  switch(sequence) {
    case SEQ_TITLE:
      gameTitle();
      break;
    case SEQ_PLAY:
      gamePlay();
      break;
    case SEQ_OVER:
      gameOver();
      break;
    case SEQ_CLEAR:
      gameClear();
      break;
    default:
      break;
  }
}

function gameInit() {
  sequence = SEQ_TITLE;
  isBlockRemains = false;
}

/**
 * @returns {Boolean}
 */
function gameStageInit() {
  if (stage > MAX_STAGE) {
    sequence = SEQ_CLEAR;
    return false;
  }

  playerX = 200;
  playerY = height - PLAYER_HEIGHT - MARGIN;

  ballX = 100;
  ballY = height - 2 * PLAYER_HEIGHT - MARGIN;
  ballSpeedX = 2;
  ballSpeedY = BALL_SPEED_INIT;

  isBallInPlayer = false;

  blockMap = [...blockMaps[stage]];
  isBlockRemains = true;

  return true;
}

function gameTitle() {
  sequence = SEQ_PLAY;

  score = 0;
  stage = -1;
  return;
}

function gamePlay() {
  if (!isBlockRemains) {
    stage += 1;
    if (!gameStageInit()) {
      return;
    }
  }

  // 跳ね返り方向判定用
  ballLastX = ballX;
  ballLastY = ballY;

  stageDisplay();
  scoreDisplay();

  playerMove();
  playerDisplay();

  blockDisplay();

  ballMove();
  ballDisplay();

  return;
}

function gameOver() {
  textSize(24);
  fill(0, 0, 100);
  text("GAME OVER @ stage " + stage + ", score " + score, 60, (height - 24) / 2);
  return;
}

function gameClear() {
  textSize(24);
  fill(0, 0, 100);
  text("CLEAR @ stage " + stage + ", score " + score, 60, (height - 24) / 2);
  // exit();
  return;
}

function stageDisplay() {
  textSize(20);
  fill(0, 0, 100);
  text("stage: " + stage, 10, 20);
}

function scoreDisplay() {
  textSize(20);
  fill(0, 0, 100);
  text("score: " + score, 10, 40);
}

function playerDisplay() {
  fill(0, 100, 100);
  rect(playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);
}

function playerMove() {
  playerX = mouseX - PLAYER_WIDTH / 2;
  if ((playerX + PLAYER_WIDTH) > width - MARGIN) {
    playerX = width - MARGIN - PLAYER_WIDTH;
  } else if (playerX < MARGIN) {
    playerX = MARGIN;
  }
}

function blockDisplay() {
  let blockX, blockY;

  isBlockRemains = false;

  for (let i = 0; i < BLOCK_ROW; i += 1) {
    for (let j = 0; j < BLOCK_COLUMN; j += 1) {
      if (blockMap[i * BLOCK_COLUMN + j] == 1) {
        fill(i * 15, 100, 100);
        blockX = j * (BLOCK_WIDTH + BLOCK_MARGIN);
        blockY = 50 + i * (BLOCK_HEIGHT + BLOCK_MARGIN);
        rect(blockX, blockY, BLOCK_WIDTH, BLOCK_HEIGHT);

        blockHitCheck(i * BLOCK_COLUMN + j, blockX, blockY);
      }
    }
  }
}

function blockHitCheck(number, blockX, blockY) {
  // println(
  //   number,
  //   (blockX < ballX) && (ballX < blockX + BLOCK_WIDTH) &&
  //   (blockY < ballY) && (ballY < blockY + BLOCK_HEIGHT),
  //   " -- ",
  //   (blockX < ballX), (ballX < blockX + BLOCK_WIDTH),
  //   (blockY < ballY), (ballY < blockY + BLOCK_HEIGHT)
  // );

  if (
    (blockX < ballX) && (ballX < blockX + BLOCK_WIDTH) &&
    (blockY < ballY) && (ballY < blockY + BLOCK_HEIGHT)
  ) {
    blockMap[number] = 0;
    score += 200;
  } else {
    isBlockRemains = true;
  }
}

function ballDisplay() {
  fill(50, 80, 100);
  ellipse(ballX, ballY, BALL_RADIUS, BALL_RADIUS);
}

function ballMove() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  ballSpeedY += ACCEL;

  // println(ballY, ballSpeedY);

  if (ballY - BALL_RADIUS / 2 < MARGIN) {
    ballSpeedY = Math.abs(ballSpeedY);
  }
  else if (HEIGHT - MARGIN < ballY + BALL_RADIUS / 2) {
    if (Math.abs(ballSpeedY) < 0.5 * LOSS) {
      ballSpeedY = 0;
      ballY = HEIGHT - MARGIN - BALL_RADIUS / 2 + 1;
    }
    else {
      ballSpeedY = -1 * (Math.abs(ballSpeedY) - LOSS * (Math.abs(ballSpeedY / BALL_SPEED_INIT) + 0.5));
    }
  }

  if (ballX - BALL_RADIUS / 2 < MARGIN) {
    ballSpeedX = Math.abs(ballSpeedX);
  }
  else if (WIDTH - MARGIN < ballX + BALL_RADIUS / 2) {
    ballSpeedX = -1 * Math.abs(ballSpeedX);
  }

  if (
    ((playerX < ballX) && (ballX < playerX + PLAYER_WIDTH)) &&
    ((playerY < ballY) && (ballY < playerY + PLAYER_HEIGHT))
  ) {
    if (!isBallInPlayer) {
      // ballSpeedY = -1 * Math.abs(ballSpeedY);
      ballSpeedY = BALL_SPEED_INIT;
      isBallInPlayer = true;
    }
  } else {
    isBallInPlayer = false;
  }

}
