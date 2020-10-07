import {Component, Input, OnInit} from '@angular/core';
import {GroupService} from '../../group/group.service';
import {GroupData} from '../../group/group.data';

@Component({
  selector: 'app-group-results',
  templateUrl: './group-results.component.html',
  styleUrls: ['./group-results.component.scss']
})
export class GroupResultsComponent implements OnInit {


  @Input()
  testId: number;
  groups: GroupData[];
  currentGroup: GroupData;

  constructor(private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.groupService.getGroupsForTest(this.testId)
      .subscribe(groups => this.groups = groups);
  }

  isSelected(groupData: GroupData): boolean {
    return this.currentGroup?.id == groupData.id;
  }

  switchToGroup(value: GroupData) {
    this.currentGroup = value;
  }
}
