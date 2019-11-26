import Base, { Props as BaseProps } from './Base';

export interface Params {
  x: number;
  y: number;
  radius: number;
  style: string | CanvasGradient | CanvasPattern;
}

export interface Props extends BaseProps, Params {}

export default class Circle extends Base {
  protected params: Params;

  constructor(props: Props) {
    super(props);

    const { x, y, radius, style } = props;
    this.params = { x, y, radius, style };
  }

  public setParams(params: Partial<Params>) {
    Object.assign(this.params, { ...params });
  }

  public getParams() {
    return { ...this.params };
  }

  public move({ x, y }: { x: number; y: number }) {
    let newX = x;
    if (x < this.params.radius) {
      newX = this.params.radius;
    } else if (x > this.canvas.size.width - this.params.radius) {
      newX = this.canvas.size.width - this.params.radius;
    }

    let newY = y;
    if (y < this.params.radius) {
      newY = this.params.radius;
    } else if (y > this.canvas.size.height - this.params.radius) {
      newY = this.canvas.size.height - this.params.radius;
    }

    this.setParams({ x: newX, y: newY });
  }

  public moveRandom() {
    const x = this.params.x + (Math.random() * 10 - 5);
    const y = this.params.y + (Math.random() * 10 - 5);
    this.move({ x, y });
  }

  render() {
    this.moveRandom();

    this.ctx.beginPath();
    this.ctx.fillStyle = this.params.style;
    this.ctx.arc(
      this.params.x,
      this.params.y,
      this.params.radius,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
  }
}
