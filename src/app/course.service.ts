import {Injectable} from '@angular/core';
import {LessonData} from './lesson.service';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http: HttpClient;


  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllCoursesMetadata(): Observable<CourseData[]> {
    return of([new CourseData(1,
      'Example description',
      'Example course',
      2,
      [],
      ""
    ),
      new CourseData(2,
        'Example description 2',
        'Example course 2',
        154,
        [],
        ""
      )]);
  }

  getCourseById(id: number): Observable<CourseData> {
    return of(new CourseData(1,
      'Example description',
      'Example course',
      2,
      [],
      ""
    ));
  }

}


export class CourseData {
  private _id: number;
  private _description: string;
  private _name: string;
  private _lessonsCount: number;
  private _category: string;
  private _lessons: LessonData[];


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get lessonsCount(): number {
    return this._lessonsCount;
  }

  set lessonsCount(value: number) {
    this._lessonsCount = value;
  }


  constructor(id: number, description: string, name: string, lessonsCount: number, lessons: LessonData[], category: string) {
    this._id = id;
    this._description = description;
    this._name = name;
    this._lessonsCount = lessonsCount;
    this._lessons = lessons;
    this._category = category;
  }

  get description(): string {
    return this._description;
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

  set lessons(value: LessonData[]) {
    this._lessons = value;
  }
}
