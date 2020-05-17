import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserData} from "../auth/user.data";
import {appUrl} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {Util} from "../utils/util";
import {Injectable} from "@angular/core";
import {CourseAccessData, CourseAccessDataVO} from "../auth/course-access.data";
import {TestData} from "./test.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  getAllUsers(): Observable<UserData[]> {
    return this.http.get(appUrl + '/users')
      .pipe(catchError(Util.handleError(null)))
  }

  getSecurityModelForCourse(courseId: number): Observable<CourseAccessData[]> {
    return this.http.get(appUrl + '/users/accesses/' + courseId)
      .pipe(catchError(Util.handleError(null)))
  }

  getSubmittedTestUsers(testId: number): Observable<UserData[]> {
    return this.http.get(appUrl + '/' + testId + '/users')
      .pipe(catchError(Util.handleError(null)))
  }

  updateAccesses(accesses: CourseAccessDataVO[], courseId: number): Observable<Response> {
    return this.http.post(appUrl + '/users/accesses/' + courseId, JSON.stringify({accesses: accesses}),
      {
        headers: new HttpHeaders('Content-Type: application/json'),
        observe: 'response'
      })
      .pipe(catchError(Util.handleError(null)))
  }

}
