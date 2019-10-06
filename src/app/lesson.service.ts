import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {Listable} from './listable';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private http: HttpClient;

  private currentLessonPusher = new Subject<LessonData>();
  currentLessonEmitter = this.currentLessonPusher.asObservable();

  constructor(http: HttpClient) {
    this.http = http;
  }

  getCurrentLessonData(): Observable<LessonData> {
    return this.currentLessonEmitter;
  }


  getLessonsFor(courseId: number): Observable<LessonData[]> {
    return of([new LessonData('https://www.youtube.com/embed/xI1PWsRZIgY', 'Lorem ipsum dolor sit amet, sea harum praesent ea, id nulla scripta mediocrem eam. In his vero doctus corrumpit, ei erat doctus principes est. Justo efficiantur ne cum, eu audiam recteque patrioque has, vim option numquam in. Per alia insolens in, et ius dolor exerci. An nam possim singulis. Eu partem prompta sea, vel aliquid dissentiunt id.\n' +
      '\n' +
      '    Eum ne altera definiebas, eos simul mollis fabulas at. Quem saperet placerat an vim, ad vis errem eripuit voluptua, eu nec placerat postulant. Sint essent partiendo no mei, in eos dolore invenire aliquando, mel at inani iuvaret recusabo. Quot audiam sea ut, case utinam veritus vis ad. Illud assum urbanitas vix ne, vel in utroque appetere conceptam. Omnium perpetua cotidieque has ne, nam rebum mundi postea ea.\n' +
      '\n' +
      '    Vix albucius elaboraret suscipiantur in. Ea sit dicta graece, natum contentiones sea et. Est alii antiopam mandamus no. Te sea meis dolorem, sint justo legere ius ut, everti consequuntur ei nam. Sea diam populo et, sale copiosae voluptaria mel te. Facilisi constituam cu mel, sumo aliquam no vix, quo te erat laudem.\n' +
      '\n' +
      '    Eligendi deserunt efficiantur sed et, eum idque aeque evertitur eu. Summo splendide dissentiet sed ut, ut pro cetero utamur eruditi. Id vix tempor civibus, commodo percipitur mel ne. Cum in quod partiendo, ius summo sensibus partiendo id. Cu erroribus ullamcorper mel, vel legere elaboraret eu.\n' +
      '\n' +
      '    Discere tacimates mandamus at mea, at splendide reformidans necessitatibus vix. Paulo partem repudiare te per, mel no suas magna. Te magna virtute has, quo fabulas ceteros facilisis ex. Eu hinc ipsum feugait eam, et fabulas philosophia eam, at mea primis evertitur. Cu mel habemus accumsan definitionem, nulla tincidunt in per. Vim sententiae appellantur cu, ut vel possim dignissim, case iusto an vel.',
      [new Attachment('https://docs.google.com/document/d/1Qc3cIYTvjSXiRirr8vEzOJnRifrh94EqvEoSsnweKck/edit?usp=sharing', 'Some document', null)], 'Lesson 1', 1, 0),
      new LessonData('https://www.youtube.com/embed/VWefNT8Lb74', 'The local variable approach is simple and easy. But it is limited because the parent-child wiring must be done entirely within the parent template. The parent component itself has no access to the child.\n' +
        '\n' +
        'You can\'t use the local variable technique if an instance of the parent component class must read or write child component values or must call child component methods.\n' +
        '\n' +
        'When the parent component class requires that kind of access, inject the child component into the parent as a ViewChild.\n' +
        '\n' +
        'The following example illustrates this technique with the same Countdown Timer example. Neither its appearance nor its behavior will change. The child CountdownTimerComponent is the same as well.',
        [new Attachment('https://docs.google.com/document/d/1Qc3cIYTvjSXiRirr8vEzOJnRifrh94EqvEoSsnweKck/edit?usp=sharing', 'Some document2', null)], 'Lesson 2', 2, 2)]);
  }

  pushLesson(lessonData: LessonData) {
    this.currentLessonPusher.next(lessonData);
  }
}

export class LessonData implements Listable {
  get order(): number {
    return this._order;
  }

  set order(value: number) {
    this._order = value;
  }

  private _videoLink: string;
  private _lessonText: string;
  private _attachment: Attachment[];
  private _name: string;
  private _id: number;
  private _order: number;


  constructor(videoLink: string, lessonText: string, _attachment: Attachment[], name: string, id: number, order: number) {
    this._videoLink = videoLink;
    this._lessonText = lessonText;
    this._attachment = _attachment;
    this._name = name;
    this._id = id;
    this._order = order;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get videoLink(): string {
    return this._videoLink;
  }

  set videoLink(value: string) {
    this._videoLink = value;
  }

  get lessonText(): string {
    return this._lessonText;
  }

  set lessonText(value: string) {
    this._lessonText = value;
  }


  get attachment(): Attachment[] {
    return this._attachment;
  }

  set attachment(value: Attachment[]) {
    this._attachment = value;
  }

  getName(): string {
    return this.name;
  }

  getOrder(): number {
    return this.order;
  }


}

export class Attachment {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  private _attachmentLink: string;
  private _attachmentTitle: string;
  private _id: number;


  constructor(attachmentLink: string, attachmentTitle: string, id: number) {
    this._attachmentLink = attachmentLink;
    this._attachmentTitle = attachmentTitle;
    this._id = id;
  }


  get attachmentLink(): string {
    return this._attachmentLink;
  }

  set attachmentLink(value: string) {
    this._attachmentLink = value;
  }

  get attachmentTitle(): string {
    return this._attachmentTitle;
  }

  set attachmentTitle(value: string) {
    this._attachmentTitle = value;
  }
}
