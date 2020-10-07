import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {AccessData, AccessDataVO} from '../../../auth/access.data';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CourseAccessLevel} from '../../../auth/course-access-level';
import {NotificationService} from '../../../error/NotificationService';
import {FormControl} from '@angular/forms';
import {EMPTY, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {UserData} from '../../../auth/user.data';

@Component({
  selector: 'app-security-modal',
  templateUrl: './security-modal.component.html',
  styleUrls: ['./security-modal.component.scss']
})
export class SecurityModalComponent implements OnInit {

  private securityEntityId: number;

  accesses: AccessData[] = [];
  students: Observable<AccessData[]> = EMPTY;
  owners: Observable<AccessData[]> = EMPTY;
  all: Observable<AccessData[]> = EMPTY;
  searchControl = new FormControl();

  toUpdate = new Set<AccessDataVO>();
  private securityEntityName: string;


  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<SecurityModalComponent>) {
    this.securityEntityId = data.id;
    this.securityEntityName = data.securityEntityName;
  }

  ngOnInit(): void {
    this.userService.getSecurityModelFor(this.securityEntityId, this.securityEntityName)
      .subscribe(accesses => {
        this.accesses = accesses;
        this.owners = this.searchControl.valueChanges.pipe(
          startWith(''),
          map(studentName => this._filter(studentName, this.accesses?.filter(access => access.accessLevel == CourseAccessLevel.OWNER)))
        );
        this.students = this.searchControl.valueChanges.pipe(
          startWith(''),
          map(studentName => this._filter(studentName, this.accesses?.filter(access => access.accessLevel == CourseAccessLevel.STUDENT)))
        );
        this.all = this.searchControl.valueChanges.pipe(
          startWith(''),
          map(studentName => this._filter(studentName, this.accesses?.filter(access => access.accessLevel == CourseAccessLevel.NONE)))
        );
      });

  }

  private _filter(studentName: string, accessesToFilter: AccessData[]): AccessData[] {
    const filterValue = studentName?.toLowerCase() || '';

    return accessesToFilter.filter(access => access.userDto.name.toLowerCase().indexOf(filterValue) >= 0);
  }

  removeFromStudents(access: AccessData) {
    access.accessLevel = CourseAccessLevel.NONE;
    this.toUpdate.add(new AccessDataVO(access.userDto.id, CourseAccessLevel.NONE));
    this.searchControl.setValue(this.searchControl.value);
  }

  addToStudents(access: AccessData) {
    access.accessLevel = CourseAccessLevel.STUDENT;
    this.toUpdate.add(new AccessDataVO(access.userDto.id, CourseAccessLevel.STUDENT));
    this.searchControl.setValue(this.searchControl.value);
  }

  updateAccesses() {
    this.userService.updateAccesses(Array.from(this.toUpdate), this.securityEntityId, this.securityEntityName)
      .subscribe(response => {
        if (response.status == 200) {
          this.dialogRef.close();
          this.notificationService.showSuccess('Access is successfully updated');
        } else {
          this.notificationService.showError('Can\'t update accesses. Something went wrong.');
        }
      });
  }

  addToOwners(access: AccessData) {
    access.accessLevel = CourseAccessLevel.OWNER;
    this.toUpdate.add(new AccessDataVO(access.userDto.id, CourseAccessLevel.OWNER));
    this.searchControl.setValue(this.searchControl.value);
  }

  isAdmin(userDto: UserData) {
    return userDto.roles.find(role => role == 'ROLE_ADMIN') != null;
  }

  removeFromOwners(access: AccessData) {
    access.accessLevel = CourseAccessLevel.NONE;
    this.toUpdate.add(new AccessDataVO(access.userDto.id, CourseAccessLevel.NONE));
    this.searchControl.setValue(this.searchControl.value);
  }
}
