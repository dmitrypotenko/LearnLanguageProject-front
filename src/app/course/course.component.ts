import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CourseData, CourseService} from './course.service';
import {LessonData, LessonService} from '../shared/services/lesson.service';
import {ActivatedRoute} from '@angular/router';
import {TestData, TestService} from '../shared/test.service';
import {StepSwitcherService} from '../shared/step-switcher.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {
  private courseService: CourseService;
  private lessonService: LessonService;
  private route: ActivatedRoute;
  currentCourse: CourseData;
  stepSwitcher: StepSwitcherService;

  private cd: ChangeDetectorRef;
  private _testService: TestService;

  constructor(courseService: CourseService, lessonService: LessonService, route: ActivatedRoute,
              cd: ChangeDetectorRef,
              testService: TestService) {
    this.cd = cd;
    this.courseService = courseService;
    this.lessonService = lessonService;
    this.route = route;
    this._testService = testService;
  }

  ngOnInit() {
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.stepSwitcher = new StepSwitcherService(this.lessonService, this._testService);

    this.courseService.getCourseById(id).subscribe(course => {
      this.currentCourse = course;
      this.stepSwitcher.lessonsOfTheCourse = course.lessons;
      this.stepSwitcher.testsOfTheCourse = course.tests;

      this.tryToUpdate();
    });
  }

  ngAfterViewInit() {
    if (this.tryToUpdate()) {
      this.cd.detectChanges();
    }
  }

  private tryToUpdate(): boolean {
    let ordered = this.stepSwitcher.ordered;
    if (ordered.length != 0) {
      this.stepSwitcher.switchTo(ordered[0]);
      return true;
    }
    return false;
  }

  get currentLesson(): LessonData {
    return this.stepSwitcher.currentLesson;
  }

  get currentTest(): TestData {
    return this.stepSwitcher.currentTest;
  }
}
