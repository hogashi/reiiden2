import BaseObject, { Props as BaseProps } from './BaseObject';

export interface Params {
  x: number;
  y: number;
  width: number;
  height: number;
  style: string | CanvasGradient | CanvasPattern;
}

export interface Props extends BaseProps, Params {}

export default class Rect extends BaseObject {
  protected params: Params;

  constructor(props: Props) {
    super(props);

    const { x, y, width, height, style } = props;
    this.params = { x, y, width, height, style };
  }

  public setParams(params: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    style?: string | CanvasGradient | CanvasPattern;
  }) {
    Object.assign(this.params, { ...params });
  }

  public getParams() {
    return { ...this.params };
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
