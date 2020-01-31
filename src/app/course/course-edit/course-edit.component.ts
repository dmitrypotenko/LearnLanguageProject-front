import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TextSelectEvent} from '../../shared/text-select.directive';
import {MatSnackBar} from '@angular/material/snack-bar';
import {questionWordCss, questionWordTag} from '../../shared/constants';
import {CourseData, CourseService} from '../course.service';
import {Attachment, LessonData} from '../../shared/services/lesson.service';
import {TestData} from '../../shared/test.service';
import {QuestionData, VariantData} from '../../question/question.component';
import {ActivatedRoute} from '@angular/router';
import ClassicEditor from '@dpotenko/ckeditor5-build-classic-with-resize';
import {CustomAdapter} from './CustomAdapter';
import {HttpClient} from '@angular/common/http';
import {NgxDropzoneChangeEvent} from 'ngx-dropzone';
import {FileSender} from './FileSender';
import {appUrl} from '../../../environments/environment';

interface SelectionRectangle {
  left: number;
  top: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
  public Editor = ClassicEditor;

  public ckConfig: {};


  courseForm = this.fb.group({
    id: 0,
    name: [''],
    description: [''],
    category: [''],
    steps: this.fb.array([]),
  });

  public hostRectangle: SelectionRectangle | null;
  public lastEvent: TextSelectEvent;
  public fileSender: FileSender;
  private ckConfigQuestion = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'strikethrough',
      'underline',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'indent',
      'outdent',
      '|',
      'blockQuote',
      'undo',
      'redo',
      'fontFamily',
      'alignment',
      'highlight'
    ]
  };

  ngOnInit(): void {
    let routeId = this.route.snapshot.paramMap.get('id');
    if (routeId != null) {
      let id: number = Number(routeId);
      this.courseService.getCourseByIdForEdit(id)
        .subscribe(course => {
          this.courseForm.get('id').setValue(course.id);
          this.courseForm.get('name').setValue(course.name);
          this.courseForm.get('description').setValue(course.description);
          this.courseForm.get('category').setValue(course.category);
          course.lessons.forEach(lesson => {
            let lessonControl = this.createLesson();
            this.steps.controls[lesson.order] = lessonControl;
            lessonControl.get('id').setValue(lesson.id);
            lessonControl.get('videoLink').setValue(lesson.videoLink);
            lessonControl.get('lessonText').setValue(lesson.lessonText);
            lessonControl.get('name').setValue(lesson.name);
            lessonControl.get('attachments').setValue(lesson.attachments);
          });
          course.tests.forEach(test => {
            let testControl = this.createTest();
            this.steps.controls[test.order] = testControl;
            testControl.get('id').setValue(test.id);
            testControl.get('name').setValue(test.name);
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
    this.fileSender = new FileSender(httpClient);

    function MyCustomUploadAdapterPlugin(editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        // Configure the URL to the upload script in your back-end here!
        return new CustomAdapter(httpClient, loader);
      };
    }

    this.ckConfig = {
      toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'strikethrough',
        'underline',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
        'fontFamily',
        'alignment',
        'highlight'
      ],
      image: {
        // You need to configure the image toolbar, too, so it uses the new style buttons.
        toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],

        styles: [
          // This option is equal to a situation where no style is applied.
          'full',

          // This represents an image aligned to the left.
          'alignLeft',

          // This represents an image aligned to the right.
          'alignRight'
        ]
      },
      indentBlock: {
        offset: 1,
        unit: 'em'
      },
      extraPlugins: [MyCustomUploadAdapterPlugin]
    };

  }


  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private courseService: CourseService,
              private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  onSubmit() {
    let allSteps = this.steps;
    let lessons: LessonData[] = [];
    let tests: TestData[] = [];

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
              variant.get('explanation').value as string
            )),
            question.get('id').value as number,
            question.get('type').value
          ));

        tests.push(new TestData(
          questions,
          step.get('id').value as number,
          index,
          step.get('name').value as string
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
      tests
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
    });
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
    testForm.questions = this.fb.array([]);
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
    moveItemInArray(collection.controls, cdkDragDrop.previousIndex, cdkDragDrop.currentIndex);
  }

  get questionTypes() {
    return Object.values(QuestionType);
  }

  handleSelection(event: TextSelectEvent) {
    console.group('Text Select Event');
    console.log('Text:', event.text);
    console.log('Viewport Rectangle:', event.viewportRectangle);
    console.log('Host Rectangle:', event.hostRectangle);
    console.groupEnd();

    // If a new selection has been created, the viewport and host rectangles will
    // exist. Or, if a selection is being removed, the rectangles will be null.
    if (event.viewportRectangle) {
      this.hostRectangle = event.viewportRectangle;
      this.lastEvent = event;
    } else {
      this.hostRectangle = null;
      this.lastEvent = null;
    }
  }

  wrapElement() {
    let range = this.lastEvent.range;
    let questionWordEnd = this.findParent(range.endContainer, questionWordCss, 'angular-editor-textarea');
    let questionWordStart = this.findParent(range.startContainer, questionWordCss, 'angular-editor-textarea');
    if (questionWordEnd != null || questionWordStart != null) {
      this._snackBar.open('end and start of a question word should be outside of other question words', 'close', {duration: 5000});
      return;
    }

    var wrappingNode = document.createElement(questionWordTag);
    wrappingNode.style.cursor = 'not-allowed';
    wrappingNode.style.backgroundColor = '#c9bacc';
    let child = this.lastEvent.range.extractContents();
    this.unwrapAllInnerQuestionWords(child.childNodes);
    wrappingNode.addEventListener('click', function() {
      while (wrappingNode.firstChild) {
        wrappingNode.parentNode.insertBefore(wrappingNode.firstChild, wrappingNode);
      }
      wrappingNode.remove();
    });
    wrappingNode.appendChild(child);
    wrappingNode.className = questionWordCss;
    range.insertNode(wrappingNode);
    this.hostRectangle = null;
    this.lastEvent = null;
  }

  private unwrapAllInnerQuestionWords(childNodes: NodeListOf<ChildNode>) {
    if (childNodes == null || childNodes.length == 0) {
      return;
    }
    childNodes.forEach(node => {
      if ((node as HTMLElement).className == questionWordCss && node.nodeName == questionWordTag) {
        var parent = node.parentNode;
        while (node.firstChild) {
          parent.insertBefore(node.firstChild, node);
        }
        parent.removeChild(node);
      } else {
        this.unwrapAllInnerQuestionWords(node.childNodes);
      }
    });
  }

  private findParent(node: Node, classToFind: string, classToStop: string): Node {
    if ((node as HTMLElement).className == classToFind && node.nodeName == questionWordTag) {
      return node;
    } else if ((node as HTMLElement).className == classToStop) {
      return null;
    }
    return this.findParent(node.parentNode, classToFind, classToStop);
  }

  isOmittedWords(question: AbstractControl) {
    return question.value.type == 'OMITTED_WORDS';
  }

  onSelect($event: NgxDropzoneChangeEvent, step: AbstractControl) {
    console.log($event);
    let lessonGroup = step as FormGroup;
    let attachments = lessonGroup.get('attachments').value as Attachment[];
    $event.addedFiles.map(file => {
      this.fileSender.sendFile(file).subscribe(response => {
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
}

class LessonForm {
  videoLink = '';
  lessonText = '';
  name = '';
  attachments: Attachment[] = [];
  id = null;
}

class TestForm {
  name = '';
  questions: FormArray;
  id = null;
}

class QuestionForm {
  questionText = '';
  variants: FormArray;
  type = QuestionType.SINGLE_CHOICE.valueOf();
  id = null;
}

class VariantForm {
  variantText = '';
  explanation = '';
  isRight = false;
  id = null;
}


export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  OMITTED_WORDS = 'OMITTED_WORDS'
}
