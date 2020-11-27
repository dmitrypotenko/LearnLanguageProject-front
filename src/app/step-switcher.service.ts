import {Injectable} from '@angular/core';
import {LessonData, LessonService} from './service/lesson.service';
import {TestData, TestService} from './service/test.service';
import {Listable} from './listable';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepSwitcherService {
  private lessonService: LessonService;
  private testService: TestService;
  private _ordered: Listable[] = [];


  constructor(lessonService: LessonService, testService: TestService) {
    this.lessonService = lessonService;
    this.testService = testService;
  }

  switchTo(listable: Listable) : Observable<Listable>{
    if (listable instanceof TestData) {
      let test = listable as TestData;
      if (test.isLoaded) {
        return of(test)
      } else {
        return this.prepareTest(test);
      }

    } else if (listable instanceof LessonData) {
      let lesson = listable as LessonData;
      if (lesson.isLoaded) {
        return of(lesson)
      } else {
        return this.prepareLesson(lesson);
      }
    }
  }

  get ordered(): Listable[] {
    return this._ordered;
  }

  set lessonsOfTheCourse(value: LessonData[]) {
    this._ordered = this.ordered.concat(value);
    this.ordered.sort((l1, l2) => l1.getOrder() - l2.getOrder());
  }

  prepareTest(test: TestData): Observable<TestData> {
    return this.testService.getTest(test.id)
      .pipe(map(testResponse => {
        test.isLoaded = true;
        test.questions = testResponse.questions;
        return test;
      }));
  }

  prepareLesson(lesson: LessonData): Observable<LessonData> {
    return this.lessonService.getLesson(lesson.id)
      .pipe(map(lessonResponse => {
        lesson.isLoaded = true;
        lesson.lessonText = lessonResponse.lessonText;
        lesson.attachments = lessonResponse.attachments;
        return lesson;
      }));
  }

  set testsOfTheCourse(value: TestData[]) {
    this._ordered = this.ordered.concat(value);
    this.ordered.sort((l1, l2) => l1.getOrder() - l2.getOrder());
  }

}
