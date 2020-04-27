import {Component, Inject, OnInit, Optional} from '@angular/core';
import {Meta} from "@angular/platform-browser";
import {RESPONSE} from "@nguniversal/express-engine/tokens";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private meta: Meta, @Optional() @Inject(RESPONSE) private response: any) { }

  ngOnInit(): void {
    this.meta.updateTag({
      name: 'robots',
      content: 'noindex'
    });
    if (this.response) {
      this.response.statusCode = 404;
    }
  }

}
