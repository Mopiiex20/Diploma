import { Component, OnInit } from '@angular/core';
import TestService from '../../services/tests.service';
import { TestModel, AnswersWithTest, Questions } from '../../models/test';
import { Router } from '@angular/router';
import { UserService } from '../../services/users.service';
import AuthService from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-beggin-test',
  templateUrl: './beggin-test.component.html',
  styleUrls: ['./beggin-test.component.scss']
})
export class BegginTestComponent implements OnInit {

  subscribeTimer: number;
  selectedAnswers: object = {};
  isTestAvalible: boolean;
  results: TestModel;
  questions: Questions[];

  constructor(
    private testsService: TestService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    public jwtHelper: JwtHelperService,
  ) { }

  valueChange(event, index) {
    this.selectedAnswers[index] = event.value;
  }

  sort(arr) {
    return arr.sort(() => {
      return Math.random() - 0.5;
    });
  }


  async endTest() {
    let data: AnswersWithTest = {
      answers: this.selectedAnswers,
      test: this.results,
    }
    let token = this.authService.getToken();
    const decoded = this.jwtHelper.decodeToken(token);
    let persantage = this.testsService.getRigthAnswers(data);
    await this.userService.put(`${decoded.id}`, { passedTests: persantage, testId: this.results.id }).subscribe(
      (data: any) => {
        this.testsService.endTest()
        if (data.success) {
          this.router.navigate(['/passed-test'], { queryParams: { testId: this.results.id, userId: decoded.id } });
        } else {
          this.router.navigate(['/passed-test'], { queryParams: { message: data.message } });
        }
      }
    );
  }
  
  ngOnInit() {
    this.testsService.get('tests').subscribe((data: Array<TestModel>) => {
      data.forEach(
        (element: TestModel) => {
          if (element.isCurrentlyDoing) {
            this.results = element;
            this.isTestAvalible = true;
            this.subscribeTimer = element.duration * 60;
          }
        }
      )
    });
  }
}
