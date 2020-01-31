import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Util} from '../../shared/utils/util';
import {UserService} from './user.service';
import {appUrl} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService) {
  }

  isAdmin(): Observable<boolean> {
    return this.role().pipe(
      map(roles => roles[0] === Role.ROLE_ADMIN)
    );
  }

  role(): Observable<string> {
    const userRole = sessionStorage.getItem(ROLE_PARAM);

    if (userRole === Role.ROLE_ADMIN || userRole === Role.ROLE_USER) {
      return of(userRole);
    } else {
      return this.userService.getUserRoles().pipe(
        catchError(Util.handleError(false)),
        tap(roles => sessionStorage.setItem(ROLE_PARAM, String(roles[0]))),
        map(roles => roles[0])
      );
    }
  }

  logout() {
    sessionStorage.removeItem(ROLE_PARAM);
    this.userService.logout().subscribe(() => {
      window.location.href = appUrl + '/logout';
    }, () => {
      // TODO: log an error or do something else
    });
  }
}


