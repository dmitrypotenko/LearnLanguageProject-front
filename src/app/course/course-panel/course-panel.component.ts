import {Component, Input, OnInit} from '@angular/core';
import {LessonData} from '../../service/lesson.service';
import {TestData} from '../../service/test.service';
import {StepSwitcherService} from '../../step-switcher.service';
import {Listable} from '../../listable';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-panel',
  templateUrl: './course-panel.component.html',
  styleUrls: ['./course-panel.component.scss']
})
export class CoursePanelComponent implements OnInit {
  private _lessonCounter: number = 1;
  private _testCounter: number = 1;

  private counters = new Map<number, number>();

  lessonCounter(order: number) {
    if (this.counters.get(order) == null) {
      this._testCounter = 1;
      this.counters.set(order, this._lessonCounter);
      return this._lessonCounter++;
    } else {
      return this.counters.get(order);
    }
  }

  testCounter(order: number) {
    if (this.counters.get(order) == null) {
      this.counters.set(order, this._testCounter);
      return this._testCounter++;
    } else {
      return this.counters.get(order);
    }
  }

  get stepSwitcher(): StepSwitcherService {
    return this._stepSwitcher;
  }

  @Input()
  set stepSwitcher(value: StepSwitcherService) {
    this._stepSwitcher = value;
  }

  currentWidget: string = 'Lessons';
  private _stepSwitcher: StepSwitcherService;

  constructor(private activatedRoute: ActivatedRoute/*, private location: Location*/) {

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

  getUrlForStep(step: Listable) {
    return '/courses/' + this.activatedRoute.snapshot.paramMap.get('id') + '/steps/' + step.getOrder();
  }
}
