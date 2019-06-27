import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {LessonData, LessonService} from '../lesson.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  private lessonData: LessonData;

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
      .subscribe(lessonData => this.lessonData = lessonData);
  }

}
