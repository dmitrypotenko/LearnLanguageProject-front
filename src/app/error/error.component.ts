import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {appUiUrl} from '../../environments/environment';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private meta: Meta,
              private route: ActivatedRoute) {
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
    }
  }

}
