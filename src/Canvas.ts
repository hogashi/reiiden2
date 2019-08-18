interface Props {
  parent: HTMLElement;
  size: {
    width: number;
    height: number;
  };
}

export default class Canvas {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public size: Props['size'];

  constructor(props: Props) {
    const { parent, size } = props;

    const canvas = document.createElement('canvas');
    parent.appendChild(canvas);
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw 'cant get canvas context';
    }
    this.ctx = ctx;

    this.setSize(size);
  }

  public setSize(size: Props['size']) {
    this.size = size;

    this.canvas.width = size.width;
    this.canvas.height = size.height;
    // this.canvas.style.setProperty('width', `${size.x}px`);
    // this.canvas.style.setProperty('height', `${size.y}px`);
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.size.width, this.size.height);
  }
}
