import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserData} from '../auth/user.data';
import {appUrl} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Util} from '../utils/util';
import {Injectable} from '@angular/core';
import {AccessData, AccessDataVO} from '../auth/access.data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  getAllUsers(): Observable<UserData[]> {
    return this.http.get(appUrl + '/users')
      .pipe(catchError(Util.handleError(null)));
  }

  getSecurityModelFor(securityEntityId: number, securityEntityName: string): Observable<AccessData[]> {
    return this.http.get(appUrl + '/users/accesses/' + securityEntityName + '/' + securityEntityId)
      .pipe(catchError(Util.handleError(null)));
  }

  getStudentsForGroup(groupId): Observable<AccessData[]> {
    return this.http.get(appUrl + '/users/students/groups/' + groupId)
      .pipe(catchError(Util.handleError(null)));
  }

  getSubmittedTestUsers(testId: number): Observable<UserData[]> {
    return this.http.get(appUrl + '/users/tests/' + testId)
      .pipe(catchError(Util.handleError(null)));
  }

  updateAccesses(accesses: AccessDataVO[], courseId: number, securityEntityName: string): Observable<Response> {
    return this.http.post(appUrl + '/users/accesses/' + securityEntityName + '/' + courseId, JSON.stringify({accesses: accesses}),
      {
        headers: new HttpHeaders('Content-Type: application/json'),
        observe: 'response'
      })
      .pipe(catchError(Util.handleError(null)));
  }

}
