import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserData} from '../auth/user.data';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  userData: UserData;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
        if (user.id != null) {
          this.userData = user;
        }
      }
    );
  }

}
