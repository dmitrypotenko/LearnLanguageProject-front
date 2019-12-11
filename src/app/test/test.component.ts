import {Component, OnInit} from '@angular/core';
import {TestData, TestService} from '../test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  get testData(): TestData {
    return this._testData;
  }

  private _testData: TestData;
  private testService: TestService;


  constructor(testService: TestService) {
    this.testService = testService;
  }

  ngOnInit(): void {
    this.getCurrentTest();
  }

  getCurrentTest(): void {
    this.testService.getCurrentTestData()
      .subscribe(testData => this._testData = testData);
  }

  checkTest(testData: TestData) {
    this.testService.checkTest(testData)
      .subscribe(checkedTest => this._testData = checkedTest);
  }
}
