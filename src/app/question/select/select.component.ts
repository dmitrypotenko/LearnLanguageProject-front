import {Component, Input, OnInit} from '@angular/core';
import {QuestionData, VariantData} from '../question.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

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
    let value = ($event.target as HTMLSelectElement).value;
    this.options.forEach(option => {
      if (option.variant == value) {
        option.isTicked = true;
      } else {
        option.isTicked = false;
      }
    });
  }

  isDefaultSelected() {
    if (this.options != null) {
      this.options.forEach(option => {
        if (option.isTicked == true) {
          return false;
        }
      });
    }
    return true;
  }
}
