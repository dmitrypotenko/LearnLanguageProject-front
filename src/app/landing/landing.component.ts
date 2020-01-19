import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
declare var jQuery: any;


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Learn hard';


  private parallaxMirror: any;

  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('mat-app-background');
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (jQuery('.parallax-mirror').length == 0) {
      jQuery('.parallax-window').parallax();
    }

  }

  ngOnDestroy(): void {
    this.parallaxMirror = jQuery('.parallax-mirror');
    this.parallaxMirror.remove()
  }


}
