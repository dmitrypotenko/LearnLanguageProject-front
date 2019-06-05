import {Component, Input, OnInit} from '@angular/core';
import {CourseData} from '../course.service';

@Component({
  selector: 'app-course-panel',
  templateUrl: './course-panel.component.html',
  styleUrls: ['./course-panel.component.scss']
})
export class CoursePanelComponent implements OnInit {

  @Input() courseData: CourseData;
  currentWidget: string;

  constructor() {
  }

  ngOnInit() {
  }

  onSelect(widgetName: string) {
    this.currentWidget = widgetName;
  }
}
