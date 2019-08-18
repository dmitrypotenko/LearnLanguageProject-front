import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CourseData, CourseService} from '../course.service';
import {LessonData, LessonService} from '../lesson.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {
  private courseService: CourseService;
  private lessonService: LessonService;
  private route: ActivatedRoute;
  lessonsOfTheCourse: LessonData[];
  currentCourse: CourseData;

  private cd: ChangeDetectorRef;

  constructor(courseService: CourseService, lessonService: LessonService, route: ActivatedRoute,
              cd: ChangeDetectorRef) {
    this.cd = cd;
    this.courseService = courseService;
    this.lessonService = lessonService;
    this.route = route;
  }

  ngOnInit() {
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(id).subscribe(course => this.currentCourse = course);
    this.lessonService.getLessonsFor(id).subscribe(lessons => {
      this.lessonsOfTheCourse = lessons;

    });
  }

  ngAfterViewInit() {
    if (this.lessonsOfTheCourse.length != 0) {
      this.lessonService.pushLesson(this.lessonsOfTheCourse[0]);
      this.cd.detectChanges();
    }
  }
}
