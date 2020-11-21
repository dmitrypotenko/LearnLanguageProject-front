import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CourseData, CourseService} from '../course.service';
import {Attachment, LessonData} from '../../service/lesson.service';
import {TestData} from '../../service/test.service';
import {QuestionData, VariantData} from '../../question/question.component';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NgxDropzoneChangeEvent} from 'ngx-dropzone';
import {FileSender} from './FileSender';
import {MatDialog} from '@angular/material/dialog';
import {QuestionType} from './QuestionType';
import {NotificationService} from '../../error/NotificationService';
import {CustomValidator} from './field-error/Validators';
import {CourseType} from '../course-type';
import {SecurityModalComponent} from './security-modal/security-modal.component';
import {appUiUrl} from '../../../environments/environment';
import {ConcessionDialogComponent} from '../course-list/concession-dialog/concession-dialog.component';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  public ckConfig: {};

  shareableLink = '';

  courseForm = this.fb.group({
    id: null,
    name: [''],
    type: [CourseType.DRAFT.toString()],
    description: [''],
    category: [''],
    key: [''],
    steps: this.fb.array([]),
  });

  public static fileSender: FileSender;
  isSaving: boolean;

  ngOnInit(): void {
    let routeId = this.route.snapshot.paramMap.get('id');
    if (routeId != null) {
      let id: number = Number(routeId);
      this.courseService.getCourseByIdForEdit(id)
        .subscribe(course => {
          var stepsCount = course.tests.length + course.lessons.length;
          for (let i = 0; i < stepsCount; i++) {
            this.steps.push(new FormControl());
          }
          console.log('Course is retrieved from server');
          this.courseForm.get('id').setValue(course.id);
          this.courseForm.get('name').setValue(course.name);
          this.courseForm.get('description').setValue(course.description);
          this.courseForm.get('category').setValue(course.category);
          this.courseForm.get('type').setValue(course.type);
          this.courseForm.get('key').setValue(course.key);
          this.shareableLink = this.getShareableLink();
          course.lessons.forEach(lesson => {
            let lessonControl = this.createLesson();
            this.steps.setControl(lesson.order, lessonControl);
            lessonControl.get('id').setValue(lesson.id);
            lessonControl.get('videoLink').setValue(lesson.videoLink);
            lessonControl.get('lessonText').setValue(lesson.lessonText);
            lessonControl.get('name').setValue(lesson.name);
            lessonControl.get('attachments').setValue(lesson.attachments);
          });
          course.tests.forEach(test => {
            let testControl = this.createTest();
            this.steps.setControl(test.order, testControl);
            testControl.get('id').setValue(test.id);
            testControl.get('name').setValue(test.name);
            testControl.get('successThreshold').setValue(test.successThreshold);
            testControl.get('isRetryable').setValue(test.isRetryable);
            testControl.get('instruction').setValue(test.instruction);
            test.questions.forEach(question => {
              let questionControl = this.createQuestion();
              questionControl.get('questionText').setValue(question.question);
              questionControl.get('id').setValue(question.id);
              questionControl.get('type').setValue(question.type);
              question.variants.forEach(variant => {
                let variantControl = this.createVariant();
                variantControl.get('id').setValue(variant.id);
                variantControl.get('variantText').setValue(variant.variant);
                variantControl.get('explanation').setValue(variant.explanation);
                variantControl.get('isRight').setValue(variant.isRight);
                this.variants(questionControl).push(variantControl);
              });
              this.questions(testControl).push(questionControl);
            });
          });

        });
    }


    const httpClient = this.httpClient;
    CourseEditComponent.fileSender = new FileSender(httpClient);

    this.ckConfig = {
      allowedContent: true,
      disableNativeSpellChecker: false,
      on: {
        fileUploadRequest: function(evt) {
          CourseEditComponent.fileSender.sendFile(evt.data.requestData.upload.file).subscribe(response => {
              evt.data.fileLoader.status = 'uploaded';
              evt.data.fileLoader.responseData = response;
              evt.data.fileLoader.url = response.fileUrl;
              evt.data.fileLoader.fire('update');
            }
          );
          evt.stop();
        }
      },
      extraPlugins: 'uploadimage,autogrow',
      uploadUrl: 'http://localhost:8080/files/upload',
      autoGrow_maxHeight: 800
    };

  }


  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private courseService: CourseService,
              private route: ActivatedRoute, private httpClient: HttpClient, private dialog: MatDialog,
              private notificationService: NotificationService, private cd: ChangeDetectorRef,
              private router: Router) {
  }

  onSubmit($event) {
    console.log("Saving lesson");

    let allSteps = this.steps;
    if (!this.validate(allSteps)) {
      return false;
    }

    let lessons: LessonData[] = [];
    let tests: TestData[] = [];

    this.isSaving = true;
    allSteps.controls.forEach((step, index) => {
      if (this.isTest(step)) {
        let questions = this.questions(step).controls.map(question =>
          new QuestionData(
            question.get('questionText').value as string,
            this.variants(question).controls.map(variant => new VariantData(
              variant.get('variantText').value as string,
              variant.get('isRight').value as boolean,
              false,
              false,
              variant.get('id').value as number,
              variant.get('explanation').value as string,
              null,
              null
            )),
            question.get('id').value as number,
            question.get('type').value
          ));

        tests.push(new TestData(
          questions,
          step.get('id').value as number,
          index,
          step.get('name').value as string,
          false,
          step.get('successThreshold').value as number,
          step.get('isRetryable').value as boolean,
          step.get('instruction').value as string
        ));
      } else {
        lessons.push(new LessonData(
          step.get('videoLink').value as string,
          step.get('lessonText').value as string,
          this.attachments(step),
          step.get('name').value as string,
          step.get('id').value as number,
          index
        ));
      }
    });

    let mainForm = this.courseForm;

    this.courseService.saveCourse(new CourseData(
      mainForm.get('id').value as number,
      mainForm.get('description').value as string,
      mainForm.get('name').value as string,
      mainForm.get('category').value as string,
      lessons,
      tests,
      mainForm.get('type').value,
      mainForm.get('key').value
    )).subscribe(next => {
      if (next == null) {
        return;
      }
      mainForm.get('id').setValue(next.id);
      next.lessons.forEach(lesson => {
        let lessonControl = this.steps.controls[lesson.order];
        lessonControl.get('id').setValue(lesson.id);
        let attachmentsControl = this.attachments(lessonControl);
        lesson.attachments.forEach((attachment, index) => attachmentsControl[index].id = attachment.id);
      });
      next.tests.forEach(test => {
        let testControl = this.steps.controls[test.order];
        testControl.get('id').setValue(test.id);
        let questionsControls = this.questions(testControl).controls;
        test.questions.forEach((question, index) => {
          let questionControl = questionsControls[index];
          questionControl.get('id').setValue(question.id);
          let variantControls = this.variants(questionControl).controls;
          question.variants.forEach((variant, index) => {
            let variantControl = variantControls[index];
            variantControl.get('id').setValue(variant.id);
          });
        });

      });
      this.isSaving = false;
      if ($event.submitter.id === 'saveAndViewBtn') {
        this.router.navigateByUrl('/courses/' + this.courseForm.get('id').value + '/steps/0').then();
      } else {
        this.notificationService.showSuccess('The course is saved successfully!');
      }
    });
    return true;
  }

  private validate(allSteps: FormArray) {
    this.courseForm.markAllAsTouched();
    if (this.courseForm.status == 'INVALID') {
      allSteps.controls.forEach(step => {
        if (step.status == 'INVALID') {
          this.setExpandedTrue(step);
        }
      });
      this.notificationService.showError('Form is invalid');
      this.cd.detectChanges();
      return false;
    }
    return true;
  }


  addLesson() {
    let lessons = this.courseForm.get('steps') as FormArray;
    lessons.push(this.createLesson());
  }

  addTest() {
    let lessons = this.courseForm.get('steps') as FormArray;
    lessons.push(this.createTest());
  }

  isLesson(step: any) {
    return step.value.attachments != null;
  }

  isTest(step: any) {
    return step.value.questions != null;
  }

  get steps() {
    return this.courseForm.get('steps') as FormArray;
  }


  attachments(lesson: AbstractControl): Attachment[] {
    let lessonGroup = lesson as FormGroup;
    return lessonGroup.get('attachments').value as Attachment[];
  }

  createLesson(): FormGroup {
    let lessonForm = new LessonForm();
    let formGroup = this.fb.group(lessonForm);
    formGroup.get('attachments').setValue([]);
    return formGroup;
  }

  createTest(): FormGroup {
    let testForm = new TestForm();
    testForm.questions = this.fb.array([], CustomValidator.questionsRequired);
    return this.fb.group(testForm);
  }

  private createQuestion() {
    let questionForm = new QuestionForm();
    questionForm.variants = this.fb.array([]);
    return this.fb.group(questionForm);
  }

  private createVariant() {
    return this.fb.group(new VariantForm());
  }

  addQuestion(step: AbstractControl) {
    let testGroup = step as FormGroup;
    let questions = testGroup.get('questions') as FormArray;
    questions.push(this.createQuestion());
  }

  questions(step: AbstractControl) {
    let testGroup = step as FormGroup;
    return testGroup.get('questions') as FormArray;
  }

  addVariant(step: AbstractControl) {
    let questionGroup = step as FormGroup;
    let variants = questionGroup.get('variants') as FormArray;
    variants.push(this.createVariant());
  }

  variants(step: AbstractControl) {
    let questionGroup = step as FormGroup;
    return questionGroup.get('variants') as FormArray;
  }

  delete(control: AbstractControl, toDelete: AbstractControl, collectionName: string) {
    let collection = control.get(collectionName) as FormArray;
    let indexOf = collection.getRawValue().findIndex((value => JSON.stringify(value) === JSON.stringify(toDelete.value)));
    collection.removeAt(indexOf);
  }

  drop(control: AbstractControl, cdkDragDrop: CdkDragDrop<any[]>, collectionName: string) {
    let collection = control.get(collectionName) as FormArray;
    collection.controls.forEach(step => step.get('expanded').setValue('false'));
    moveItemInArray(collection.controls, cdkDragDrop.previousIndex, cdkDragDrop.currentIndex);
    this.cd.detectChanges();
  }

  get questionTypes() {
    return Object.values(QuestionType);
  }

  get courseTypes() {
    return Object.values(CourseType);
  }

  isVariantsVisible(question: AbstractControl) {
    return question.value.type == 'CUSTOM_INPUT';
  }

  onSelect($event: NgxDropzoneChangeEvent, step: AbstractControl) {
    console.log($event);
    let lessonGroup = step as FormGroup;
    let attachments = lessonGroup.get('attachments').value as Attachment[];
    $event.addedFiles.map(file => {
      CourseEditComponent.fileSender.sendFile(file).subscribe(response => {
          attachments.push(new Attachment(response.fileUrl, file.name, null));
        }
      );
    });

  }

  onRemove(f: any, step: AbstractControl) {
    console.log(event);
    let lessonGroup = step as FormGroup;
    let attachments = lessonGroup.get('attachments').value as Attachment[];
    attachments.splice(attachments.indexOf(f), 1);
  }

  getQuestionName(question: AbstractControl, j: number) {
    let document = new DOMParser().parseFromString(question.get('questionText').value, 'text/html');
    let textContent = document.body.textContent;
    return 1 + j + ' - ' + textContent?.substring(0, 10);
  }

  setExpandedTrue(control: AbstractControl) {
    control.get('expanded').setValue(true);
  }

  isExpanded(step: AbstractControl) {
    return (step.get('expanded').value as boolean) == true;
  }

  setExpandedFalse(step: AbstractControl) {
    step.get('expanded').setValue('false');
  }

  openAccessDialog() {
    this.dialog.open(SecurityModalComponent, {
      height: '70vh',
      width: '60vw',
      hasBackdrop: true,
      data: {id: this.courseForm.get('id').value,
        securityEntityName: 'courses'}
    });
  }

  generateLink() {
    let _this = this;

    function generate() {
      _this.courseService.generateKey(_this.courseForm.get('id').value).subscribe(key => {
        _this.courseForm.get('key').setValue(key);
        _this.shareableLink = _this.getShareableLink();
      });
    }

    let key = this.courseForm.get('key').value;
    if (key != null && (key as string).length > 0) {
      this.dialog.open(ConcessionDialogComponent, {height: '20vh', width: '30vw', hasBackdrop: true})
        .afterClosed().subscribe(result => {
        if (result) {
          generate();
        }
      });
    } else {
      generate();
    }
  }

  getShareableLink() {
    let key = this.courseForm.get('key').value;
    if (key != null && (key as string).length > 0) {
      return appUiUrl + '/courses/' + this.courseService.constructCourseUrl(this.courseForm.get("name").value, this.courseForm.get("id").value) + '?key=' + key;
    }
    return '';
  }
}

class LessonForm {
  videoLink = '';
  lessonText = '';
  name = '';
  attachments: Attachment[] = [];
  id = null;
  expanded = false;
}

class TestForm {
  name = '';
  questions: FormArray;
  successThreshold = 1;
  isRetryable = true;
  instruction = '';
  id = null;
  expanded = false;
}

class QuestionForm {
  questionText = '';
  variants: FormArray;
  type = QuestionType.SINGLE_CHOICE.valueOf();
  id = null;
  expanded = false;
}

class VariantForm {
  variantText = '';
  explanation = '';
  isRight = false;
  id = null;
}



