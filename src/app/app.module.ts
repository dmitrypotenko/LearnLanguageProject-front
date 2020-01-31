import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LandingComponent} from './modules/home/landing/landing.component';
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
import { MenuComponent } from './modules/menu/menu.component';
import { AboutsiteComponent } from './modules/home/aboursite/aboutsite.component';
import { FooterComponent } from './modules/home/footer/footer.component';
import { LessonComponent } from './lesson/lesson.component';
import { CoursePanelComponent } from './course/course-panel/course-panel.component';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { DocumentComponent } from './document/document.component';
import {CookieHandler} from './shared/services/cookie-handler';
import {CookieService} from 'ngx-cookie-service';
import { CourseEditComponent } from './course/course-edit/course-edit.component';
import { QuestionComponent } from './question/question.component';
import { TestComponent } from './test/test.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TextSelectDirective } from './shared/text-select.directive';
import { MatSnackBarModule} from '@angular/material';
import { ConcessionDialogComponent } from './course/course-list/concession-dialog/concession-dialog.component';
import {MatDialogModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NgxDropzoneModule} from 'ngx-dropzone';
import { AboutmeComponent } from './modules/home/aboutme/aboutme.component';
import { DonateComponent } from './donate/donate.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    MenuComponent,
    AboutsiteComponent,
    FooterComponent,
    LessonComponent,
    CoursePanelComponent,
    CourseComponent,
    CourseListComponent,
    DocumentComponent,
    CourseEditComponent,
    QuestionComponent,
    TestComponent,
    TextSelectDirective,
    ConcessionDialogComponent,
    AboutmeComponent,
    DonateComponent
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
        MatSnackBarModule,
        MatDialogModule,
        MatSidenavModule,
        CKEditorModule,
        NgxDropzoneModule,
        MatExpansionModule
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
