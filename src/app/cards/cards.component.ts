import {Component, OnDestroy, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log("parallax destroyed");
    $('.parallax-mirror').remove();
  }
}
