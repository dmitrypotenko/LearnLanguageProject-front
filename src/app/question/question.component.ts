import {Component, Input, OnInit} from '@angular/core';

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


  ngOnInit() {
  }

}

export class QuestionData {
  get isMultiple(): boolean {
    return this._isMultiple;
  }

  set isMultiple(value: boolean) {
    this._isMultiple = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  private _id: number;
  private _question: string;
  private _isMultiple: boolean;
  private _variants: VariantData[];


  constructor(question: string, variants: VariantData[], id: number, isMultiple: boolean) {
    this._question = question;
    this._variants = variants;
    this._id = id;
    this._isMultiple = isMultiple;

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
}
