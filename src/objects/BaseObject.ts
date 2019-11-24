import Canvas from '../Canvas';

export interface Props {
  canvas: Canvas;
}

export default class BaseObject {
  public canvas: Canvas;
  public ctx: Canvas['ctx'];

  constructor(props: Props) {
    this.canvas = props.canvas;
    this.ctx = props.canvas.ctx;
  }

  render() {
    throw 'IMPLEMENT ME';
  }
}
