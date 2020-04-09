import {Component, Injector} from '@angular/core';
import {MenuComponent} from './menu/menu.component';
import {createCustomElement} from '@angular/elements';
import {SelectComponent} from './question/select/select.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( injector: Injector) {
    const selComp = createCustomElement(SelectComponent, {injector});
    customElements.define('select-element', selComp);
  }
}
