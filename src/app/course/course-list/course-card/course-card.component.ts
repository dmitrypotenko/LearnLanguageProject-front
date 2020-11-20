import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CourseData, CourseService} from '../../course.service';
import {ConcessionDialogComponent} from '../concession-dialog/concession-dialog.component';
import {AuthService} from '../../../auth/auth.service';
import {UserData} from '../../../auth/user.data';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit, AfterViewInit {

  @Input()
  course: CourseData;


  @Output()
  deleteCourse = new EventEmitter<number>();

  @ViewChild('courseDescription', {read: ElementRef})
  description: ElementRef;
  @ViewChild('descriptionShadow', {read: ElementRef})
  descriptionShadow: ElementRef;
  @ViewChild('descriptionCollapse', {read: ElementRef})
  descriptionCollapse: ElementRef;
  userData: UserData;


  constructor(private  courseService: CourseService, public authService: AuthService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
        if (user.id != null) {
          this.userData = user;
        }
      }
    );
  }

  ngAfterViewInit(): void {
    let nativeElement = this.description.nativeElement as HTMLDivElement;
    if (nativeElement.clientHeight > 80) {
      nativeElement.classList.add('collapse');
      let descriptionShadowBox = this.descriptionShadow.nativeElement as HTMLElement;
      let descriptionShadowLink = this.descriptionCollapse.nativeElement as HTMLElement;
      descriptionShadowBox.classList.add('description-shadow');
      descriptionShadowLink.style.display = 'block';
    }
  }


  isBelongTo(ownerIds: number[], userData: UserData) {
    return ownerIds.find(owner => owner == this.userData?.id) != null;
  }

  checkShadow(showShadow: HTMLDivElement) {
    if (showShadow.classList.contains('description-shadow')) {
      showShadow.classList.remove('description-shadow');
    } else {
      showShadow.classList.add('description-shadow');
    }
  }

  delete(id: number) {
    this.dialog.open(ConcessionDialogComponent, {height: '20vh', width: '30vw', hasBackdrop: true})
      .afterClosed().subscribe(result => {
      if (result) {
        this.courseService.deleteCourse(id)
          .subscribe(response => {
            if (response.status == 200) {
              this.deleteCourse.emit(id);
            }
          });
      }
    });
  }

  constructCourseUrl(course: CourseData) {
    return this.courseService.constructCourseUrl(course);
  }
}
