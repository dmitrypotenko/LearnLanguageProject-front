import {Component, Input, OnInit} from '@angular/core';
import {BreadcrumbData} from './BreadcrumbData';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input()
  breadcrumbItems: BreadcrumbData[];

  constructor() {
  }

  ngOnInit(): void {
  }

 /* private createBreadcrumbs(route: ActivatedRoute, url: string = '#', breadcrumbs: BreadcrumbData[] = []): BreadcrumbData[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
      if (!isNullOrUndefined(label)) {
        breadcrumbs.push({label, url});
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }*/

}
