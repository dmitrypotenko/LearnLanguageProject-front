import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserData} from './user.data';
import {appUrl} from '../../environments/environment';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient;
  user: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(new UserData(null, [], '', ''));

  constructor(http: HttpClient) {
    this.http = http;
    this.getUserInfo().subscribe();
    setInterval(() => {
      this.getUserInfo().subscribe();
    }, 1000000);
  }

  getUserInfo(): Observable<UserData> {
    return this.http.get<UserData>(appUrl + '/userInfo')
      .pipe(map(userResponse => new UserData(userResponse.id, userResponse.roles, userResponse.name, userResponse.pictureUrl)),
        tap(userResponse => {
          this.user.next(userResponse);
        }));
  }

  isAuthorized(): Observable<boolean> {
    return this.user.asObservable().pipe(map(user => user.id != null));
  }

  isAdmin(): Observable<boolean> {
    return this.user.asObservable().pipe(map(user => user.id != null && (user.roles.find(role => role == 'ROLE_ADMIN') != null
      || user.roles.find(role => role == 'ROLE_SUPER_ADMIN') != null)));
  }

}


