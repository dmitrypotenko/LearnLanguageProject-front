import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {LessonData, LessonService} from '../lesson.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  lessonData: LessonData;
  videoURL: SafeResourceUrl;

  private lessonService: LessonService;

  private location: Location;
  private sanitizer: DomSanitizer;


  constructor(
    lessonService: LessonService,
    location: Location,
    sanitizer: DomSanitizer
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
        if (this.lessonData!=null && lessonData.videoLink != null) {
          this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.lessonData.videoLink);
        }
      });
  }

  markAsCompleted(id: number) {
    this.lessonService.markAsCompleted(id);
    this.lessonData.isCompleted = true;
  }

  getRandom(): number {
    return Math.random()
  }

}
