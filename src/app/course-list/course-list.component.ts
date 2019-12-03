import {Component, OnInit} from '@angular/core';
import {CourseData, CourseService} from '../course.service';
import {AuthService} from '../auth.service';
import {MatDialog} from '@angular/material';
import {ConcessionDialogComponent} from './concession-dialog/concession-dialog.component';

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

  public dialog: MatDialog;

  constructor(courseService: CourseService, authService: AuthService,
              dialog: MatDialog) {
    this.dialog = dialog;
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

  delete(id: number) {
    this.dialog.open(ConcessionDialogComponent, {height: '20vh', width: '30vw'})
      .afterClosed().subscribe(result => {
      if (result) {
        this.courseService.deleteCourse(id)
          .subscribe(response => {
            if (response.status == 200) {
              let courseData = this.courses.find(data => data.id == id);
              this.courses.splice(this.courses.indexOf(courseData), 1);
            }
          });
      }
    });
  }
}
