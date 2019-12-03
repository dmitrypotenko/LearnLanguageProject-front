import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {LessonComponent} from './lesson/lesson.component';
import {CourseListComponent} from './course-list/course-list.component';
import {CourseComponent} from './course/course.component';
import {CourseEditComponent} from './course-edit/course-edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: LandingComponent},
  {path: 'lesson/:lessonName', component: LessonComponent},
  {path: 'lesson', component: LessonComponent},
  {path: 'courses/create', component: CourseEditComponent},
  {path: 'courses/:id', component: CourseComponent},
  {path: 'courses', component: CourseListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

