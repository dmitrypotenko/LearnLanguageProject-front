import {Component, Input, OnInit} from '@angular/core';
import {TestData} from "../../service/test.service";

@Component({
  selector: 'app-test-internal',
  templateUrl: './test-internal.component.html',
  styleUrls: ['./test-internal.component.scss']
})
export class TestInternalComponent implements OnInit {

  @Input()
  testData: TestData;

  constructor() { }

  ngOnInit(): void {
  }

}
