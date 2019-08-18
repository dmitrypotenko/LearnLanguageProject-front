import {Component, OnInit} from '@angular/core';
import {CourseData, CourseService} from '../course.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  private courseService: CourseService;
  courses: CourseData[];
  private authService: AuthService;
  isAdmin: boolean;

  constructor(courseService: CourseService, authService: AuthService) {
    this.courseService = courseService;
    this.authService = authService;
  }

  ngOnInit() {
    this.courseService.getAllCoursesMetadata().subscribe(courses => this.courses = courses);
    this.authService.isAdmin().subscribe(isAdmin => {
        console.log(isAdmin);
        this.isAdmin =
          isAdmin.valueOf();
      }
    );
  }

}
