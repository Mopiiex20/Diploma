import { Component, OnInit } from '@angular/core';
import TestService from '../../services/tests.service';
import { CartService } from 'src/app/services/common.servise';
import { TestModel } from '../../models/test'
import { Router } from '@angular/router';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  results: TestModel;
  isTestAvalible: boolean = false;
  testStart: boolean = false;
  constructor(private testsService: TestService, private cartServise: CartService, private router: Router) { }
  ngOnInit() {
    this.testsService.get('tests').subscribe((data: Array<TestModel>) => {
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
  checkForTest() {
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
  begginTest() {
    this.testStart = true
  }
}
