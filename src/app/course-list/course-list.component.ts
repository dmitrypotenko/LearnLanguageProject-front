import {Component, OnInit} from '@angular/core';
import {CourseData, CourseService} from '../course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  private courseService: CourseService;
  courses: CourseData[];

  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  ngOnInit() {
    this.courseService.getAllCoursesMetadata().subscribe(courses => this.courses = courses);
  }

}
