import {Injectable} from '@angular/core';
import {LessonData} from '../service/lesson.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TestData} from '../service/test.service';
import {catchError, map} from 'rxjs/operators';
import {Util} from '../utils/util';
import {Completion} from '../completion';
import {appUrl} from '../../environments/environment';
import {CourseType} from "./course-type";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http: HttpClient;


  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllCoursesMetadata(): Observable<CourseData[]> {
    return this.http.get(appUrl + '/courses', {headers: new HttpHeaders('Content-Type: application/json')})
      .pipe(catchError(Util.handleError(null)));
  }

  getCourseById(id: number): Observable<CourseData> {
    return this.http.get(appUrl + '/courses/' + id, {headers: new HttpHeaders('Content-Type: application/json')})
      .pipe(catchError(Util.handleError(null)))
      .pipe<CourseData>(map<CourseData, CourseData>(course => this.mapCourse(course)));
  }

  getCourseByIdForEdit(id: number): Observable<CourseData> {
    return this.http.get(appUrl + '/courses/edit/' + id, {headers: new HttpHeaders('Content-Type: application/json')})
      .pipe(catchError(Util.handleError(null)))
      .pipe<CourseData>(map<CourseData, CourseData>(course => this.mapCourse(course)));
  }

  private mapCourse(course: CourseData) {
    return new CourseData(
      course.id,
      course.description,
      course.name,
      course.category,
      course.lessons.map<LessonData>(lesson => new LessonData(lesson.videoLink, lesson.lessonText, lesson.attachments, lesson.name, lesson.id, lesson.order, lesson.isCompleted)),
      course.tests.map<TestData>(test => new TestData(test.questions, test.id, test.order, test.name, test.isCompleted, test.successThreshold, test.isRetryable, test.instruction)),
      course.type,
      course.completion
    );
  }

  saveCourse(courseData: CourseData): Observable<CourseData> {
    return this.http.post(appUrl + '/courses', JSON.stringify(courseData), {headers: new HttpHeaders('Content-Type: application/json')})
      .pipe(catchError(Util.handleError(null)));
  }

  deleteCourse(courseId: number): Observable<Response> {
    return this.http.delete(appUrl + '/courses/' + courseId, {
      headers: new HttpHeaders('Content-Type: application/json'),
      observe: 'response'
    })
      .pipe(catchError(Util.handleError(null)));
  }

}


export class CourseData {
  private _id: number;
  private _description: string;
  private _name: string;
  private _category: string;
  private _lessons: LessonData[];
  private _tests: TestData[];
  private _completion: Completion;
  private _type: CourseType;
  private _ownerIds: number[];


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }


  get description(): string {
    return this._description;
  }


  constructor(id: number,
              description: string,
              name: string,
              category: string,
              lessons: LessonData[],
              tests: TestData[],
              courseType: CourseType,
              completion: Completion = new Completion(false, false, 0, 0),
              ownerIds: number[] = []) {
    this._id = id;
    this._description = description;
    this._name = name;
    this._lessons = lessons;
    this._category = category;
    this._tests = tests;
    this._completion = completion;
    this._type = courseType;
  }

  set description(value: string) {
    this._description = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get lessons(): LessonData[] {
    return this._lessons;
  }


  get type(): CourseType {
    return this._type;
  }

  set type(value: CourseType) {
    this._type = value;
  }

  set lessons(value: LessonData[]) {
    this._lessons = value;
  }


  get category(): string {
    return this._category;
  }

  get tests(): TestData[] {
    return this._tests;
  }


  get ownerIds(): number[] {
    return this._ownerIds;
  }

  set ownerIds(value: number[]) {
    this._ownerIds = value;
  }

  get completion(): Completion {
    return this._completion;
  }

  set completion(value: Completion) {
    this._completion = value;
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
