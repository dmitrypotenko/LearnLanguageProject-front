import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {UserData} from "../../auth/user.data";
import {TestData, TestService} from "../../service/test.service";

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent implements OnInit {

  students: UserData[] = [];

  studentTestData: TestData;

  currentStudent: UserData;

  _testId: number;

  @Input()
  set testId(testId: number) {
    if (testId != null) {
      this.userService.getSubmittedTestUsers(testId).subscribe(result => {
        this.students = result;
        this._testId = testId;
        let foundCurrentStudent = this.students.find(student => this.currentStudent?.id == student.id);
        if (foundCurrentStudent != null) {
          this.testService.getCheckedTest(this._testId, foundCurrentStudent.id).subscribe(test => {
            this.studentTestData = test;
          })
        } else {
          this.studentTestData = null;
          this.currentStudent = null;
        }
      })
    }
  }

  constructor(private userService: UserService, private testService: TestService) {
  }

  ngOnInit(): void {
  }

  switchToStudentTest(student: UserData) {
    this.currentStudent = student;
    this.testService.getCheckedTest(this._testId, student.id).subscribe(test => {
      this.studentTestData = test;
    })
  }

  isSelected(student: UserData) {
    return this.currentStudent?.id == student.id
  }

  invalidate(student: UserData) {
    this.testService.invalidateTestForUser(this._testId, student.id)
      .subscribe(response=> {
        if (response.status == 200) {
          const index: number = this.students.indexOf(student);
          if (index !== -1) {
            this.students.splice(index, 1);
          }
        }
      });
  }
}
