import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {appUrl} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {GroupData} from './group.data';
import {catchError} from 'rxjs/operators';
import {Util} from '../utils/util';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  getAllGroups(): Observable<GroupData[]> {
    return this.http.get<GroupData[]>(appUrl + '/groups',
      {headers: new HttpHeaders('Content-Type: application/json')});
  }

  getGroup(groupId: number, key?: string): Observable<GroupData> {
    let addParam = '';
    if (key != null && key.length > 0) {
      addParam = '?key=' + key;
    }
    return this.http.get<GroupData>(appUrl + '/groups/' + groupId + addParam,
      {headers: new HttpHeaders('Content-Type: application/json')});
  }

  saveGroup(groupData: GroupData): Observable<GroupData> {
    return this.http.post<GroupData>(appUrl + '/groups',
      JSON.stringify(groupData),
      {headers: new HttpHeaders('Content-Type: application/json')});
  }

  deleteCourses(courseIds: number[], groupId: number): Observable<HttpResponse<Object>> {
    return this.http.delete(appUrl + '/groups/' + groupId + '/courses', {
      headers: new HttpHeaders('Content-Type: application/json'),
      observe: 'response',
      params: new HttpParams({fromObject: {courseIds: courseIds.toString()}})
    });
  }

  assignCourses(courseIds: number[], groupId: number): Observable<HttpResponse<Object>> {
    return this.http.post(appUrl + '/groups/' + groupId + '/courses',
      {courseIds: courseIds},
      {
        headers: new HttpHeaders('Content-Type: application/json'),
        observe: 'response'
      });
  }

  getGroupsForTest(testId: number): Observable<GroupData[]> {
    return this.http.get<GroupData[]>(appUrl + '/groups/tests/' + testId,
      {headers: new HttpHeaders('Content-Type: application/json')});
  }

  generateKey(groupId: number): Observable<string> {
    return this.http.post(appUrl + '/groups/' + groupId + '/keys', '', {
      headers: new HttpHeaders('Content-Type: application/json'),
      responseType: 'text'
    });
  }
}
