import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {UserData} from '../../auth/user.data';
import {TestData, TestService} from '../../service/test.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent implements OnInit, OnDestroy {

  private _students: UserData[] = [];

  studentTestData: TestData;

  currentStudent: UserData;

  _testId: number;
  subscription: Subscription;

  @Input()
  shouldFetchStudents = true;


  @Input()
  set students(value: UserData[]) {
    this._students = value;
    this.switchToStudent();
  }

  @Input()
  set testId(testId: number) {
    this._students = null;
    if (testId != null) {
      this._testId = testId;
      if (this.shouldFetchStudents) {
        this.subscription = this.userService.getSubmittedTestUsers(testId).subscribe(result => {
          this._students = result;
          this.switchToStudent();
        });
      }
    }
  }


  get students(): UserData[] {
    return this._students;
  }

  private switchToStudent() {
    let foundCurrentStudent = this._students.find(student => this.currentStudent?.id == student.id);
    if (foundCurrentStudent != null) {
      this.testService.getCheckedTest(this._testId, foundCurrentStudent.id).subscribe(test => {
        this.studentTestData = test;
      });
    } else {
      this.studentTestData = null;
      this.currentStudent = null;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  constructor(private userService: UserService, private testService: TestService) {
  }

  ngOnInit(): void {
  }

  switchToStudentTest(student: UserData) {
    this.currentStudent = student;
    this.testService.getCheckedTest(this._testId, student.id).subscribe(test => {
      this.studentTestData = test;
    });
  }

  isSelected(student: UserData) {
    return this.currentStudent?.id == student.id;
  }

  invalidate(student: UserData) {
    this.testService.invalidateTestForUser(this._testId, student.id)
      .subscribe(response => {
        if (response.status == 200) {
          const index: number = this._students.indexOf(student);
          if (index !== -1) {
            this._students.splice(index, 1);
          }
        }
      });
  }
}
