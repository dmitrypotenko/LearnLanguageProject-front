import {Component, OnInit} from '@angular/core';
import {GroupService} from '../group.service';
import {GroupData} from '../group.data';
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
  newGroup: GroupData;

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
    this.newGroup = new GroupData(null, '', null, []);
  }

  saveGroup() {
    this.newGroup.name = this.newName.value;
    this.newName.setValue('');
    this.groupService.saveGroup(this.newGroup).subscribe(savedGroup => {
      this.newGroup.id = savedGroup.id;
      this.groups = this.groups.concat(this.newGroup);
      this.newGroup = null;
    });
  }
}
