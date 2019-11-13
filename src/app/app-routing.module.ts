import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import {
  AuthGuardService as AuthGuard
} from './services/auth-guard-service';
import {
  AdminGuardService as AdminGuard
} from './services/admin-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { BegginTestComponent } from './components/beggin-test/beggin-test.component';

const routes: Routes = [
  { path: 'home', component: ContentComponent },
  { path: 'signup', component: RegisterComponent },
  { path: '', component: LoginComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AdminGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
