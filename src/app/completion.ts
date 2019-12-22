export class Completion {
  private _isCompeted: boolean;
  private _isStarted: boolean;
  private _successRate: number;
  private _completionPercent: number;

  constructor(isCompeted: boolean, isStarted: boolean, successRate: number, completionPercent: number) {
    this._isCompeted = isCompeted;
    this._isStarted = isStarted;
    this._successRate = successRate;
    this._completionPercent = completionPercent;
  }


  get isCompeted(): boolean {
    return this._isCompeted;
  }

  set isCompeted(value: boolean) {
    this._isCompeted = value;
  }

  get isStarted(): boolean {
    return this._isStarted;
  }

  set isStarted(value: boolean) {
    this._isStarted = value;
  }

  get successRate(): number {
    return this._successRate;
  }

  set successRate(value: number) {
    this._successRate = value;
  }

  get completionPercent(): number {
    return this._completionPercent;
  }

  set completionPercent(value: number) {
    this._completionPercent = value;
  }

  toJSON() {
    const jsonObj = {};
    const proto = Object.getPrototypeOf(this);
    for (const key of Object.getOwnPropertyNames(proto)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      const hasGetter = desc && typeof desc.get === 'function';
      if (hasGetter) {
        jsonObj[key] = this[key];
      }
    }
    return jsonObj;
  }
}
