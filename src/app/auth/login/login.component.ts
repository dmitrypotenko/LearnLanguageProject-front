import {Component, OnInit} from '@angular/core';
import {appUrl} from "../../../environments/environment";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public appUrl: string = appUrl;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  logout() {
    window.location.href = appUrl + '/logout';
  }
}
