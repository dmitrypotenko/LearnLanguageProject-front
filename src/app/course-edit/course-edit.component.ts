import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

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

  ngOnInit(): void {
  }


  constructor(private fb: FormBuilder) {
  }

  onSubmit() {

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
  isMultiple = true;
}

class VariantForm {
  variantText = '';
  isRight = false;
}
