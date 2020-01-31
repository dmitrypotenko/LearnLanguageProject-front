import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {LessonData, LessonService} from '../shared/services/lesson.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import * as Embedo from 'embedo/embedo.js';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit, AfterViewChecked {

  lessonData: LessonData;
  lessonText: SafeHtml;

  private lessonService: LessonService;

  private location: Location;
  private sanitizer: DomSanitizer;
  private embedo: Embedo;


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
    this.embedo = new Embedo({
      twitter: true,  // Enable twitter SDK
      instagram: true,  // Enable instagram SDK
      pinterest: true  // Enable pinterest SDK,
    });
  }

  ngAfterViewChecked() {
    let oembeds = document.getElementsByTagName('oembed');
    for (let i = 0; i < oembeds.length; i++) {
      if (oembeds[i].firstChild == null) {
        oembeds[i].className = 'embed-responsive embed-responsive-16by9 video container';
        this.embedo.load(
          oembeds[i],
          oembeds[i].getAttribute('url'),
          {
            height: null,
            width: null,
            centerize: true
          }
        )
          .done((data) => {
          })
          .fail((err) => {
            console.error(err);
          });
      }

    }
  }

  getCurrentLesson(): void {
    this.lessonService.getCurrentLessonData()
      .subscribe(lessonData => {
        this.lessonData = lessonData;
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

}
