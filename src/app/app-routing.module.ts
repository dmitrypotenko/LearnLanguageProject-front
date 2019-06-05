import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LandingComponent} from './landing/landing.component';
import {CourseComponent} from './course/course.component';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'welcome', component: LandingComponent},
  {path: 'course/:courseName', component: CourseComponent},
  {path: 'course', component: CourseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

