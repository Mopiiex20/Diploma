import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import AuthService from './auth.service';

@Injectable()
export class LoginGuardService implements CanActivate {

    constructor(public auth: AuthService, public router: Router) { }

    canActivate(): boolean {
        if (localStorage.getItem('token')) {
            this.router.navigateByUrl("home");
            return false;
        }
        return true;
    }
}