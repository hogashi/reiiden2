import Base, { Props as BaseProps } from './Base';

export interface Params {
  x: number;
  y: number;
  width: number;
  height: number;
  style: string | CanvasGradient | CanvasPattern;
}

export interface Props extends BaseProps, Params {}

export default class Rect extends Base {
  protected params: Params;

  constructor(props: Props) {
    super(props);

    const { x, y, width, height, style } = props;
    this.params = { x, y, width, height, style };
  }

  public setParams(params: Partial<Params>) {
    Object.assign(this.params, { ...params });
  }

  public getParams() {
    return { ...this.params };
  }

  public move({ x, y }: { x: number; y: number }) {
    let newX = x;
    if (x < 0) {
      newX = 0;
    } else if (x > this.canvas.size.width - this.params.width) {
      newX = this.canvas.size.width - this.params.width;
    }

    let newY = y;
    if (y < 0) {
      newY = 0;
    } else if (y > this.canvas.size.height - this.params.height) {
      newY = this.canvas.size.height - this.params.height;
    }

    this.setParams({ x: newX, y: newY });
  }

  render() {
    this.ctx.fillStyle = this.params.style;
    this.ctx.fillRect(
      this.params.x,
      this.params.y,
      this.params.width,
      this.params.height
    );
  }
}
