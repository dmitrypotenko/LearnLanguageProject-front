import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LandingComponent} from './landing/landing.component';
import {LessonComponent} from './lesson/lesson.component';
import {CourseListComponent} from './course-list/course-list.component';
import {CourseComponent} from './course/course.component';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'welcome', component: LandingComponent},
  {path: 'lesson/:lessonName', component: LessonComponent},
  {path: 'lesson', component: LessonComponent},
  {path: 'courses', component: CourseListComponent},
  {path: 'courses/:id', component: CourseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

