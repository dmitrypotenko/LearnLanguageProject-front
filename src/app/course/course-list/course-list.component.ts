import {Component, OnInit} from '@angular/core';
import {CourseData, CourseService} from '../course.service';
import {AuthService} from '../../auth/auth.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {UserData} from '../../auth/user.data';
import {Meta, Title} from '@angular/platform-browser';
import {appUrl} from '../../../environments/environment';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  private courseService: CourseService;
  courses: CourseData[];
  private authService: AuthService;
  modeControl: FormControl;
  mode: string = 'all';
  private roles = [];
  spinnerVisible = true;


  schema: any;

  public userData: UserData;


  constructor(courseService: CourseService, authService: AuthService,
              private formBuilder: FormBuilder,
              private meta: Meta, private titleService: Title) {
    this.courseService = courseService;
    this.authService = authService;

  }

  ngOnInit() {

    this.meta.updateTag({
      name: 'description',
      content: 'Here you can choose an online English course that consists of lessons and tests and exercises. '
    });
    this.titleService.setTitle('LessonsBox - The list of online English courses.');
    this.courseService.getAllCoursesMetadata().subscribe(courses => {
      this.spinnerVisible = false;
      this.courses = courses;
      this.schema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: courses.map((course, index) => {
          return {
            '@type': 'ListItem',
            position: index,
            url: appUrl + '/courses/' + course.id
          };
        })
      };

      this.courses.forEach(course => {
        this.courseService.getCompletionStatus(course.id)
          .subscribe(completion => {
            course.completion = completion;
          });
      });
    });

    this.authService.user.subscribe(user => {
        if (user.id != null) {
          this.userData = user;
          this.roles = user.roles;
        }
      }
    );
    this.modeControl = new FormControl(this.mode);
  }

  get isLoggedId(): boolean {
    return this.roles.length == 0;
  }
}
