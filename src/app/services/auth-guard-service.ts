import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import AuthService from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthService, public router: Router) { }

    canActivate(): boolean {
        if (!localStorage.getItem('token')) {
            this.router.navigateByUrl("login");
            return false;
        }
        return true;
    }
}