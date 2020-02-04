import { Component, OnInit, Input } from '@angular/core';
import TestService from '../../services/tests.service';
import { TestModel, AnswersWithTest, Questions } from '../../models/test';
import { Router } from '@angular/router';
import { UserService } from '../../services/users.service';
import AuthService from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firestore } from 'firebase';

@Component({
  selector: 'app-beggin-test',
  templateUrl: './beggin-test.component.html',
  styleUrls: ['./beggin-test.component.scss']
})
export class BegginTestComponent implements OnInit {

  @Input() testId: string

  subscribeTimer: number = 0;
  selectedAnswers: object = {};
  results: TestModel;
  questions: Questions[];
  loading: boolean = true;

  constructor(
    private _snackBar: MatSnackBar,
    private testsService: TestService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    public jwtHelper: JwtHelperService,
  ) {
    if (this.subscribeTimer === 0) {
      this.endTest();
    }
  }

  valueChange(event, index) {
    this.selectedAnswers[`q${index}`] = event.value;
  }

  sort(arr) {
    return arr.sort(() => {
      return Math.random() - 0.5;
    });
  }

  endTest() {
    let answersR: Questions[] = [];
    this.testsService.get('tests', this.testId).then((snapshot: firestore.DocumentSnapshot) => {
      snapshot.ref.collection('questions').get().then(_snap => {
        _snap.forEach(el => {
          answersR.push(el.data() as Questions);
        })
        let data: AnswersWithTest = {
          answers: this.selectedAnswers,
          test: answersR
        }
        let persantage = this.testsService.getRigthAnswers(data);
        this.userService.update('0INV1oOxCs675jTpqQ7B', { passedTests: { persantage, id: this.results.id } })
        this.testsService.endTest();
        this.router.navigate(['/passed-test'], { queryParams: { testId: this.results.id, userId: this.authService.user.id } });
        
        this.testsService.endTest();

      })
    });

  }

  ngOnInit() {
    console.log(this.testId);
    this.testsService.get('test').then((data: firestore.QuerySnapshot) => {
      data.forEach(
        element => {
          if (element.id == this.testId) {
            let res = element.data() as TestModel;
            element.ref.collection('questions').get().then(data => {
              let questions: Questions[] = [];
              data.forEach(el => {
                questions.push(el.data() as Questions)
              })
              this.subscribeTimer = element.data().duration * 60;
              res.questions = questions;
              res.questions.forEach((question => {
                this.sort(question.answers)
              }))
              this.results = res;
              this.loading = false;
            })
          }
        }
      )
    });

    // this.testsService.get('tests').then((data: Array<TestModel>) => {
    //   data.forEach(
    //     (element: TestModel) => {
    //       if (element.isCurrentlyDoing) {
    //         this.results = element;
    //         this.subscribeTimer = element.duration * 60;
    //         this.results.questions.forEach((question => {
    //           this.sort(question.answers)
    //         }))
    //       }
    //     }
    //   )
    // });
  }
}
