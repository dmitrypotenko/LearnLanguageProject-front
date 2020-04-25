import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';

import {CoreModule} from './core.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  imports: [
    CoreModule,
    ServerModule,
    AppRoutingModule,
    RouterModule
],
  bootstrap: [AppComponent],
})
export class AppServerModule {
}
