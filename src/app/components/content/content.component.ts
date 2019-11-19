import { Component, OnInit, OnDestroy } from '@angular/core';
import TestService from '../../services/tests.service';
import { TestModel } from '../../models/test'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public results: TestModel;
  public isTestAvalible: boolean = false;
  public testStart: boolean = false;

  constructor(private testsService: TestService, private router: Router) {
    this.subscription = this.testsService.get('tests').subscribe((data: Array<TestModel>) => {
      data.forEach(
        (element: TestModel) => {
          if (element.isCurrentlyDoing) {
            this.results = element;
            this.isTestAvalible = true
          }
        }
      )
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  ngOnInit() {

  }

  checkForTest(): void {
    this.testsService.get('tests').subscribe((data: Array<TestModel>) => {
      data.forEach(
        (element: TestModel) => {
          if (element.isCurrentlyDoing) {
            this.results = element;
            this.isTestAvalible = true
          }
        })
    });
  }

  begginTest(): void {
    this.testStart = true;
    this.testsService.begginTest();
  }
}
