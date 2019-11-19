import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
    providedIn: 'root'
    stUrl = environment.url;
    constructor(private http: HttpClient) { }

    get(url?: string): Observable<any> {
        return this.http.get<any>(`${this.stUrl}users/${url}`)
    }

    post(url: string, body: any): Observable<any> {
        return this.http.post<any>(`${this.stUrl}users/${url}`, body)
    }

    put(url: string, body: any): Observable<any> {
        return this.http.put<any>(`${this.stUrl}users/${url}`, body)
    }
}