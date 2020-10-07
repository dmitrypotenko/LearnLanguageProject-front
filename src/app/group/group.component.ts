import {Component, Input, OnInit} from '@angular/core';
import {GroupData} from './group.data';
import {CourseData, CourseService} from '../course/course.service';
import {GroupService} from './group.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../service/user.service';
import {AccessData} from '../auth/access.data';
import {SecurityModalComponent} from '../course/course-edit/security-modal/security-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {CourseListDialogComponent} from '../course/course-list/course-list-dialog/course-list-dialog.component';
import {MatListOption} from '@angular/material/list';
import {ConcessionDialogComponent} from '../course/course-list/concession-dialog/concession-dialog.component';
import {appUiUrl} from '../../environments/environment';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  private _group: GroupData;
  groupCourses: CourseData[];
  private _route: ActivatedRoute;
  students: AccessData[];
  shareableLink: string;


  @Input()
  set group(value: GroupData) {
    this._group = value;
    if (this._group != null) {
      this.fetchGroupDetails(this._group.id);
    }
  }


  get group(): GroupData {
    return this._group;
  }

  constructor(private courseService: CourseService,
              private groupService: GroupService,
              private userService: UserService,
              route: ActivatedRoute,
              private dialog: MatDialog,
              public authService: AuthService) {
    this._route = route;
  }

  ngOnInit(): void {
    if (this._group == null) {
      let groupId: number = Number(this._route.snapshot.paramMap.get('groupId'));
      let key = this._route.snapshot.queryParamMap.get('key');
      if (groupId > 0) {
        this.groupService.getGroup(groupId, key).subscribe(
          group => {
            this._group = group;
            this.fetchGroupDetails(groupId);
          }
        );
      }
    } else {
      this.fetchGroupDetails(this._group.id);
    }
  }


  private fetchGroupDetails(groupId: number) {
    this.shareableLink = this.getShareableLink();
    this.courseService.getCoursesMetadataForGroup(this._group.id).subscribe(courses => {
      this.groupCourses = courses;
    });
    this.userService.getStudentsForGroup(groupId).subscribe(students => this.students = students);
  }

  openAccessDialog() {
    let dialogRef = this.dialog.open(SecurityModalComponent, {
      height: '70vh',
      width: '60vw',
      hasBackdrop: true,
      data: {
        id: this._group.id,
        securityEntityName: 'groups'
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.userService.getStudentsForGroup(this._group.id).subscribe(students => this.students = students);
    });
  }

  openCoursesDialog() {
    let dialogRef = this.dialog.open(CourseListDialogComponent, {
      height: '70vh',
      width: '60vw',
      hasBackdrop: true,
      data: {
        coursesToFilter: this.groupCourses
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result instanceof Array) {
        this.groupService.assignCourses(result.map(course => course.id), this.group.id).subscribe();
        this.groupCourses = this.groupCourses.concat(result);
      }
    });
  }

  excludeCourses(selected: MatListOption[]) {
    let values = selected.map(selectedVal => selectedVal.value.id);
    this.groupService.deleteCourses(values, this.group.id).subscribe(() => {
      this.groupCourses = this.groupCourses.filter(course => values.indexOf(course.id) < 0);
    });
  }

  generateLink() {
    let _this = this;

    function generate() {
      _this.groupService.generateKey(_this.group.id).subscribe(key => {
        _this.group.key = key;
        _this.shareableLink = _this.getShareableLink();
      });
    }

    let key = this.group.key;
    if (key != null && (key as string).length > 0) {
      this.dialog.open(ConcessionDialogComponent, {height: '20vh', width: '30vw', hasBackdrop: true})
        .afterClosed().subscribe(result => {
        if (result) {
          generate();
        }
      });
    } else {
      generate();
    }
  }

  getShareableLink() {
    let key = this.group.key;
    if (key != null && (key as string).length > 0) {
      return appUiUrl + '/groups/' + this.group.id + '/?key=' + key;
    }
    return '';
  }
}
