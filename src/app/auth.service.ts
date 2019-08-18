import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {appUrl} from './constants';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  isAdmin(): Observable<Boolean> {
    let isAdminVar = sessionStorage.getItem('isAdmin');

    if (isAdminVar == 'true') {
      return of(true);
    } else {
      return this.http.get<Boolean>(appUrl + '/isAdmin').pipe(
        catchError(this.handleError(false)),
        tap(isAdmin => sessionStorage.setItem('isAdmin', String(isAdmin)))
      );
    }
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      return of(result as T);
    };

  }
}


