import {Component, Input, OnInit} from '@angular/core';
import {UserData} from "../auth/user.data";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: UserData;

  constructor() {
  }

  ngOnInit(): void {
  }

}
