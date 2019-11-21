import { Component, OnInit } from '@angular/core';
import TestService from '../../services/tests.service';
import { TestModel, AnswersWithTest, Questions } from '../../models/test';
import { Router } from '@angular/router';
import { UserService } from '../../services/users.service';
import AuthService from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-beggin-test',
  templateUrl: './beggin-test.component.html',
  styleUrls: ['./beggin-test.component.scss']
})
export class BegginTestComponent implements OnInit {

  subscribeTimer: number = 0;
  selectedAnswers: object = {};
  isTestAvalible: boolean;
  results: TestModel;
  questions: TestModel;

  constructor(
    private _snackBar: MatSnackBar,
    private testsService: TestService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    public jwtHelper: JwtHelperService,
  ) { }

  valueChange(event, index) {
    this.selectedAnswers[`q${index}`] = event.value;
  }

  sort(arr) {
    return arr.sort(() => {
      return Math.random() - 0.5;
    });
  }

  async endTest() {
    let data: AnswersWithTest = {
      answers: this.selectedAnswers,
      test: this.questions
    }
    let token = this.authService.getToken();
    const decoded = this.jwtHelper.decodeToken(token);
    let persantage = this.testsService.getRigthAnswers(data);
    await this.userService.put(`${decoded.id}`, { passedTests: persantage, testId: this.results.id }).subscribe(
      (data: any) => {
        if (data.success) {
          this.testsService.endTest();
          this.router.navigate(['/passed-test'], { queryParams: { testId: this.results.id, userId: decoded.id } });
        } else {
          this._snackBar.open(data.message)
          this.testsService.endTest();
        }
      }
    );
  }

  ngOnInit() {
    this.testsService.get('tests').subscribe((data: Array<TestModel>) => {
      data.forEach(
        (element: TestModel) => {
          if (element.isCurrentlyDoing) {
            this.questions = element
            this.results = element;
            this.isTestAvalible = true;
            this.subscribeTimer = element.duration * 60;
            this.results.questions.forEach((question => {
              this.sort(question.answers)
            }))
          }
        }
      )
    });
  }
}
