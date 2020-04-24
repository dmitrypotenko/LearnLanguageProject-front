import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CourseData, CourseService} from './course.service';
import {LessonData, LessonService} from '../lesson.service';
import {ActivatedRoute} from '@angular/router';
import {TestData, TestService} from '../test.service';
import {StepSwitcherService} from '../step-switcher.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {Meta, Title} from "@angular/platform-browser";
import {appUrl} from "../../environments/environment";

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
  spinnerVisible: boolean = true;
  toggleBtn: any;
  menu: any;
  schema: any;

  constructor(courseService: CourseService, lessonService: LessonService, route: ActivatedRoute,
              cd: ChangeDetectorRef,
              testService: TestService,
              private mediaMatcher: MediaMatcher,
              private meta: Meta, private titleService: Title) {
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
      this.spinnerVisible = false;

      this.titleService.setTitle('LessonsBox: ' + course.name);
      this.meta.updateTag({
        name: 'description',
        content: course.description
      });
      this.schema = {
        '@type': 'Course',
        url: appUrl + '/courses/' + course.id,
        description: course.description,
        name: course.name
      };
      this.currentCourse = course;
      this.stepSwitcher.lessonsOfTheCourse = course.lessons;
      this.stepSwitcher.testsOfTheCourse = course.tests;

      this.tryToUpdate();
    });
  }

  ngAfterViewInit() {
    let sidenav = jQuery('#sidenavStep');
    if (this.tryToUpdate()) {
      this.cd.detectChanges();
    }
    let menu = jQuery('#mainMenu');
    let toggleBtn = jQuery('#toggleBtn');

    window.onscroll = function () {
      myFunction();
    };

    function myFunction() {
      if (window.pageYOffset >= menu.outerHeight(true)) {
        if (toggleBtn != null) {
          toggleBtn.addClass('sticky');
        }
        sidenav.addClass('sticky');
      } else {
        if (toggleBtn != null) {
          toggleBtn.removeClass('sticky');
        }
        sidenav.removeClass('sticky');
      }
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


  /*  @HostListener('window:scroll', []) onWindowScroll() {
      this.scrollFunction();
      /!*if
      }*!/
    }*/

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

}
