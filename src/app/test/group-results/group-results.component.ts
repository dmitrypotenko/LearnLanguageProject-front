import {Component, Input, OnInit} from '@angular/core';
import {GroupService} from '../../group/group.service';
import {GroupData} from '../../group/group.data';

@Component({
  selector: 'app-group-results',
  templateUrl: './group-results.component.html',
  styleUrls: ['./group-results.component.scss']
})
export class GroupResultsComponent implements OnInit {


  private _testId: number;

  @Input()
  set testId(value: number) {
    this._testId = value;
    this.getGroup();
  }


  get testId(): number {
    return this._testId;
  }

  groups: GroupData[];
  currentGroup: GroupData;

  constructor(private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.getGroup();
  }

  private getGroup() {
    this.groupService.getGroupsForTest(this._testId)
      .subscribe(groups => {
        this.groups = groups;
        let foundGroup = this.groups.find(group => this.currentGroup?.id == group.id);
        if (foundGroup == null) {
          this.currentGroup = null;
        } else {
          this.currentGroup.users = foundGroup.users;
        }
      });
  }

  isSelected(groupData: GroupData): boolean {
    return this.currentGroup?.id == groupData.id;
  }

  switchToGroup(value: GroupData) {
    this.currentGroup = value;
  }
}
