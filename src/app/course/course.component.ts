import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {CourseData, CourseService} from './course.service';
import {LessonData, LessonService} from '../lesson.service';
import {ActivatedRoute} from '@angular/router';
import {TestData, TestService} from '../test.service';
import {StepSwitcherService} from '../step-switcher.service';
import {MediaMatcher} from '@angular/cdk/layout';

declare var jQuery: any;

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {
  private courseService: CourseService;
  private lessonService: LessonService;
  private route: ActivatedRoute;
  currentCourse: CourseData;
  stepSwitcher: StepSwitcherService;

  private cd: ChangeDetectorRef;
  private _testService: TestService;
  private sidenav: any;

  constructor(courseService: CourseService, lessonService: LessonService, route: ActivatedRoute,
              cd: ChangeDetectorRef,
              testService: TestService,
              private mediaMatcher: MediaMatcher) {
    this.cd = cd;
    this.courseService = courseService;
    this.lessonService = lessonService;
    this.route = route;
    this._testService = testService;
  }

  ngOnInit() {
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.stepSwitcher = new StepSwitcherService(this.lessonService, this._testService);

    this.courseService.getCourseById(id).subscribe(course => {
      this.currentCourse = course;
      this.stepSwitcher.lessonsOfTheCourse = course.lessons;
      this.stepSwitcher.testsOfTheCourse = course.tests;

      this.tryToUpdate();
    });
  }

  ngAfterViewInit() {
    this.sidenav = jQuery('#sidenavStep');
    if (this.tryToUpdate()) {
      this.cd.detectChanges();
    }
  }

  private tryToUpdate(): boolean {
    let ordered = this.stepSwitcher.ordered;
    if (ordered.length != 0) {
      this.stepSwitcher.switchTo(ordered[0]);
      return true;
    }
    return false;
  }

  get currentLesson(): LessonData {
    return this.stepSwitcher.currentLesson;
  }

  get currentTest(): TestData {
    return this.stepSwitcher.currentTest;
  }


  @HostListener('window:scroll', []) onWindowScroll() {
    this.scrollFunction();
  }

  // When the user scrolls down 20px from the top of the document, show the button
  scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      document.getElementById('upBtn').style.display = 'block';
    } else {
      document.getElementById('upBtn').style.display = 'none';
    }
  }

// When the user clicks on the button, scroll to the top of the document

  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  sidenavmode(): boolean {
    if (this.mediaMatcher.matchMedia('(max-width: 800px)').matches) {
      return false;
    }
    return true;
  }

  private menu: any;

  menuHeight(): number {
    let visibleHeight = jQuery('#mainMenu').outerHeight(true) - jQuery(window).scrollTop();
    if (visibleHeight > 0) {
      return visibleHeight;
    }
    return 0;
  }

  sideWidth(): number {
    if (this.sidenav == null) {
      return 0;
    }
    return this.sidenav.width() + this.sidenav.position().left;
  }

  changeToggleButton() {
    /*  let toggleBtn = jQuery('#toggleBtn');
      if (this.opened) {
        toggleBtn.css({left: this.sidenav.width().toString()});
      } else {
        toggleBtn.css({left: '0'});
      }*/
  }
}
