import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LandingComponent} from './landing/landing.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatRadioModule,
  MatCardModule,
  MatGridListModule,
  MatMenuModule,
  MatIconModule,
  MatExpansionModule
} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MenuComponent } from './menu/menu.component';
import { MiddleComponent } from './middle/middle.component';
import { FooterComponent } from './footer/footer.component';
import { LessonComponent } from './lesson/lesson.component';
import { CoursePanelComponent } from './course/course-panel/course-panel.component';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { DocumentComponent } from './document/document.component';
import {CookieHandler} from './cookie-handler';
import {CookieService} from 'ngx-cookie-service';
import { CourseEditComponent } from './course/course-edit/course-edit.component';
import { QuestionComponent } from './question/question.component';
import { TestComponent } from './test/test.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatSnackBarModule} from '@angular/material';
import { ConcessionDialogComponent } from './course/course-list/concession-dialog/concession-dialog.component';
import {MatDialogModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NgxDropzoneModule} from 'ngx-dropzone';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { DonateComponent } from './donate/donate.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
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
    ConcessionDialogComponent,
    AboutmeComponent,
    DonateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
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
    MatSnackBarModule,
    MatDialogModule,
    MatSidenavModule,
    CKEditorModule,
    NgxDropzoneModule,
    MatExpansionModule,
    RouterModule
  ],
  entryComponents: [
    ConcessionDialogComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CookieHandler,
    multi: true
  },
    CookieService],
  bootstrap: [AppComponent],
})
export class CoreModule { }
