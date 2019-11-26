import Circle, { Props as CircleProps, Params as CircleParams } from './Circle';

interface Velocity {
  x: number;
  y: number;
}

const INIT_VELOCITY = {
  x: 3,
  y: 3,
} as const;

// -9.8 / 60
const ACCELERATION_Y = -0.163 as const;

export interface Params extends CircleParams {
  margin: number;
}
export interface Props extends CircleProps, Params {}

export default class Onmyo extends Circle {
  protected params: Params;
  private velocity: Velocity;

  constructor(props: Props) {
    super(props);
    this.params.margin = props.margin;

    this.velocity = INIT_VELOCITY;
  }

  public setParams(params: Partial<Params>) {
    Object.assign(this.params, { ...params });
  }

  public getParams() {
    return { ...this.params };
  }

  private updateVelocity() {
    const { x, y } = this.velocity;

    const newY = y + ACCELERATION_Y;

    this.velocity = { x, y: newY };
  }

  private moveByVelocity() {
    let x = this.params.x + this.velocity.x;
    let y = this.params.y + this.velocity.y;

    const leftLimit = this.params.radius + this.params.margin;
    const rightLimit =
      this.canvas.size.width - this.params.radius - this.params.margin;
    const upLimit = this.params.radius + this.params.margin;
    const downLimit =
      this.canvas.size.height - this.params.radius - this.params.margin;

    if (x < leftLimit) {
      x = leftLimit;
      this.velocity.x *= -1;
    } else if (x > rightLimit) {
      x = rightLimit;
      this.velocity.x *= -1;
    }

    if (y < upLimit) {
      y = upLimit;
      this.velocity.y *= -1;
    } else if (y > downLimit) {
      y = downLimit;
      this.velocity.y *= -1;
    }

    this.setParams({ x, y });
    this.updateVelocity();
  }

  render() {
    this.moveByVelocity();

    this.ctx.beginPath();
    this.ctx.fillStyle = this.params.style;
    this.ctx.arc(
      this.params.x,
      this.canvas.size.height - this.params.y,
      this.params.radius,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
  }
}
