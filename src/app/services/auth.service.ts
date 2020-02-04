import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from '../models';
import * as Firebase from 'firebase'

@Injectable()
export default class AuthService {
    providedIn: 'root'
    stUrl = environment.url;

    private currentUserSubject: BehaviorSubject<UserModel>;

    constructor(
        private http: HttpClient,
        public jwtHelper: JwtHelperService,

    ) {
        const authData = this.getUserFromStorage();
        this.currentUserSubject = new BehaviorSubject<any>(authData);
    }

    private getUserFromStorage(): UserModel {
        const token = localStorage.getItem('user');
        const userData = JSON.parse(token);
        return !userData ? null : userData;
    }

    public isAuthenticated(): boolean {
        if (this.user) {
            return true
        }
        return false;
    }

    public isAdmin(): boolean {
        if (this.user.role == 'admin') {
            return true
        }
        return false;
    }

    public get user(): UserModel {
        return this.currentUserSubject.value;
    }

    public set user(authData: UserModel) {
        this.currentUserSubject.next(authData);
    }

    auth(email: string, password: string): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                Firebase.firestore().collection('users').where('username', '==', email).get().then(
                    user => {
                        user.forEach(
                            us => {
                                if (us.data().password === password) {
                                    this.user = us.data() as UserModel;
                                    localStorage.setItem('user', JSON.stringify(us.data()))
                                    resolve(true)
                                } else {
                                    resolve(false)
                                }
                            }
                        )
                    }
                )
            }
        )
    }

    getAvatar(url: string, body: any): Observable<any> {
        return this.http.post<any>(`${this.stUrl}${url}`, body)
    }

    get(url: string): Observable<any> {
        return this.http.get<any>(`${this.stUrl}${url}`)
    }

    getToken() {
        return localStorage.getItem("token");
    }
}
