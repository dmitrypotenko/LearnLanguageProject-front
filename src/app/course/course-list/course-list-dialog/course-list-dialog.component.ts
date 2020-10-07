import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CourseData, CourseService} from '../../course.service';
import {MatListOption} from '@angular/material/list';

@Component({
  selector: 'app-course-list-dialog',
  templateUrl: './course-list-dialog.component.html',
  styleUrls: ['./course-list-dialog.component.scss']
})
export class CourseListDialogComponent implements OnInit {
  private coursesToFilter: number[];
  courses: CourseData[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private courseService: CourseService,
              public dialogRef: MatDialogRef<CourseListDialogComponent>) {
    this.coursesToFilter = data.coursesToFilter.map(course => course.id);

  }

  ngOnInit(): void {
    this.courseService.getAllCoursesMetadata().subscribe(courses => {
      this.courses = courses.filter(course => this.coursesToFilter.indexOf(course.id) < 0);
    });
  }

  assignCourses(selected: MatListOption[]) {
    let values = selected.map(selectedVal => selectedVal.value);
    this.dialogRef.close(values);
  }
}
