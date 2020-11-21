export class SearchData {
  constructor(private _orderNumber: number, private _courseId: number,
              private _lessonText: string, private _matchedExtract: string,
              private _courseName: string) {
  }


  get orderNumber(): number {
    return this._orderNumber;
  }

  set orderNumber(value: number) {
    this._orderNumber = value;
  }


  get lessonText(): string {
    return this._lessonText;
  }

  set lessonText(value: string) {
    this._lessonText = value;
  }

  get courseName(): string {
    return this._courseName;
  }

  set courseName(value: string) {
    this._courseName = value;
  }

  get courseId(): number {
    return this._courseId;
  }

  set courseId(value: number) {
    this._courseId = value;
  }

  get lessonName(): string {
    return this._lessonText;
  }

  set lessonName(value: string) {
    this._lessonText = value;
  }

  get matchedExtract(): string {
    return this._matchedExtract;
  }

  set matchedExtract(value: string) {
    this._matchedExtract = value;
  }
}
