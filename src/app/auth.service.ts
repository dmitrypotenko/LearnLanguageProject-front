import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Util} from './utils/util';
import {appUrl} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  isAdmin(): Observable<Boolean> {
    let role = sessionStorage.getItem('role');

    if (role == 'ROLE_ADMIN') {
      return of(true);
    } else {
      return this.http.get<String[]>(appUrl + '/role').pipe(
        catchError(Util.handleError(false)),
        tap(roles => sessionStorage.setItem('role', String(roles[0]))),
        map(roles => roles[0] == 'ROLE_ADMIN')
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

  role() : Observable<string> {
    let role = sessionStorage.getItem('role');

    if (role == 'ROLE_ADMIN' || role == 'ROLE_USER') {
      return of(role);
    } else {
      return this.http.get<String[]>(appUrl + '/role').pipe(
        catchError(Util.handleError(false)),
        tap(roles => sessionStorage.setItem('role', String(roles[0]))),
        map(roles => roles[0])
      );
    }
  }

}


