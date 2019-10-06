import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {TextSelectEvent} from '../text-select.directive';
import {MatSnackBar} from '@angular/material/snack-bar';
import {questionWordCss, questionWordTag} from '../constants';
import {CourseData, CourseService} from '../course.service';
import {Attachment, LessonData} from '../lesson.service';
import {TestData} from '../test.service';
import {QuestionData, VariantData} from '../question/question.component';

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

  courseForm = this.fb.group({
    name: [''],
    description: [''],
    category: [''],
    steps: this.fb.array([]),
  });

  questionTypes = QuestionType;
  public hostRectangle: SelectionRectangle | null;
  public lastEvent: TextSelectEvent;

  lessonEditorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [],
    uploadUrl: 'v1/image',
    sanitize: false,
    toolbarPosition: 'top',
  };

  questionEditorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: 'Question word',
        class: questionWordCss,
        tag: questionWordTag,
      }
    ],
    uploadUrl: 'v1/image',
    sanitize: false,
    toolbarPosition: 'top',
  };

  ngOnInit(): void {
  }


  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private courseService: CourseService) {
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
              null
            )),
            null,
            question.get('type').value as QuestionType
          ));

        tests.push(new TestData(
          questions,
          null,
          index,
          step.get('name').value as string
        ));
      } else {
        lessons.push(new LessonData(
          step.get('videoLink').value as string,
          step.get('lessonText').value as string,
          this.attachments(step).controls.map(attachment => new Attachment(
            attachment.get('attachmentLink').value as string,
            attachment.get('attachmentTitle').value as string,
            null)
          ),
          step.get('name').value as string,
          null,
          index
        ));
      }
    });

    this.courseService.saveCourse(new CourseData(
      null,
      this.courseForm.get('description').value as string,
      this.courseForm.get('name').value as string,
      this.courseForm.get('category').value as string,
      null,
      lessons,
      tests
    ));
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


  attachments(lesson: AbstractControl): FormArray {
    let lessonGroup = lesson as FormGroup;
    return lessonGroup.get('attachments') as FormArray;
  }

  createLesson(): FormGroup {
    let lessonForm = new LessonForm();
    lessonForm.attachments = this.fb.array([]);
    return this.fb.group(lessonForm);
  }

  createTest(): FormGroup {
    let testForm = new TestForm();
    testForm.questions = this.fb.array([]);
    return this.fb.group(testForm);
  }

  addAttachment(step: AbstractControl) {
    let lessonGroup = step as FormGroup;
    let attachments = lessonGroup.get('attachments') as FormArray;
    attachments.push(this.createAttachment());
  }

  private createAttachment() {
    return this.fb.group(new AttachmentForm());
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
    let elementToMove = collection.at(cdkDragDrop.previousIndex);
    collection.removeAt(cdkDragDrop.previousIndex);
    collection.insert(cdkDragDrop.currentIndex, elementToMove);
  }

  get questiontTypes() {
    var keys = Object.keys(QuestionType);
    return keys.slice(keys.length / 2);
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
}

class AttachmentForm {
  attachmentLink = '';
  attachmentTitle = '';
}

class LessonForm {
  videoLink = '';
  lessonText = '';
  name = '';
  attachments: FormArray;
}

class TestForm {
  name = '';
  questions: FormArray;
}

class QuestionForm {
  questionText = '';
  variants: FormArray;
  type = QuestionType.SINGLE_CHOICE;
}

class VariantForm {
  variantText = '';
  isRight = false;
}


export enum QuestionType {
  SINGLE_CHOICE,
  MULTIPLE_CHOICE,
  OMITTED_WORDS
}
