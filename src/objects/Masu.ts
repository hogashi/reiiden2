import Rect from './Rect';

const RADIUS = 3 as const;
const STROKE_STYLE = 'rgb(64, 64, 64)' as const;

export default class Masu extends Rect {
  // 0radはx軸正方向
  private quarter(quadrant: 1 | 2 | 3 | 4, isStart = true) {
    const multiplyer = ((quadrant + 2) % 4) + (isStart ? 0 : 1);
    return (multiplyer * (2.0 * Math.PI)) / 4.0;
  }

  public render() {
    const { ctx } = this;
    const { x, y, width, height, style } = this.params;
    const quarter = this.quarter;

    ctx.fillStyle = style;
    ctx.strokeStyle = STROKE_STYLE;

    ctx.beginPath();

    // 上辺の直線部分左端から右回り(描画前なので上下反転前で考える)
    // (x, y)               (x+w, y)
    //   ,      ..........      ,
    //    (x+r, y+r) (x+w-r, y+r)
    //   .      ,        ,      .
    //   .                      .
    //   .                      .
    //   .                      .
    //   .      ,        ,      .
    //   (x+r, y+h-r)(x+w-r, y+h-r)
    //   ,      ..........      ,
    // (x, y+h)             (x+w, y+h)
    ctx.moveTo(x + RADIUS, y);
    ctx.lineTo(x + width - RADIUS, y);
    ctx.arc(
      x + width - RADIUS,
      y + RADIUS,
      RADIUS,
      quarter(1),
      quarter(1, false)
    );
    // 今: x + RADIUS, y + height
    ctx.lineTo(x + width, y + height - RADIUS);
    ctx.arc(
      x + width - RADIUS,
      y + height - RADIUS,
      RADIUS,
      quarter(2),
      quarter(2, false)
    );
    // 今: x + width - RADIUS, y + height
    ctx.lineTo(x + RADIUS, y + height);
    ctx.arc(
      x + RADIUS,
      y + height - RADIUS,
      RADIUS,
      quarter(3),
      quarter(3, false)
    );
    // 今: x, y + RADIUS;
    ctx.lineTo(x, y + RADIUS);
    ctx.arc(x + RADIUS, y + RADIUS, RADIUS, quarter(4), quarter(4, false));
    // 今: x, y

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
