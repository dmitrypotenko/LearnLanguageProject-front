import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Util} from '../utils/util';
import {appUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient;

  private ROLE = 'role';

  constructor(http: HttpClient) {
    this.http = http;
  }

  isAdmin(): Observable<boolean> {
    const userRole = sessionStorage.getItem(this.ROLE);

    if (userRole === Roles.ROLE_ADMIN) {
      return of(true);
    } else {
      return this.http.get<string[]>(appUrl + '/role').pipe(
        catchError(Util.handleError(false)),
        tap(roles => sessionStorage.setItem(this.ROLE, String(roles[0]))),
        map(roles => roles[0] === Roles.ROLE_ADMIN)
      );
    }
  }

  logout(): Observable<Response> {
    return this.http.get(appUrl + '/logout', {
      headers: new HttpHeaders('Content-Type: application/json'),
      observe: 'response'
    })
      .pipe(catchError(Util.handleError(null)));
  }

  role(): Observable<string> {
    const userRole = sessionStorage.getItem(this.ROLE);

    if (userRole === Roles.ROLE_ADMIN || userRole === Roles.ROLE_USER) {
      return of(userRole);
    } else {
      return this.http.get<string[]>(appUrl + '/role').pipe(
        catchError(Util.handleError(false)),
        tap(roles => sessionStorage.setItem(this.ROLE, String(roles[0]))),
        map(roles => roles[0])
      );
    }
  }
}

enum Roles {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER'
}


