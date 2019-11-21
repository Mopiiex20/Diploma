import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TestModel, AnswersWithTest, Questions } from '../models/test';

@Injectable({
    providedIn: 'root'
})
export default class TestService {
    bookUrl = environment.url;
    constructor(private http: HttpClient) { }

    // Observable string sources
    private answersSource = new Subject<object>();
    private startSource = new Subject<boolean>();
    // Observable string streams
    answers$ = this.answersSource.asObservable();
    start$ = this.startSource.asObservable();

    begginTest() {
        this.startSource.next(true)
    }
    endTest() {
        this.startSource.next(false)
    }

    setAnswers(answers: any, test: TestModel) {
        this.answersSource.next({ answers, test });
    }

    getRigthAnswers(data: AnswersWithTest): number {
        let counter: number = 0;
        data.test.questions.forEach(
            (element: Questions, index: number) => {
                if (data.answers[`q${index}`] == element.answers[0]) {
                    counter++
                }
            }
        )
        return (Math.floor((counter / data.test.questions.length) * 100))
    }



    get(url: string): Observable<any> {
        return this.http.get<any>(`${this.bookUrl}${url}`)
    }

    post(url: string, body: object): Observable<any> {
        return this.http.post<any>(`${this.bookUrl}${url}`, body)
    }

    searchBook(title: string): Observable<any> {
        return this.http.get<any>(this.bookUrl + 'tests/' + title).pipe(
            catchError(err => of(null))
        );
    }
} 