import {AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {QuestionType} from '../course/course-edit/QuestionType';
import {NgElement, WithProperties} from '@angular/elements';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, AfterViewChecked, AfterContentInit, AfterViewInit {

  @Input() questionIndex: number;

  constructor(private sanitizer: DomSanitizer) {
  }

  safeQuestionHtml: SafeHtml;

  get questionData(): QuestionData {
    return this._questionData;
  }

  @Input()
  set questionData(value: QuestionData) {
    this.safeQuestionHtml = this.sanitizer.bypassSecurityTrustHtml(this.questionIndex + 1 + '. ' + value.question);
    this._questionData = value;

  }

  private _questionData: QuestionData;


  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked Start');
    let allSelects = document.querySelector('#question' + this.questionData.id).querySelectorAll(' select-element') as NodeListOf<NgElement & WithProperties<{
      name: string,
      question: QuestionData
    }>>;
    allSelects.forEach(select => {
      console.log('ngAfterViewChecked');
      if (select.question == null) {
        select.question = this._questionData;
      }
    });
  }

  ngAfterContentInit(): void {

  }

  changeVariant(variant: VariantData) {
    this._questionData.variants.forEach(variant => {
      if (variant.isTicked) {
        variant.isTicked = false;
      }
    });
    variant.isTicked = true;
  }

  changeMultipleChoice(variant: VariantData) {
    variant.isTicked = !variant.isTicked;
  }

  notEmpty(explanation: string) {
    return explanation && explanation.trim();
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
  private _explanation: string;
  private _isRight: boolean;
  private _isWrong: boolean;
  private _isTicked: boolean;
  private _id: number;
  private _inputName: string;


  constructor(variant: string, isRight: boolean, isWrong: boolean, isTicked: boolean, id: number, explanation: string, inputName: string) {
    this._variant = variant;
    this._isRight = isRight;
    this._isWrong = isWrong;
    this._isTicked = isTicked;
    this._id = id;
    this._explanation = explanation;
    this._inputName = inputName;
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


  get inputName(): string {
    return this._inputName;
  }

  set inputName(value: string) {
    this._inputName = value;
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


  get explanation(): string {
    return this._explanation;
  }

  set explanation(value: string) {
    this._explanation = value;
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
