import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {LessonComponent} from './lesson/lesson.component';
import {CourseListComponent} from './course/course-list/course-list.component';
import {CourseComponent} from './course/course.component';
import {CourseEditComponent} from './course/course-edit/course-edit.component';
import {DonateComponent} from './donate/donate.component';
import {ErrorComponent} from './error/error.component';
import {PolicyComponent} from "./landing/policy/policy.component";

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: LandingComponent},
  {path: 'lesson/:lessonName', component: LessonComponent},
  {path: 'lesson', component: LessonComponent},
  {path: 'courses/create', component: CourseEditComponent},
  {path: 'courses/edit/:id', component: CourseEditComponent},
  {path: 'courses/:id', component: CourseComponent},
  {path: 'courses/:id/steps/:stepId', component: CourseComponent},
  {path: 'courses', component: CourseListComponent},
  {path: 'donate', component: DonateComponent},
  {path: 'policy', component: PolicyComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

