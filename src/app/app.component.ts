import {Component, Inject, Injector, PLATFORM_ID} from '@angular/core';
import {SelectComponent} from './question/select/select.component';
import {isPlatformBrowser} from '@angular/common';
import {InputComponent} from './question/input/input.component';


declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(injector: Injector, @Inject(PLATFORM_ID) platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      const {createCustomElement} = require('@angular/elements');

      const selComp = createCustomElement(SelectComponent, {injector});
      customElements.define('select-element', selComp);

      const inputComp = createCustomElement(InputComponent, {injector});
      customElements.define('input-element', inputComp);
    }

  }
}
