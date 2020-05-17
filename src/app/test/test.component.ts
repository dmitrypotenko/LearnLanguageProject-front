import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TestData, TestService} from '../service/test.service';
import {QuestionStatus, VariantData} from '../question/question.component';
import {Meta, Title} from "@angular/platform-browser";

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


  constructor(testService: TestService,
              private cd: ChangeDetectorRef,
              private meta: Meta, private titleService: Title) {
    this.testService = testService;
  }

  ngOnInit(): void {
    this.getCurrentTest();
  }

  getCurrentTest(): void {
    this.testService.getCurrentTestData()
      .subscribe(testData => {
        if (testData != null) {
          this.titleService.setTitle('LessonsBox: ' + testData.getName());
          this.meta.removeTag('name="description"');
        }
        this._testData = testData;
      });
  }

  checkTest(testData: TestData) {
    this.testService.checkTest(testData)
      .subscribe(checkedTest => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        testData.isCompleted = checkedTest.isCompleted;
        testData.questions.forEach((question, index) => {
          let checkedQuestion = checkedTest.questions[index];
          question.variants = checkedQuestion.variants;
          question.status = checkedQuestion.status;
        })
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
            let newVariants: VariantData[] = [];
            question.variants.forEach(variant => {
              if (variant.inputType == 'input') {
                if (variant.isTicked) {
                  variant.variant = '';
                  variant.isRight = false;
                  variant.isWrong = false;
                  variant.explanation = '';
                  newVariants.push(variant);
                }
              } else {
                newVariants.push(variant);
                variant.isRight = false;
                variant.isWrong = false;
                variant.isTicked = false;
                variant.explanation = '';
              }
            });
            question.variants = newVariants;
          });
          this.cd.detectChanges();
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
