import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import TestService from '../../services/tests.service';
import { TestModel, Questions } from '../../models/test'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firestore } from 'firebase'
import { MatSidenav } from '@angular/material/sidenav';
import AuthService from 'src/app/services/auth.service';
import { UserModel } from '../../models';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', { static: false }) drawer: MatSidenav;

  public subscription: Subscription[] = [];
  public results: TestModel[] = [];
  public isTestAvalible: boolean = false;
  public testStart: boolean = false;
  public currentTestId: string;
  public sidenavContent: 'access' | 'done' = 'access';
  public loggedUser: UserModel;
  public passedTests: any[] = [];

  constructor(
    private testsService: TestService,
    private router: Router,
    private authService: AuthService,
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
            if (res.isCurrentlyDoing) {
              this.results.push(res);
              this.isTestAvalible = true;
            }
          })
        }
      )
    });

    let sub = this.testsService.start$.subscribe(data => {
      this.testStart = data;
    })
    this.subscription.push(sub)
  }
  ngOnDestroy() {
    this.subscription.forEach(
      sub => sub.unsubscribe()
    )
  }

  ngOnInit() {
    this.testsService.getUserPassedTests().then(
      snapshot => {
        snapshot.forEach(el => {
          el.forEach(
            doc => {
              const test = {
                title: doc.data().title,
                persantage: this.authService.user.passedTests.find(test => test.id == doc.data().id).persantage
              }
              this.passedTests.push(test);
            }
          )
        })
      }
    )
  }

  toggleCloseSideNav = (mode: 'access' | 'done') => {
    this.sidenavContent = mode;
    this.drawer.close();
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
            if (res.isCurrentlyDoing) {
              this.results.push(res);
              this.isTestAvalible = true;
            }
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
