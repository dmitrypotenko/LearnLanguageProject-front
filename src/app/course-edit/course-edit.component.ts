import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';

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
    lessons: this.fb.array([])
  });

  ngOnInit(): void {
  }


  constructor(private fb: FormBuilder) {
  }

  onSubmit() {

  }

  addLesson() {
    let lessons = this.courseForm.get('lessons') as FormArray;
    lessons.push(this.createLesson());
  }

  get lessons() {
    return this.courseForm.get('lessons') as FormArray;
  }

   attachments(lesson: AbstractControl) : FormArray{
     let lessonGroup = lesson as FormGroup;
     return lessonGroup.get('attachments') as FormArray;
  }

  createLesson(): FormGroup {
    return this.fb.group({
      videoLink: '',
      lessonText: '',
      name: '',
      attachments: this.fb.array([]),
    });
  }

  addAttachment(lesson: AbstractControl) {
    let lessonGroup = lesson as FormGroup;
    let attachments = lessonGroup.get('attachments') as FormArray;
    attachments.push(this.createAttachment());
  }

  private createAttachment() {
    return this.fb.group({
      attachmentLink: '',
      attachmentTitle: '',
    });
  }
}
