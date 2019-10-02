import {HttpHeaders} from '@angular/common/http';

export const appUrl = 'http://localhost:8080';
export const questionWordTag = 'SPAN';
export const questionWordCss = 'questionWord';

export const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
