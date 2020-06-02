import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NavigationError, Router} from '@angular/router';
import * as Sentry from '@sentry/browser';
import {environment} from '../../environments/environment';

Sentry.init({
  dsn: 'https://cb2aa8f65a754dddaf3df90e8fd26615@o385477.ingest.sentry.io/5218265'
});


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
          var errorWithContext = this.log(event.error);
          this.router.navigate(['/error'], {queryParams: errorWithContext});
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
      let message = 'You don\'t have rights to view this page. You should login. ' + this.getMessage(error);
      this.router.navigateByUrl('/login').then(result => console.log(message));
      return message;
    }
    return 'Internal server error. ' + error.message + ' \nMessage: ' + this.getMessage(error);
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

  log(error): any {
    // Log the error to the console
    console.error(error);
    // Send error to server
    if (environment.production == true) {
      SentryService.post(error);
    }
    return error;
  }
}


class SentryService {
  static post(error) {
    if (error.status < 400 || error.status > 499) {
      const eventId = Sentry.captureException(error.originalError || error);
      Sentry.showReportDialog({eventId});
    }
  }
}
