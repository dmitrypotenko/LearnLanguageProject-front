import {CoreModule} from './core.module';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  imports: [
    CoreModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
