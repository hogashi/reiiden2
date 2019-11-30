import Rect, { Props as RectProps, Params as RectParams } from './Rect';
import KeyManager from '../KeyManager';

const VELOCITY = 3 as const;

export interface Params extends RectParams {
  margin: number;
}
export interface Props extends RectProps, Params {
  keyManager: KeyManager;
}

export default class Player extends Rect {
  protected params: Params;
  protected keyManager: KeyManager;

  constructor(props: Props) {
    super(props);
    this.keyManager = props.keyManager;
    this.params.margin = props.margin;
  }

  public setParams(params: Partial<Params>) {
    Object.assign(this.params, { ...params });
  }

  private moveByKeyPress() {
    const leftInfo = this.keyManager.getKeyPressedInfo('ArrowLeft');
    const rightInfo = this.keyManager.getKeyPressedInfo('ArrowRight');

    let { x } = this.params;
    let diff = 0;
    if (!leftInfo.isPressed && !rightInfo.isPressed) {
      return;
    } else if (leftInfo.isPressed) {
      if (rightInfo.isPressed) {
        // 両方押されていたら後に押されたほうを採用する
        if (leftInfo.time > rightInfo.time) {
          diff = -VELOCITY;
        } else {
          diff = VELOCITY;
        }
      } else {
        diff = -VELOCITY;
      }
    } else {
      // iff (rightInfo.isPressed)
      diff = VELOCITY;
    }
    x += diff;

    const leftLimit = this.params.margin;
    const rightLimit =
      this.canvas.size.width - this.params.width - this.params.margin;

    if (x < leftLimit) {
      x = leftLimit;
    } else if (x > rightLimit) {
      x = rightLimit;
    }

    this.setParams({ x });
  }

  public render() {
    this.moveByKeyPress();

    this.ctx.fillStyle = this.params.style;
    this.ctx.fillRect(
      this.params.x,
      this.canvas.size.height - this.params.y,
      this.params.width,
      this.params.height
    );
  }
}
