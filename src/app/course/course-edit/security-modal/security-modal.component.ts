import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {CourseAccessData, CourseAccessDataVO} from "../../../auth/course-access.data";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CourseAccessLevel} from "../../../auth/course-access-level";
import {NotificationService} from "../../../error/NotificationService";

@Component({
  selector: 'app-security-modal',
  templateUrl: './security-modal.component.html',
  styleUrls: ['./security-modal.component.scss']
})
export class SecurityModalComponent implements OnInit {

  private courseId: number;

  accesses: CourseAccessData[] = [];
  students: CourseAccessData[] = [];
  all: CourseAccessData[] = [];

  toUpdate = new Set<CourseAccessDataVO>();


  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any,
              private notificationService: NotificationService) {
    this.courseId = data.courseId;
  }

  ngOnInit(): void {
    this.userService.getSecurityModelForCourse(this.courseId)
      .subscribe(accesses => {
        this.accesses = accesses;
        this.students = this.accesses?.filter(access => access.courseAccessLevel == CourseAccessLevel.STUDENT);
        this.all = this.accesses?.filter(access => access.courseAccessLevel == CourseAccessLevel.NONE);
      })
  }

  removeFromStudents(access: CourseAccessData) {
    let indexOf = this.students.indexOf(access);
    if (indexOf !== -1) {
      this.students.splice(indexOf, 1);
    }
    this.all.push(access);
    access.courseAccessLevel = CourseAccessLevel.NONE;
    this.toUpdate.add(new CourseAccessDataVO(access.userDto.id, CourseAccessLevel.NONE))
  }

  addToStudents(access: CourseAccessData) {
    let indexOf = this.all.indexOf(access);
    if (indexOf !== -1) {
      this.all.splice(indexOf, 1);
    }
    this.students.push(access);
    access.courseAccessLevel = CourseAccessLevel.NONE;
    this.toUpdate.add(new CourseAccessDataVO(access.userDto.id, CourseAccessLevel.STUDENT))

  }

  updateAccesses() {
    this.userService.updateAccesses(Array.from(this.toUpdate), this.courseId)
      .subscribe(response => {
        if (response.status == 200) {
          this.notificationService.showSuccess("Access is successfully updated");
        } else {
          this.notificationService.showError("Can't update accesses. Something went wrong.")
        }
      })
  }
}
