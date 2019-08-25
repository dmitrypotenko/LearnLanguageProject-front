import {Component, Input, OnInit} from '@angular/core';
import {LessonData, LessonService} from '../lesson.service';
import {TestData, TestService} from '../test.service';
import {StepSwitcherService} from '../step-switcher.service';
import {Listable} from '../listable';

@Component({
  selector: 'app-course-panel',
  templateUrl: './course-panel.component.html',
  styleUrls: ['./course-panel.component.scss']
})
export class CoursePanelComponent implements OnInit {
  get stepSwitcher(): StepSwitcherService {
    return this._stepSwitcher;
  }

  @Input()
  set stepSwitcher(value: StepSwitcherService) {
    this._stepSwitcher = value;
  }

  currentLesson: LessonData;
  currentTest: TestData;
  currentWidget: string;
  private lessonService: LessonService;
  private testService: TestService;
  private _stepSwitcher: StepSwitcherService;

  constructor(lessonService: LessonService, testService: TestService) {
    this.lessonService = lessonService;
    this.testService = testService;
  }

  ngOnInit() {
    this.lessonService.getCurrentLessonData().subscribe(lesson => this.currentLesson = lesson);
    this.testService.getCurrentTestData().subscribe(test => this.currentTest = test);
  }

  onSelect(widgetName: string) {
    this.currentWidget = widgetName;
  }

  onStepChanged(listable: Listable) {
    this.stepSwitcher.switchTo(listable);
  }

  get ordered(): Listable[] {
    return this.stepSwitcher.ordered;
  }
}
