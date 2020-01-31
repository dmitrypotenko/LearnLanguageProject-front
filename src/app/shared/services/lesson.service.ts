import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Listable} from '../listable';
import {catchError} from 'rxjs/operators';
import {Util} from '../utils/util';
import {appUrl} from '../../../environments/environment';

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

  pushLesson(lessonData: LessonData) {
    this.currentLessonPusher.next(lessonData);
  }

  markAsCompleted(id: number) {
    this.http.post(appUrl + '/lessons/completed/' + id, '',
      {headers: new HttpHeaders('Content-Type: application/json')})
      .pipe(catchError(Util.handleError(null)))
      .subscribe();
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
  private _attachments: Attachment[];
  private _name: string;
  private _id: number;
  private _order: number;
  private _isCompleted: boolean;


  get isCompleted(): boolean {
    return this._isCompleted;
  }

  set isCompleted(value: boolean) {
    this._isCompleted = value;
  }

  completed(): boolean {
    return this._isCompleted;
  }

  constructor(videoLink: string, lessonText: string, _attachment: Attachment[], name: string, id: number, order: number, isCompleted = false) {
    this._videoLink = videoLink;
    this._lessonText = lessonText;
    this._attachments = _attachment;
    this._name = name;
    this._id = id;
    this._order = order;
    this._isCompleted = isCompleted;
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


  get attachments(): Attachment[] {
    return this._attachments;
  }

  set attachments(value: Attachment[]) {
    this._attachments = value;
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

export class Attachment implements File {
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

  readonly lastModified: number;
  get name() {
    return this.attachmentTitle;
  }
  readonly size: number;
  readonly type: string;

  slice(start?: number, end?: number, contentType?: string): Blob {
    return undefined;
  }


}
