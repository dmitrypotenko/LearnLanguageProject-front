import {Component, OnInit} from '@angular/core';
import {CourseData, CourseService} from '../course.service';
import {AuthService} from '../../auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {ConcessionDialogComponent} from './concession-dialog/concession-dialog.component';
import {FormBuilder, FormControl} from '@angular/forms';
import {UserData} from '../../auth/user.data';
import {Meta, Title} from "@angular/platform-browser";
import {appUrl} from "../../../environments/environment";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  private courseService: CourseService;
  private _courses: CourseData[];
  private authService: AuthService;
  isSuperAdmin: boolean = false;
  isAdmin: boolean;
  modeControl: FormControl;
  mode: string = 'all';
  private roles = [];
  spinnerVisible = true;

  schema: any;

  public dialog: MatDialog;
  public userData: UserData;


  get courses(): CourseData[] {
    this.mode = this.modeControl.value;
    if (this._courses != null) {
      return this._courses.filter(course => {
        if (this.mode == 'completed') {
          return course.completion.isCompleted;
        } else if (this.mode == 'started') {
          return course.completion.isStarted && !course.completion.isCompleted;
        }
        return true;
      });
    }
    return [];
  }

  constructor(courseService: CourseService, authService: AuthService,
              dialog: MatDialog,
              private formBuilder: FormBuilder,
              private meta: Meta, private titleService: Title) {
    this.dialog = dialog;
    this.courseService = courseService;
    this.authService = authService;

  }

  ngOnInit() {

    this.meta.updateTag({
      name: 'description',
      content: 'Here you can choose an online English course that consists of lessons and tests and exercises. '
    });
    this.titleService.setTitle("LessonsBox - The list of online English courses.");
    this.courseService.getAllCoursesMetadata().subscribe(courses => {
      this._courses = courses;
      this.schema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: courses.map((course, index) => {
          return {
            '@type': 'ListItem',
            position: index,
            url: appUrl + '/courses/' + course.id
          }
        })
      };

      this.spinnerVisible = false;
    });

    this.authService.user.subscribe(user => {
        this.userData = user;
        this.roles = user.roles;
        if (user.roles.find(role => role == 'ROLE_SUPER_ADMIN')) {
          this.isSuperAdmin = true;
        } else {
          this.isSuperAdmin = false;
        }
        if (user.roles.find(role => role == 'ROLE_ADMIN')) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
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


  get isLoggedId(): boolean {
    return this.roles.length == 0;
  }

  isBelongTo(ownerIds: number[]) {
    return ownerIds.find(owner => owner == this.userData?.id) != null;
  }
}
