import Canvas from '../Canvas';

export interface Props {
  canvas: Canvas;
}

export default class Base {
  public ctx: Canvas['ctx'];

  constructor(props: Props) {
    this.ctx = props.canvas.ctx;
  }

  render() {
    throw 'IMPLEMENT ME';
  }
}
