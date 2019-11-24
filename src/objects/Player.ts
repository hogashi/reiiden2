import Rect, { Props as RectProps, Params as RectParams } from './Rect';

const moveDiff = 3;

export interface Params extends RectParams {
  margin: number;
}
export interface Props extends RectProps, Params {}

export default class Player extends Rect {
  protected params: Params;
  private diff: number;

  constructor(props: Props) {
    super(props);
    this.params.margin = props.margin;

    this.diff = 0;
    document.addEventListener('keydown', e => {
      // console.log(e);

      switch (e.key) {
        case 'ArrowRight':
          this.diff = moveDiff;
          break;
        case 'ArrowLeft':
          this.diff = -moveDiff;
          break;
      }
    });
    document.addEventListener('keyup', e => {
      // console.log(e);

      switch (e.key) {
        case 'ArrowRight':
          if (this.diff === moveDiff) {
            this.diff = 0;
          }
          break;
        case 'ArrowLeft':
          if (this.diff === -moveDiff) {
            this.diff = 0;
          }
          break;
      }
    });
  }

  private move(diff: number) {
    let x = this.params.x + diff;
    const leftLimit = this.params.margin;
    const rightLimit =
      this.canvas.size.width - this.params.width - this.params.margin;

    if (x < leftLimit) {
      x = leftLimit;
    } else if (x > rightLimit) {
      x = rightLimit;
    }

    this.params.x = x;
  }

  render() {
    this.move(this.diff);

    this.ctx.fillStyle = this.params.style;
    this.ctx.fillRect(
      this.params.x,
      this.params.y,
      this.params.width,
      this.params.height
    );
  }
}
