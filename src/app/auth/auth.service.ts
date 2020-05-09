import {Injectable, Injector, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserData} from './UserData';
import {appUrl} from "../../environments/environment";
import {map, tap} from "rxjs/operators";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient;
  user: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(new UserData(null, [], '', ''));

  constructor(http: HttpClient, private injector: Injector) {
    this.http = http;
    if (this.isPlatformBrowser()) {
      this.getUserInfo().subscribe();
      setInterval(() => {
        this.getUserInfo().subscribe();
      }, 1000000)
    }
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

  isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.injector.get(PLATFORM_ID))
  }

}


