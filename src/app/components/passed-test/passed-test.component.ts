import { Component, OnInit, AfterViewInit } from '@angular/core';
import TestService from '../../../app/services/tests.service';
import { Subscription } from 'rxjs';
import { TestModel, AnswersWithTest } from '../../../app/models/test';
import { ActivatedRoute } from '@angular/router';
import AuthService from '../../../app/services/auth.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-passed-test',
  templateUrl: './passed-test.component.html',
  styleUrls: ['./passed-test.component.scss']
})
export class PassedTestComponent implements OnInit {

  subscription: Subscription;
  public persantage: number;
  public numberOfQuestions: number;
  public tests: any;
  public id: any;
  public errorMessage: string = '';
  public error: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) {

  }

  ngOnInit() {
    this.router.queryParams.subscribe(
      data => {
        if (data.message) {
          this.error = true;
          this.errorMessage = data.message;
        } else {
          this.id = data.testId
          // this.userService.get().then(
          //   snap => {
          //     let passed = snap.data();
          //     passed.passedTests.forEach(
          //       test => {
          //         if (test.id == data.testId) {
          //           this.persantage = test.persantage
          //         }
          //       }
          //     )

          //   }
          // )
        }
      }
    )
  }

}
