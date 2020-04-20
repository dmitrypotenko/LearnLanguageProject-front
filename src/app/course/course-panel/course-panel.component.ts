import {Component, Input, OnInit} from '@angular/core';
import {LessonData} from '../../lesson.service';
import {TestData} from '../../test.service';
import {StepSwitcherService} from '../../step-switcher.service';
import {Listable} from '../../listable';

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

  currentWidget: string = 'Lessons';
  private _stepSwitcher: StepSwitcherService;

  constructor() {
  }

  ngOnInit() {
  }

  get currentLesson(): LessonData {
    return this._stepSwitcher.currentLesson;
  }

  get currentTest(): TestData {
    return this._stepSwitcher.currentTest;
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

  isTest(listable: Listable) {
    return (listable instanceof TestData);
  }

  isFailedTest(listable: Listable): boolean {
    if (listable instanceof TestData) {
      return (listable as TestData).isFailed()
    }
    return false
  }
}
