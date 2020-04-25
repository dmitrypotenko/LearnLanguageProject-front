import { Component, OnInit } from '@angular/core';
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private meta: Meta) { }

  ngOnInit(): void {
    this.meta.updateTag({
      name: 'robots',
      content: 'noindex'
    });
  }

}
