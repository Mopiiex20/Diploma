import { Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs';
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
export class CommonService {

    public httpError = new Subject<string>();

    setError(errorMessage: string) {
        this.httpError.next(errorMessage)
    }



    // Observable string sources
    private loginSource = new Subject<LoginData>();
    // Observable string streams
    login$ = this.loginSource.asObservable();

    loginToHeader(data: LoginData) {
        this.loginSource.next(data);
    }
}
