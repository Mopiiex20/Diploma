import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import * as Firebase from 'firebase'

@Injectable()
export class UserService {
    providedIn: 'root'
    constructor(private http: HttpClient) { }

    get(id: string) {
       return Firebase.firestore().collection('users').doc(id).get()
    }

    post(url: string, body: any) {
        Firebase.firestore().collection('users').add(body)
    }

    async postAvatar(id: string, body: any) {
        const avatar = await (await Firebase.storage().ref(`avatars/${body.file.name}`).putString(body.avatar, 'data_url')).ref.getDownloadURL();
        Firebase.firestore().collection('users').doc(id).update({ avatar: avatar });
        return avatar
    }

    update(id: string, body: any) {
        Firebase.firestore().collection('users').doc(id).update(body)
    }

    delete(id: string): Observable<any> {
        return this.http.delete<any>(`${environment.url}users/${id}`)
    }

}