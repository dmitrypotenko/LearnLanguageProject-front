import {Component, Inject, OnInit, Optional} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {RESPONSE} from '@nguniversal/express-engine/tokens';
import {ActivatedRoute, Router} from '@angular/router';
import {appUiUrl} from '../../environments/environment';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private meta: Meta, @Optional() @Inject(RESPONSE) private response: any,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    let shouldRedirect = this.route.snapshot.queryParamMap.get('shouldRedirect');
    if (!shouldRedirect) {
      window.location.replace(appUiUrl + '/not-found?shouldRedirect=false');
    } else {
      this.meta.updateTag({
        name: 'robots',
        content: 'noindex'
      });
      if (this.response) {
        this.response.statusCode = 404;
      }
    }
  }

}
