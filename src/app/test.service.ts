import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {QuestionData} from './question/question.component';
import {Listable} from './listable';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private http: HttpClient;

  private currentTestPusher = new Subject<TestData>();
  currentTestEmitter = this.currentTestPusher.asObservable();

  constructor(http: HttpClient) {
    this.http = http;
  }

  getCurrentTestData(): Observable<TestData> {
    return this.currentTestEmitter;
  }

  pushTest(lessonData: TestData) {
    this.currentTestPusher.next(lessonData);
  }
}

export class TestData implements Listable {
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _questions: QuestionData[];
  private _id: number;
  private _order: number;
  private _name: string;


  constructor(questions: QuestionData[], id: number, order: number, name: string) {
    this._questions = questions;
    this._id = id;
    this._order = order;
    this._name = name;
  }


  get questions(): QuestionData[] {
    return this._questions;
  }

  set questions(value: QuestionData[]) {
    this._questions = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get order(): number {
    return this._order;
  }

  set order(value: number) {
    this._order = value;
  }

  getName(): string {
    return this.name;
  }

  getOrder(): number {
    return this.order;
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
