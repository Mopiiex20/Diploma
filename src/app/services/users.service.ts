import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import * as Firebase from 'firebase'

@Injectable()
export class UserService {
    providedIn: 'root'
    constructor(private http: HttpClient) { }

    get(url?: string): Observable<any> {
        return this.http.get<any>(`${environment.url}users/${url}`)
    }

    post(url: string, body: any) {
        Firebase.firestore().collection('users').add(body)
    }

    update(id: string, body: any) {
        Firebase.firestore().collection('users').doc(id).update(body)
    }

    delete(id: string): Observable<any> {
        return this.http.delete<any>(`${environment.url}users/${id}`)
    }

}