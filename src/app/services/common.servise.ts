import { Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { UserInfo } from 'firebase';
import { UserModel } from '../models';



interface LoginRequest {
    email: string;
    password: string
}

export interface LoginData {
    user: UserModel,
    avatar: string
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    // Observable string sources
    private registerSource = new Subject<LoginRequest>();
    private loginSource = new Subject<LoginData>();
    // Observable string streams
    register$ = this.registerSource.asObservable();
    login$ = this.loginSource.asObservable();

    loginToHeader(data: LoginData) {
        this.loginSource.next(data);
    }

    registerToLogin(loginData: any) {
        this.registerSource.next(loginData);
    }
}
