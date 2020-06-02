import { Component, OnInit } from '@angular/core';
import {appUrl} from "../../../environments/environment";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public appUrl: string = appUrl;
  constructor() { }

  ngOnInit(): void {
  }

}
