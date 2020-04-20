import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {NavigationError, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import * as ErrorStackParser from 'error-stack-parser';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {


  constructor(
    private injector: Injector,
    private router: Router,
  ) {
    // Subscribe to the NavigationError
    this.router
      .events
      .subscribe(event => {
        if (event instanceof NavigationError) {
          // Redirect to the ErrorComponent
          this.log(event.error)
            .subscribe((errorWithContext) => {
              this.router.navigate(['/error'], {queryParams: errorWithContext});
            });
        }
      });
  }

  getClientErrorMessage(error: Error): string {
  /*  if (environment.production) {
      return '';
    }*/
    return error.message ? error.message : error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    if (error.status == 403) {
      return 'You are not allowed to view this page: ' + this.getMessage(error);
    }
    if (error.status == 401) {
      return 'You don\'t have rights to view this page. You should login and have admin privileges. ' + this.getMessage(error);
    }
    return "Internal server error. " + error.message + ' \nMessage: ' + this.getMessage(error);
  }

  private getMessage(error: HttpErrorResponse) {
    if (error.error != null) {
      return error.error.message;
    }
    return '';
  }

  private getError(error: HttpErrorResponse) {
    if (error.error != null) {
      return error.error.error;
    }
    return '';
  }

  log(error) {
    // Log the error to the console
    console.error(error);
    // Send error to server
    const errorToSend = this.addContextInfo(error);
    return FakeHttpService.post(errorToSend);
  }

  addContextInfo(error) {
    // You can include context details here (usually coming from other services: UserService...)
    const name = error.name || null;
    const appId = 'shthppnsApp';
    const user = 'ShthppnsUser';
    const time = new Date().getTime();
    const id = `${appId}-${user}-${time}`;
    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const status = error.status || null;
    const message = error.message || error.toString();
    const stack = error instanceof HttpErrorResponse ? null : ErrorStackParser.parse(error);

    const errorWithContext = {name, appId, user, time, id, url, status, message, stack};
    return errorWithContext;
  }
}


class FakeHttpService {
  static post(error): Observable<any> {
    console.log('Error sent to the server: ', error);
    return of(error);
  }
}
