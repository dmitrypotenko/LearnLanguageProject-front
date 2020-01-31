import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/auth/auth.service';
import {appUrl} from '../../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public appUrl: string = appUrl;
  private _role = 'undefined';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.role().subscribe(role => this._role = role);
  }

  // TODO: change next two method with one param and Subject
  notLoggerIn() {
    return !this._role || !ALL_ROLES.some(roleOpt => roleOpt === this._role);
  }

  isLoggerIn() {
    return !!this._role && ALL_ROLES.some(roleOpt => roleOpt === this._role);
  }

  logout() {
    this.authService.logout();
  }
}
