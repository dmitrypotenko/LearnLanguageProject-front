import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieHandler implements HttpInterceptor {
  constructor(private cookieService: CookieService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //  const clonedRequest = request.clone({headers: request.headers.set('Set-Cookie', jsessionid)});
    const clonedRequest = request.clone({
      withCredentials: true,
    });

    // Pass control to the next request
    return next.handle(clonedRequest);
  }
}
