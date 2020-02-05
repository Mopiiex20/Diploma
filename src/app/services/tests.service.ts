import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TestModel, AnswersWithTest, Questions } from '../models/test';
import * as Firebase from 'firebase';
import { firestore } from 'firebase'
import AuthService from './auth.service';

@Injectable({
    providedIn: 'root'
})
export default class TestService {
    apiUrl = environment.url;
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {
        let firebaseConfig = {
            apiKey: "AIzaSyALIPOgmPPTkWE4z7BcauoLKWlsroaGMRE",
            authDomain: "test-a1f9d.firebaseapp.com",
            databaseURL: "https://test-a1f9d.firebaseio.com",
            projectId: "test-a1f9d",
            storageBucket: "test-a1f9d.appspot.com",
            messagingSenderId: "663598801402",
            appId: "1:663598801402:web:ef618771c12051cf8f0443"
        };
        // Initialize Firebase
        Firebase.initializeApp(firebaseConfig);
    }

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
        data.test.forEach(
            (element: Questions, index: number) => {
                if (data.answers[`q${index}`] == element.answers[0]) {
                    counter++
                }
            }
        )
        return (Math.floor((counter / data.test.length) * 100))
    }

    get(collection: string, doc?: string): Promise<any> {
        if (!doc) {
            return Firebase.firestore().collection(collection).get();
        } else {
            return Firebase.firestore().collection(collection).doc(doc).get();
        }
    }

    updateTest(data) {
        Firebase.firestore().collection('test').doc(data.id).update({ isCurrentlyDoing: data.isCurrentlyDoing });
    }

    getUserPassedTests() {
        const testsPromises = this.authService.user.passedTests.map(el => {
            return Firebase.firestore().collection('test').where("id", '==', el.id).get()
        })
        // Wait for all the async requests mapped into 
        // the array to complete
        return Promise.all(testsPromises)
    }

    addNewTest(data: any, questions: any[]) {
        Firebase.firestore().collection('test').add(data).then(
            res => {
                let id = res.id;
                questions.forEach(
                    doc => {
                        Firebase.firestore().collection('test').doc(id).collection('questions').add(doc)
                    }
                )
                Firebase.firestore().collection('test').doc(id).update({ id: id })
            }
        )
    }

    post(url: string, body: object): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}${url}`, body)
    }

    searchBook(title: string): Observable<any> {
        return this.http.get<any>(this.apiUrl + 'tests/' + title).pipe(
            catchError(err => of(null))
        );
    }
} 