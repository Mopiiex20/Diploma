import { Component, OnInit, AfterViewInit } from '@angular/core';
import TestService from '../../../app/services/tests.service';
import { Subscription } from 'rxjs';
import { TestModel, AnswersWithTest } from '../../../app/models/test';
import { ActivatedRoute } from '@angular/router';
import AuthService from '../../../app/services/auth.service';

@Component({
  selector: 'app-passed-test',
  templateUrl: './passed-test.component.html',
  styleUrls: ['./passed-test.component.css']
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
    private authService: AuthService
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
          this.authService.get(`users/${data.userId}`).subscribe(
            res => {
              this.tests = res.data.passedTests;
              this.tests.forEach(element => {
                if (element.id == this.id) {
                  this.persantage = element.mark;
                }
              });
            }
          )
        }
      }
    )
  }

}
