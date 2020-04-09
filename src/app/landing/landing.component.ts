import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {
  jarallax
} from 'jarallax';




@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Learn hard';

  ngOnInit() {
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.2,
      imgSrc: 'assets/parallax_new_york.jpg'
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }
}
