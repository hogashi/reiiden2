import BaseObject, { Props as BaseProps } from './BaseObject';

interface Params {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Props extends BaseProps, Params {}

export default class Rect extends BaseObject {
  private params: Params;

  constructor(props: Props) {
    super(props);

    const { x, y, width, height } = props;
    this.params = { x, y, width, height };
  }

  public setParams(params: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }) {
    Object.assign(this.params, { ...params });
  }

  public getParams() {
    return { ...this.params };
  }

  render() {
    this.ctx.fillRect(
      this.params.x,
      this.params.y,
      this.params.width,
      this.params.height
    );
  }
}
