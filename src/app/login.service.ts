import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {appUrl} from './constants';
import {httpOptions} from './constants';
import {CompletionObserver} from 'rxjs';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http: HttpClient;
  private location: Location;

  constructor(http: HttpClient, location: Location) {
    this.http = http;
    this.location = location;
  }

  login(login: string, password: string) {
    this.http.post(appUrl + '/login', new LoginData(login, password), httpOptions)
      .subscribe(() => location.assign('/welcome'));
  }
}


class LoginData {
  private login: string;
  private password: string;


  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;

  }
}
