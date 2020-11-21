import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {SearchData} from "./SearchData";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {SearchService} from "./search.service";
import {CourseService} from '../course/course.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  options: Observable<SearchData[]>;


  constructor(private searchService: SearchService, public courseService: CourseService) {
  }

  ngOnInit() {
    this.options = this.searchControl.valueChanges
      .pipe(
        debounceTime(300),

        // ignore new term if same as previous term
        distinctUntilChanged(),

        // switch to new search observable each time the term changes
        switchMap((term: string) => this.searchService.search(term, 10)),
      );
  }

  mapView(searchData: SearchData) {
    if (searchData != null) {
      return searchData.lessonName
    }
    return '';
  }


}
