import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {LessonData, LessonService} from '../service/lesson.service';
import {DomSanitizer, Meta, SafeHtml, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  lessonData: LessonData;
  lessonText: SafeHtml;

  private lessonService: LessonService;

  private location: Location;
  private sanitizer: DomSanitizer;


  constructor(
    lessonService: LessonService,
    location: Location,
    sanitizer: DomSanitizer,
    private meta: Meta, private titleService: Title
  ) {
    this.location = location;
    this.lessonService = lessonService;
    this.sanitizer = sanitizer;
  }

  ngOnInit(): void {
    this.getCurrentLesson();
  }

  getCurrentLesson(): void {
    this.lessonService.getCurrentLessonData()
      .subscribe(lessonData => {
        this.lessonData = lessonData;
        if (lessonData!=null) {
          this.titleService.setTitle('LessonsBox: ' + lessonData.getName());
          this.meta.removeTag('name="description"');
        }
        if (this.lessonData != null && lessonData.videoLink != null) {
          this.lessonText = this.sanitizer.bypassSecurityTrustHtml(this.lessonData.lessonText);

        }
      });
  }

  markAsCompleted(id: number) {
    this.lessonService.markAsCompleted(id);
    this.lessonData.isCompleted = true;
  }

  getRandom(): number {
    return Math.random();
  }

  getAttachmentsCount(): number {
    return this.lessonData.attachments.length;
  }

}
