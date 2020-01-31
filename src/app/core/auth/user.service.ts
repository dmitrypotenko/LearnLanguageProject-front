import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {appUrl} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getUserRoles(): Observable<string[]> {
    return this.http.get<string[]>(appUrl + '/role');
  }

  logout(): Observable<any> {
    return this.http.get(appUrl + '/logout', {
      headers: new HttpHeaders('Content-Type: application/json'),
      observe: 'response'
    });
  }
}
