import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {SearchData} from "./SearchData";
import {appUrl} from "../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  search(searchString: string, limit: number): Observable<SearchData[]> {
    return this.http.get<SearchData[]>(appUrl + '/search?searchString=' + searchString + '&limit=' + limit)
      .pipe(catchError(err => {
        console.log(err);
        return of([])
      }));
  }
}


