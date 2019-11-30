export interface KeyPressedInfo {
  isPressed: boolean;
  time: number;
}

export default class KeyManager {
  private keyPressedInfo: {
    [keyName: string]: KeyPressedInfo | undefined;
  };

  constructor() {
    this.keyPressedInfo = {};

    document.addEventListener('keydown', e => {
      this.keyPressedInfo[e.key] = {
        isPressed: true,
        time: Date.now(),
      };
    });
    document.addEventListener('keyup', e => {
      this.keyPressedInfo[e.key] = {
        isPressed: false,
        time: 0,
      };
    });
  }

  public getKeyPressedInfo(key: string): KeyPressedInfo {
    let info = this.keyPressedInfo[key];
    if (info === undefined) {
      info = {
        isPressed: false,
        time: 0,
      };
    }
    return info;
  }
}
