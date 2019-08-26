import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {QuestionData, VariantData} from './question/question.component';
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


  getTestsFor(courseId: number): Observable<TestData[]> {
    return of([new TestData([new QuestionData('Are you gay?', [new VariantData('yes', false, false, false, 0),
        new VariantData('No', false, true, false, 1), new VariantData('Maybe...', true, false, false, 2)
      ], 0, false), new QuestionData('Do you like learning English?', [new VariantData('No', true, false, false, 3),
        new VariantData('No', false, true, false, 4), new VariantData('No...', false, false, false, 5)
      ], 1, true)
      ], 0, 1, 'True English learner test'),
        new TestData([new QuestionData('DO you want to pay money?', [new VariantData('Donate', false, false, false, 6),
          new VariantData('No', false, false, false, 7)
        ], 0, false), new QuestionData('Do you like this website?', [new VariantData('Yes', false, false, false, 8),
          new VariantData('Yes', false, false, false, 9)
        ], 1, true)
        ], 1, 3, 'Good user test')
      ]
    );
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


}
