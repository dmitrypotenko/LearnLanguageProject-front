import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DonateComponent} from './donate/donate.component';

const routes: Routes = [
  {path: 'donate', component: DonateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class SsrRoutingModule {
}

