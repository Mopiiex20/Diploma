import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import AuthService from './auth.service';

@Injectable()
export class CustomHttpInterceptorService implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token')
        request = request.clone({
            setHeaders: {
                'token': token ? token : '',
                'Content-Type': 'application/json'
            }
        });
        return next.handle(request);

    }

}