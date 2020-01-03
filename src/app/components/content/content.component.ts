import { Component, OnInit, OnDestroy } from '@angular/core';
import TestService from '../../services/tests.service';
import { TestModel, Questions } from '../../models/test'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firestore } from 'firebase'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public subscription: Subscription;
  public results: TestModel[] = [];
  public isTestAvalible: boolean = false;
  public testStart: boolean = false;
  public currentTestId: string;

  constructor(
    private testsService: TestService,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar,
  ) {
    this.testsService.get('test').then((data: firestore.QuerySnapshot) => {
      data.forEach(
        element => {
          let res = element.data() as TestModel;
          element.ref.collection('questions').get().then(data => {
            let questions: Questions[] = [];
            data.forEach(el => {
              questions.push(el.data() as Questions)
            })
            res.questions = questions;
            this.results.push(res);
            this.isTestAvalible = true;
          })
        }
      )
    });
  }

  ngOnInit() {
  }

  checkForTest(): void {
    this.testsService.get('test').then((data: firestore.QuerySnapshot) => {
      data.forEach(
        element => {
          let res = element.data() as TestModel;
          element.ref.collection('questions').get().then(data => {
            let questions: Questions[] = [];
            data.forEach(el => {
              questions.push(el.data() as Questions)
            })
            res.questions = questions;
            this.results.push(res);
            this.isTestAvalible = true;
          })
        }
      )
    });
  }

  begginTest(id: string): void {
    this.currentTestId = id;
    // if (data.testAvailable) {
    this.testStart = true;
    this.testsService.begginTest();
    // } else {
    //   this._snackBar.open(`Ви вже склали цей тест з оцінкою ${data.mark} баллів !`)
    // }

  }
}
