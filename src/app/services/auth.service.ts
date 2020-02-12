import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models';
import * as Firebase from 'firebase';

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
            async (resolve, reject) => {
                Firebase.firestore().collection('users').where('username', '==', email).get().then(
                    user => {
                        user.forEach(
                            us => {
                                
                            }
                        )
                    }
                )
            }
        )
    }

    loginWithGoogle(googleData: any): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                Firebase.firestore().collection('users').where('email', '==', googleData.user.email).get().then(
                    snapshot => {
                        if (snapshot.empty) {
                            const googleUser = {
                                socialProvided: true,
                                email: googleData.user.email,
                                firstname: googleData.user.displayName,
                                avatar: googleData.user.photoURL
                            }
                            Firebase.firestore().collection('users').add(googleUser)
                            localStorage.setItem('user', JSON.stringify(googleUser));
                            resolve(googleUser)
                        } else {
                            snapshot.forEach(user => {
                                localStorage.setItem('user', JSON.stringify(user.data()));
                                resolve(user.data())
                            })
                        }
                        // snapshot.forEach(
                        //     us => {
                        //         if (us.data().password) {
                        //             this.user = us.data() as UserModel;
                        //             localStorage.setItem('user', JSON.stringify(us.data()))
                        //             resolve(true)
                        //         } else {
                        //             resolve(false)
                        //         }
                        //     }
                        // )
                    }
                )
            }
        )
    }


    register(newUser: UserModel): Promise<any> {
        return new Promise(
            async (resolve, reject) => {
                Firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then(
                    res => {
                        debugger
                        let userToRegister = newUser;
                        Firebase.firestore().collection('users').add(userToRegister).then(
                            user => {
                                userToRegister.id = user.id;
                                user.update(userToRegister);
                                delete userToRegister.password;
                                this.user = userToRegister;
                                res.user.getIdToken().then(
                                    token => {
                                        localStorage.setItem('token', JSON.stringify(token));
                                        resolve(userToRegister);
                                    }
                                )
                            }
                        ).catch(error => {
                            reject(error.message)
                        })
                    }
                ).catch(
                    error => {
                        reject(error)
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
