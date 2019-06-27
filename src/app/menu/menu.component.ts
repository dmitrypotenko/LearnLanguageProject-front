import { Component, OnInit } from '@angular/core';
import {appUrl} from '../constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public appUrl: string = appUrl;

  constructor() { }

  ngOnInit() {
  }

}
