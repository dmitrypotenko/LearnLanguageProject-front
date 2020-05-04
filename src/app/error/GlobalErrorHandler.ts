import {ErrorHandler, Injectable, Injector, PLATFORM_ID} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorService} from './ErrorService';
import {NotificationService} from './NotificationService';
import {Router} from '@angular/router';
import {isPlatformBrowser} from "@angular/common";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {
  }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const notifier = this.injector.get(NotificationService);
    const router = this.injector.get(Router);

    let message;
    let stackTrace;
    if (error instanceof HttpErrorResponse) {
      // Server error
      if (!navigator.onLine) {
        errorService
          .log({message: "You are offline"})
          .subscribe(errorWithContextInfo => {
            router.navigate(['/error'], {queryParams: errorWithContextInfo});
          });
        return;
      }

      message = errorService.getServerErrorMessage(error);
      //stackTrace = errorService.getServerErrorStackTrace(error);
      if (isPlatformBrowser(this.injector.get(PLATFORM_ID))) {
        notifier.showError(message);
      }
    } else {
      // Client Error
      message = "Something went wrong on the page: " + errorService.getClientErrorMessage(error);
      if (isPlatformBrowser(this.injector.get(PLATFORM_ID))) {
        notifier.showError(message);
      }
    }
    // Always log errors
    errorService.log(error);
  }
}
