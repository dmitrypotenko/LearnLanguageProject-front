import {Component, Input, OnInit} from '@angular/core';
import {LessonData, LessonService} from '../lesson.service';

@Component({
  selector: 'app-course-panel',
  templateUrl: './course-panel.component.html',
  styleUrls: ['./course-panel.component.scss']
})
export class CoursePanelComponent implements OnInit {

  private _lessonsOfTheCourse: LessonData[];
  currentLesson: LessonData;
  currentWidget: string;
  private lessonService: LessonService;

  constructor(lessonService: LessonService) {
    this.lessonService = lessonService;
  }

  ngOnInit() {
    this.lessonService.getCurrentLessonData().subscribe(lesson => this.currentLesson = lesson);
  }

  onSelect(widgetName: string) {
    this.currentWidget = widgetName;
  }

  @Input()
  set lessonsOfTheCourse(value: LessonData[]) {
    this._lessonsOfTheCourse = value;
  }


  get lessonsOfTheCourse(): LessonData[] {
    return this._lessonsOfTheCourse;
  }

  onLessonChanged(lesson: LessonData) {
    this.lessonService.pushLesson(lesson);
  }
}
