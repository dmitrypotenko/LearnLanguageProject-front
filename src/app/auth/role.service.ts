import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {appUrl} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getUserRoles(): Observable<string[]> {
    return this.http.get<string[]>(appUrl + '/role');
  }
}
