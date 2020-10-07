import {Component, OnInit} from '@angular/core';
import {GroupService} from '../group.service';
import {GroupData} from '../group.data';
import {CourseService} from '../../course/course.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups: GroupData[];
  currentGroup: GroupData;
  newName = new FormControl();

  constructor(private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.groupService.getAllGroups()
      .subscribe(groups => this.groups = groups);
  }

  isSelected(group: GroupData) {
    return this.currentGroup?.id == group.id;
  }

  switchToGroup(group: GroupData) {
    this.currentGroup = group;

  }

  createGroup() {
    let newGroup = new GroupData(null, '', null, []);
    this.groups = this.groups.concat(newGroup);
  }

  saveGroup(group: GroupData) {
    group.name = this.newName.value;
    this.newName.setValue('');
    this.groupService.saveGroup(group).subscribe(savedGroup => group.id = savedGroup.id);
  }
}
