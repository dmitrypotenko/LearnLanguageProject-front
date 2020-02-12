import {Component, OnInit} from '@angular/core';
import {TestData, TestService} from '../test.service';
import {QuestionStatus} from '../question/question.component';

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
            .subscribe(checkedTest => {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                testData.isCompleted = checkedTest.isCompleted;
                testData.questions = checkedTest.questions;
            });
    }

    isFailed(): boolean {
        if (this.testData != null) {
            return this.testData.isFailed();
        }
        return false;
    }

    invalidateTest(testData: TestData) {
        this.testService.invalidateTest(testData)
            .subscribe(response => {
                if (response.status == 200) {
                    testData.isCompleted = false;
                    testData.questions.forEach(question => {
                        question.status = QuestionStatus.UNDEFINED;
                        question.variants.forEach(variant => {
                            variant.isRight = false;
                            variant.isWrong = false;
                            variant.isTicked = false;
                            variant.explanation = '';
                        });
                    });
                }
            });
    }

    getCorrectCount(): number {
        return this.testData.questions.map(question => {
            if (question.status == QuestionStatus.SUCCESS) {
                return 1 as number;
            }
            return 0 as number;
        }).reduce((prev, curr) => prev + curr);
    }
}
