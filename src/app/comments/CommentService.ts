import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {CommentData} from "./CommentData";
import {Observable} from "rxjs";
import {appUrl} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {Util} from "../utils/util";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) {
  }

  createComment(comment: CommentData): Observable<CommentData> {
    return this.http.post<CommentData>(appUrl + '/comments', JSON.stringify(comment), {headers: new HttpHeaders('Content-Type: application/json')}).pipe(catchError(Util.handleError(null)));
  }

  deleteComment(commentId: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(appUrl + '/comments/' + commentId, {
      headers: new HttpHeaders('Content-Type: application/json'),
      observe: 'response'
    }).pipe(catchError(Util.handleError(null)));
  }

  updateComment(comment: CommentData): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(appUrl + '/comments', comment, {
      headers: new HttpHeaders('Content-Type: application/json'),
      observe: 'response'
    }).pipe(catchError(Util.handleError(null)));
  }

  getComments(threadId: string): Observable<CommentData[]> {
    return this.http.get<CommentData[]>(appUrl + '/comments/' + threadId).pipe(catchError(Util.handleError(null)));
  }

}
