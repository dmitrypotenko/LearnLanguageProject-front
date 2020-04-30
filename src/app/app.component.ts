import {Component, Inject, Injector, PLATFORM_ID} from '@angular/core';
import {SelectComponent} from './question/select/select.component';
import {isPlatformBrowser} from '@angular/common';
import {InputComponent} from './question/input/input.component';
import {NavigationEnd, NavigationStart, PRIMARY_OUTLET, Router, RouterEvent, UrlSegmentGroup} from "@angular/router";
import {filter} from "rxjs/operators";
import {environment} from "../environments/environment";


declare var require: any;
declare var gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(injector: Injector, @Inject(PLATFORM_ID) platformId: Object, private router:Router) {
    if (isPlatformBrowser(platformId)) {

      router.events
        .pipe(
          filter((event: RouterEvent) => event instanceof NavigationEnd)
        )
        .subscribe( (event: NavigationEnd) => {
          if (environment.production == true) {
            gtag('config', 'UA-164785297-1', { 'page_path': this.getRootUrl(event.url) });
          }
      });
      const {createCustomElement} = require('@angular/elements');

      const selComp = createCustomElement(SelectComponent, {injector});
      customElements.define('select-element', selComp);

      const inputComp = createCustomElement(InputComponent, {injector});
      customElements.define('input-element', inputComp);
    }

  }

  getRootUrl(url: string) {
    let retVal = '/';
    let urlSegmentGroup: UrlSegmentGroup = this.router.parseUrl(url).root.children[PRIMARY_OUTLET];
    if (urlSegmentGroup) {
      retVal += urlSegmentGroup.toString();
    }
    return retVal;
  }
}
