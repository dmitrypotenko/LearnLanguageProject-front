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
    this._testId = testId;
    if (testId != null) {
      this.userService.getSubmittedTestUsers(testId).subscribe(result =>
        this.students = result)
    }
    this.studentTestData = null;
  }

  constructor(private userService: UserService, private testService: TestService) {
  }

  ngOnInit(): void {
  }

  switchToStudentTest(student: UserData) {
    this.testService.getCheckedTest(this._testId, student.id).subscribe(test => {
      this.studentTestData = test;
      this.currentStudent = student;
    })
  }
}
