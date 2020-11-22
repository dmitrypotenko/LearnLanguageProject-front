import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {LessonData, LessonService} from '../service/lesson.service';
import {DomSanitizer, Meta, SafeHtml, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  private _lessonData: LessonData;
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
  }


  get lessonData(): LessonData {
    return this._lessonData;
  }

  @Input()
  set lessonData(lessonData: LessonData) {
    this._lessonData = lessonData;
    if (lessonData!=null) {
      this.titleService.setTitle('LessonsBox: ' + lessonData.getName());
      this.meta.removeTag('name="description"');
    }
    if (this._lessonData != null) {
      this.lessonText = this.sanitizer.bypassSecurityTrustHtml(this._lessonData.lessonText);

    }
  }

  markAsCompleted(id: number) {
    this.lessonService.markAsCompleted(id);
    this._lessonData.isCompleted = true;
  }

  getAttachmentsCount(): number {
    return this._lessonData.attachments.length;
  }

}
