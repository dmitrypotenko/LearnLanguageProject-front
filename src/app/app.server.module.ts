import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';

import {CoreModule} from './core.module';
import {AppComponent} from './app.component';
import {SsrRoutingModule} from './ssr-routing.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CoreModule,
    ServerModule,
    SsrRoutingModule,
    RouterModule
],
  bootstrap: [AppComponent],
})
export class AppServerModule {
}
