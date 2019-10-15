import {Observable, of} from 'rxjs';

export class Util {
 static handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      return of(result as T);
    };

  }
}
