import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {CourseAccessData, CourseAccessDataVO} from '../../../auth/course-access.data';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CourseAccessLevel} from '../../../auth/course-access-level';
import {NotificationService} from '../../../error/NotificationService';
import {FormControl} from '@angular/forms';
import {EMPTY, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-security-modal',
  templateUrl: './security-modal.component.html',
  styleUrls: ['./security-modal.component.scss']
})
export class SecurityModalComponent implements OnInit {

  private courseId: number;

  accesses: CourseAccessData[] = [];
  students: Observable<CourseAccessData[]> = EMPTY;
  all: Observable<CourseAccessData[]> = EMPTY;
  searchControl = new FormControl();

  toUpdate = new Set<CourseAccessDataVO>();


  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any,
              private notificationService: NotificationService) {
    this.courseId = data.courseId;
  }

  ngOnInit(): void {
    this.userService.getSecurityModelForCourse(this.courseId)
      .subscribe(accesses => {
        this.accesses = accesses;
        this.students = this.searchControl.valueChanges.pipe(
          startWith(''),
          map(studentName => this._filter(studentName, this.accesses?.filter(access => access.courseAccessLevel == CourseAccessLevel.STUDENT)))
        );
        this.all = this.searchControl.valueChanges.pipe(
          startWith(''),
          map(studentName => this._filter(studentName, this.accesses?.filter(access => access.courseAccessLevel == CourseAccessLevel.NONE)))
        );
      });

  }

  private _filter(studentName: string, accessesToFilter: CourseAccessData[]): CourseAccessData[] {
    const filterValue = studentName.toLowerCase();

    return accessesToFilter.filter(access => access.userDto.name.toLowerCase().indexOf(filterValue) >= 0);
  }

  removeFromStudents(access: CourseAccessData) {
    access.courseAccessLevel = CourseAccessLevel.NONE;
    this.toUpdate.add(new CourseAccessDataVO(access.userDto.id, CourseAccessLevel.NONE));
    this.searchControl.setValue(this.searchControl.value);
  }

  addToStudents(access: CourseAccessData) {
    access.courseAccessLevel = CourseAccessLevel.STUDENT;
    this.toUpdate.add(new CourseAccessDataVO(access.userDto.id, CourseAccessLevel.STUDENT));
    this.searchControl.setValue(this.searchControl.value);
  }

  updateAccesses() {
    this.userService.updateAccesses(Array.from(this.toUpdate), this.courseId)
      .subscribe(response => {
        if (response.status == 200) {
          this.notificationService.showSuccess('Access is successfully updated');
        } else {
          this.notificationService.showError('Can\'t update accesses. Something went wrong.');
        }
      });
  }
}
