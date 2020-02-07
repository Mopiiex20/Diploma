import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models';
import { UserType } from '../shared/enums';

@Injectable()
export default class AuthService {
    providedIn: 'root'
    stUrl = environment.url;

    private currentUserSubject: BehaviorSubject<UserModel>;

    constructor(
        private http: HttpClient,
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
        if (this.user || localStorage.getItem('token')) {
            return true
        }
        return false;
    }

    public isAdmin(): boolean {
        if (this.user.userType == UserType.Admin) {
            return true;
        }
        return false;
    }

    public get user(): UserModel {
        return this.currentUserSubject.value;
    }

    public set user(authData: UserModel) {
        this.currentUserSubject.next(authData);
    }

    // auth(email: string, password: string): Promise<any> {
    //     return new Promise(
    //         (resolve, reject) => {
    //             Firebase.firestore().collection('users').where('username', '==', email).get().then(
    //                 user => {
    //                     user.forEach(
    //                         us => {
    //                             if (us.data().password === password) {
    //                                 this.user = us.data() as UserModel;
    //                                 localStorage.setItem('user', JSON.stringify(us.data()))
    //                                 resolve(true)
    //                             } else {
    //                                 resolve(false)
    //                             }
    //                         }
    //                     )
    //                 }
    //             )
    //         }
    //     )
    // }


    // register(newUser: UserModel): Promise<any> {
    //     return new Promise(
    //         (resolve, reject) => {
    //             let userToRegister = newUser;
    //             Firebase.firestore().collection('users').add(newUser).then(
    //                 user => {
    //                     userToRegister.id = user.id;
    //                     user.update(userToRegister);
    //                     resolve(user.get());
    //                 }
    //             ).catch(error => {
    //                 reject(error.message)
    //             })
    //         }
    //     )
    // }

    login(email: string, password: string): Observable<{ token: string, user: any }> {
        return this.http.post<any>(`${this.stUrl}auth/login`, { email, password })
    }


    register(newUser: UserModel): Observable<{ token: string, user: any }> {
        return this.http.post<{ token: string, user: any }>(`${this.stUrl}auth/register`, newUser)
    }

    getAvatar(url: string, body: any): Observable<any> {
        return this.http.post<any>(`${this.stUrl}${url}`, body)
    }

    get(): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                this.http.get<{ user: UserModel }>(`${this.stUrl}users`).subscribe(
                    data => {
                        this.user = data.user
                        resolve()
                    }
                )
            }
        )
    }

    getToken() {
        return localStorage.getItem("token");
    }
}
