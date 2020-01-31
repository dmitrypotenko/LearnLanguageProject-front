import {Injectable} from '@angular/core';
import {LessonData, LessonService} from './services/lesson.service';
import {TestData, TestService} from './test.service';
import {Listable} from './listable';

@Injectable({
  providedIn: 'root'
})
export class StepSwitcherService {
  private _lessonsOfTheCourse: LessonData[];
  private _testsOfTheCourse: TestData[];
  private lessonService: LessonService;
  private testService: TestService;
  private _ordered: Listable[] = [];
  currentLesson: LessonData;
  currentTest: TestData;


  constructor(lessonService: LessonService, testService: TestService) {
    this.lessonService = lessonService;
    this.testService = testService;

    this.lessonService.getCurrentLessonData().subscribe(lesson => this.currentLesson = lesson);
    this.testService.getCurrentTestData().subscribe(test => this.currentTest = test);
  }

  switchTo(listable: Listable) {
    if (listable instanceof TestData) {
      this.testService.pushTest(listable as TestData);
      this.lessonService.pushLesson(null);
    } else if (listable instanceof LessonData) {
      this.lessonService.pushLesson(listable as LessonData);
      this.testService.pushTest(null);
    }
  }


  get ordered(): Listable[] {
    return this._ordered;
  }


  get lessonsOfTheCourse(): LessonData[] {
    return this._lessonsOfTheCourse;
  }

  set lessonsOfTheCourse(value: LessonData[]) {
    this._lessonsOfTheCourse = value;
    this._ordered = this.ordered.concat(value);
    this.ordered.sort((l1, l2) => l1.getOrder() - l2.getOrder());
  }

  get testsOfTheCourse(): TestData[] {
    return this._testsOfTheCourse;

  }

  set testsOfTheCourse(value: TestData[]) {
    this._testsOfTheCourse = value;
    this._ordered = this.ordered.concat(value);
    this.ordered.sort((l1, l2) => l1.getOrder() - l2.getOrder());
  }

}
