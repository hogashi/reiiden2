export default class KeyManager {
  private isKeyPressedSet: { [key: string]: boolean | undefined };

  constructor() {
    this.isKeyPressedSet = {};

    document.addEventListener('keydown', e => {
      this.isKeyPressedSet[e.key] = true;
    });
    document.addEventListener('keyup', e => {
      this.isKeyPressedSet[e.key] = false;
    });
  }

  public isKeyPressed(key: string): boolean {
    const isPressed = this.isKeyPressedSet[key];
    if (isPressed === undefined) {
      return false;
    }
    return isPressed;
  }
}
