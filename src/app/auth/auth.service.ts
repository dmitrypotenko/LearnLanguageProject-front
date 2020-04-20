import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {appUrl} from '../../environments/environment';
import {UserData} from './UserData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getUserInfo(): Observable<UserData> {
    return this.http.get<UserData>(appUrl + '/userInfo');
  }

  role(): Observable<string> {
    return this.getUserInfo()
      .pipe(
        map(userResponse => userResponse.roles[0])
      );
  }

}


