import {Component, Input, OnInit} from '@angular/core';
import {QuestionData, VariantData} from '../question.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  _question: QuestionData;

  options: VariantData[];

  get question(): QuestionData {
    return this._question;
  }

  @Input()
  name: string;

  @Input()
  set question(value: QuestionData) {
    this._question = value;
    this.options = value.variants.filter(option => option.inputName == this.name);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  onChange($event: Event) {
    let value = ($event.target as HTMLInputElement).value;
    let options = this.options;
    if (options != null) {
      let variantData = options.find(option => option.inputName == this.name && option.isTicked);
      if (variantData != null) {
        variantData.variant = value;
      }
    }
  }

  getValue() {
    let options = this.options;
    if (options != null) {
      let variantData = options.find(option => option.inputName == this.name && option.isTicked);
      if (variantData != null) {
        return variantData.variant;
      }
    }
    return '';
  }

}
