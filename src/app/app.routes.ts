import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/signInSignUp/login/login.component';
import {RegisterComponent} from './components/signInSignUp/register/register.component';
import {ResetPasswordComponent} from './components/signInSignUp/reset-password/reset-password.component';
import {ForgotPasswordComponent} from './components/signInSignUp/forgot-password/forgot-password.component';
import {MenuBarComponent} from './components/signInSignUp/menu-bar/menu-bar.component';
import {PupilDashboardComponent} from './components/dashboard/pupil-dashboard/pupil-dashboard.component';
import {TeacherDashboardComponent} from './components/dashboard/teacher-dashboard/teacher-dashboard.component';
import {AdminDashboardComponent} from './components/dashboard/admin-dashboard/admin-dashboard.component';
import {ClassesComponent} from './components/dashboard/pupil-dashboard/classes/classes.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'dashboard', component: MenuBarComponent},
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'admin/:section', component: AdminDashboardComponent },
  { path: 'teacher', component: TeacherDashboardComponent },
  { path: 'teacher/:section', component: TeacherDashboardComponent },
  { path: 'pupil', component: PupilDashboardComponent },
  { path: 'pupil/classes', component: ClassesComponent },
  { path: 'pupil/:section', component: PupilDashboardComponent },
  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
