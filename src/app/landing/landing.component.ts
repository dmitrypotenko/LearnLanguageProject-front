import {Component, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';


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

}
