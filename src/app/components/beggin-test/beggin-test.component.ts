import { Component, OnInit } from '@angular/core';
import TestService from 'src/app/services/tests.service';
import { TestModel } from 'src/app/models/test';
import { timer } from 'rxjs';

@Component({
  selector: 'app-beggin-test',
  templateUrl: './beggin-test.component.html',
  styleUrls: ['./beggin-test.component.scss']
})
export class BegginTestComponent implements OnInit {
  subscribeTimer: number;

  constructor(private testsService: TestService) { }
  selectedAnswers: object;
  isTestAvalible: boolean;
  results: TestModel;
  questions: any[];


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
