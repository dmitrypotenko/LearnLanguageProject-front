import {Component, Input, OnInit} from '@angular/core';
import {CourseData} from '../../course.service';
import {AuthService} from '../../../auth/auth.service';
import {UserData} from '../../../auth/user.data';
import {CourseType} from '../../course-type';

@Component({
  selector: 'app-course-pure-list',
  templateUrl: './course-pure-list.component.html',
  styleUrls: ['./course-pure-list.component.scss']
})
export class CoursePureListComponent implements OnInit {
  private _courses: CourseData[];
  @Input()
  mode: string;
  private userInfo: UserData;
  @Input()
  selectable: boolean = false;
  spinnerVisible = true;

  @Input()
  set courses(value: CourseData[]) {
    this.spinnerVisible = false;
    this._courses = value;
  }


  constructor(private authService: AuthService) {
  }

  isBelongTo(ownerIds: number[], userData: UserData) {
    return ownerIds.find(owner => owner == userData?.id) != null;
  }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(userInfo => this.userInfo = userInfo);
  }

  deleteCourse(id: number) {
    let courseData = this._courses.find(data => data.id == id);
    this._courses.splice(this._courses.indexOf(courseData), 1);
  }

  get courses(): CourseData[] {
    if (this._courses != null) {
      return this._courses.filter(course => {
        if (this.mode == 'completed') {
          return course.completion.isCompleted;
        } else if (this.mode == 'started') {
          return course.completion.isStarted && !course.completion.isCompleted;
        } else if (this.mode == 'assignable') {
          return course.type == CourseType.PUBLIC || course.ownerIds.indexOf(this.userInfo?.id) > 0 || this.userInfo?.isSuperAdmin;
        }
        return true;
      });
    }
    return [];
  }
}
