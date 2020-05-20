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

  @Input()
  testId: number;

  constructor(private userService: UserService, private testService: TestService) {
  }

  ngOnInit(): void {
    this.userService.getSubmittedTestUsers(this.testId).subscribe(result =>
      this.students = result)

  }

  switchToStudentTest(student: UserData) {
    this.testService.getCheckedTest(this.testId, student.id).subscribe(test =>
      this.studentTestData = test)
  }
}
