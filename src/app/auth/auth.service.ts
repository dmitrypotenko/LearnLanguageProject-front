import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserData} from './UserData';
import {appUrl} from "../../environments/environment";
import {map, tap} from "rxjs/operators";

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
    }, 1000000)
  }

  getUserInfo(): Observable<UserData> {
    return this.http.get<UserData>(appUrl + '/userInfo')
      .pipe(tap(userResponse => {
        this.user.next(userResponse);
      }));
  }

  isAuthorized(): Observable<boolean> {
    return this.user.asObservable().pipe(map(user => user.id != null));
  }

}


