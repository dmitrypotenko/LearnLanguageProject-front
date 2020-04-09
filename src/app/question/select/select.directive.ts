import {Directive, Input, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[app-select-dir]'
})
export class SelectDirective {

  @Input()
  inputName:string;

  constructor(public viewContainerRef: ViewContainerRef) { }

}
