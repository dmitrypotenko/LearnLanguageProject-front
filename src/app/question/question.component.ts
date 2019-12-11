import {Component, Input, OnInit} from '@angular/core';
import {QuestionType} from '../course-edit/course-edit.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  get questionData(): QuestionData {
    return this._questionData;
  }

  @Input()
  set questionData(value: QuestionData) {
    this._questionData = value;
  }

  private _questionData: QuestionData;
  private previousVariant: VariantData;


  ngOnInit() {
  }

  changeVariant(variant: VariantData) {  //TODO сраный костыль
    if (this.previousVariant != null) {
      this.previousVariant.isTicked = false;
    }
    this.previousVariant = variant;
    variant.isTicked = true;
  }

}

export class QuestionData {
  get type(): QuestionType {
    return this._type;
  }

  set type(type: QuestionType) {
    this._type = type;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  private _id: number;
  private _question: string;
  private _type: QuestionType;
  private _status: QuestionStatus;
  private _variants: VariantData[];


  constructor(question: string, variants: VariantData[], id: number, type: QuestionType, status: QuestionStatus = QuestionStatus.UNDEFINED) {
    this._question = question;
    this._variants = variants;
    this._id = id;
    this._type = type;
  }

  get question(): string {
    return this._question;
  }

  set question(value: string) {
    this._question = value;
  }

  get variants(): VariantData[] {
    return this._variants;
  }

  set variants(value: VariantData[]) {
    this._variants = value;
  }


  get status(): QuestionStatus {
    return this._status;
  }

  set status(value: QuestionStatus) {
    this._status = value;
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

export enum QuestionStatus {
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
  UNDEFINED = 'UNDEFINED'
}

export class VariantData {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  private _variant: string;
  private _isRight: boolean;
  private _isWrong: boolean;
  private _isTicked: boolean;
  private _id: number;


  constructor(variant: string, isRight: boolean, isWrong: boolean, isTicked: boolean, id: number) {
    this._variant = variant;
    this._isRight = isRight;
    this._isWrong = isWrong;
    this._isTicked = isTicked;
    this._id = id;
  }

  get variant(): string {
    return this._variant;
  }

  set variant(value: string) {
    this._variant = value;
  }

  get isRight(): boolean {
    return this._isRight;
  }

  set isRight(value: boolean) {
    this._isRight = value;
  }

  get isWrong(): boolean {
    return this._isWrong;
  }

  set isWrong(value: boolean) {
    this._isWrong = value;
  }

  get isTicked(): boolean {
    return this._isTicked;
  }

  set isTicked(value: boolean) {
    this._isTicked = value;
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
