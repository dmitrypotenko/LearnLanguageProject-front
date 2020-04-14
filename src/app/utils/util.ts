import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

export class Util {
  static handleError<T>(result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      return throwError(error);
    };
  }
}
