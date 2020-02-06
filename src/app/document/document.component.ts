import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  @Input() link: string;
  @Input() title: string;

  constructor() {
  }

  ngOnInit() {
  }

  isPdf(): boolean {
    return this.title.substring(this.title.length - 4, this.title.length) == '.pdf';
  }
}
