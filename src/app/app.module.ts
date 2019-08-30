import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LandingComponent} from './landing/landing.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { AdressComponent } from './adress/adress.component';
import { MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, MatGridListModule, MatMenuModule, MatIconModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CardsComponent } from './cards/cards.component';
import { MenuComponent } from './menu/menu.component';
import { MiddleComponent } from './middle/middle.component';
import { FooterComponent } from './footer/footer.component';
import { LessonComponent } from './lesson/lesson.component';
import { CoursePanelComponent } from './course-panel/course-panel.component';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { DocumentComponent } from './document/document.component';
import {CookieHandler} from './cookie-handler';
import {CookieService} from 'ngx-cookie-service';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { QuestionComponent } from './question/question.component';
import { TestComponent } from './test/test.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TextSelectDirective } from './text-select.directive';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    AdressComponent,
    DashboardComponent,
    CardsComponent,
    MenuComponent,
    MiddleComponent,
    FooterComponent,
    LessonComponent,
    CoursePanelComponent,
    CourseComponent,
    CourseListComponent,
    DocumentComponent,
    CourseEditComponent,
    QuestionComponent,
    TestComponent,
    TextSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MDBBootstrapModule.forRoot(),
    DragDropModule,
    AngularEditorModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CookieHandler,
    multi: true
  },
    CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
