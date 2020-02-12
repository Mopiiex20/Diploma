import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from './services/auth-guard-service';
import {
  LoginGuardService as LOginGuard
} from './services/admin-guard.service';
import { LoginComponent } from './components/login/login.component';
import { BegginTestComponent } from './components/beggin-test/beggin-test.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LOginGuard] },
  { path: 'home', component: BegginTestComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
