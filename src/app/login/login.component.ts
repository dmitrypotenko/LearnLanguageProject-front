import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  ngOnInit() {
  }

  login(login: string, password: string) {
    this.loginService.login(login, password);
  }
}
