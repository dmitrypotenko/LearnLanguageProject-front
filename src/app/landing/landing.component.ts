import {Component, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import * as $ from 'jquery';
import * as parallax from 'jquery-parallax.js';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  title = 'Kirill website';

  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('mat-app-background');
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    //parallax($('parallax-window'), 'destroy');
  }
}
