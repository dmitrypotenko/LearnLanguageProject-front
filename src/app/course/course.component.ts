import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {CourseData, CourseService} from '../course.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  private courseData: CourseData;

  private route: ActivatedRoute;

  private courseService: CourseService;

  private location: Location;
  private sanitizer: DomSanitizer;

  constructor(
    route: ActivatedRoute,
    courseService: CourseService,
    location: Location,
    sanitizer: DomSanitizer
  ) {
    this.location = location;
    this.courseService = courseService;
    this.route = route;
    this.sanitizer = sanitizer;
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const courseName = this.route.snapshot.paramMap.get('courseName');
    this.courseService.getCourseData(courseName)
      .subscribe(courseData => this.courseData = courseData);
  }

}
