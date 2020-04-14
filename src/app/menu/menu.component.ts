import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {appUrl} from '../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public appUrl: string = appUrl;
  private _role: string = 'undefined';

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.role().subscribe(role => this._role = role);
  }

  logout() {
    window.location.href = appUrl + '/logout';
  }


  get role(): string {
    return this._role;
  }
}
