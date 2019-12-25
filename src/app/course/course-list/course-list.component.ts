import {Component, OnInit} from '@angular/core';
import {CourseData, CourseService} from '../course.service';
import {AuthService} from '../../auth.service';
import {MatDialog} from '@angular/material';
import {ConcessionDialogComponent} from './concession-dialog/concession-dialog.component';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  private courseService: CourseService;
  private _courses: CourseData[];
  private authService: AuthService;
  isAdmin: boolean;
  modeControl: FormControl;
  mode: string = 'all';

  public dialog: MatDialog;


  get courses(): CourseData[] {
    this.mode = this.modeControl.value;
    if (this._courses != null) {
      return this._courses.filter(course => {
        if (this.mode == 'completed') {
          return course.completion.isCompleted;
        } else if (this.mode == 'started') {
          return course.completion.isStarted;
        }
        return true;
      });
    }
    return [];
  }

  constructor(courseService: CourseService, authService: AuthService,
              dialog: MatDialog,
              private formBuilder: FormBuilder) {
    this.dialog = dialog;
    this.courseService = courseService;
    this.authService = authService;

  }

  ngOnInit() {
    this.courseService.getAllCoursesMetadata().subscribe(courses => this._courses = courses);
    this.authService.isAdmin().subscribe(isAdmin => {
        console.log(isAdmin);
        this.isAdmin =
          isAdmin.valueOf();
      }
    );
    this.modeControl = new FormControl(this.mode);
  }

  delete(id: number) {
    this.dialog.open(ConcessionDialogComponent, {height: '20vh', width: '30vw', hasBackdrop: true})
      .afterClosed().subscribe(result => {
      if (result) {
        this.courseService.deleteCourse(id)
          .subscribe(response => {
            if (response.status == 200) {
              let courseData = this._courses.find(data => data.id == id);
              this._courses.splice(this._courses.indexOf(courseData), 1);
            }
          });
      }
    });
  }
}
