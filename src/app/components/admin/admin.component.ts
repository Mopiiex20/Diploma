import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import TestService from '../../services/tests.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

interface RequestBody {
  id ?: number;
  title: string;
  questions?: any;
  isCurrentlyDoing: boolean;
}

@Component({
  selector: 'popUp',
  templateUrl: './cartPopUp.html',
})
export class CartPopUp implements OnInit, DoCheck {
  constructor(private _bottomSheet: MatBottomSheet, private testService: TestService) { }
  arrayQ: any[] = []
  ques_num: any[] = [
    { value: 5, viewValue: '5' },
    { value: 6, viewValue: '6' },
    { value: 7, viewValue: '7' }
  ];
  selected = 0;
  AddTestForm = new FormGroup({
    title: new FormControl('')
  });
  Questions = new FormGroup({
  });

  onSubmit() {
    let questionValues = this.Questions.value;
    let keyNames = Object.keys(questionValues);
    let keyValues = Object.values(questionValues);
    let arrQuestions = []

    for (let index = 0; index < this.selected; index++) {
      keyNames.forEach((name, idx) => {
        if (name === `question${index + 1}`) {
          let currentQuestion = {
            title: keyValues[idx],
            answer1: keyValues[idx + 1],
            answer2: keyValues[idx + 2],
            answer3: keyValues[idx + 3],
            answer4: keyValues[idx + 4],
          }
          arrQuestions.push(currentQuestion)
        }
      })
    }

    let tests = this.AddTestForm.value
    let body: RequestBody = {
      title: tests.title,
      isCurrentlyDoing: false
    }
    body.questions = arrQuestions;
    this.testService.post('tests', body).subscribe((data: any) => {
    });
    this._bottomSheet.dismiss()
  }
  ngDoCheck() {
    if (this.selected !== 0) {
      const arr = [];
      for (let index = 0; index < this.selected; index++) {
        this.Questions.addControl(`question${index + 1}`, new FormControl(''));
        this.Questions.addControl(`question${index + 1}Answer1`, new FormControl(''))
        this.Questions.addControl(`question${index + 1}Answer2`, new FormControl(''))
        this.Questions.addControl(`question${index + 1}Answer3`, new FormControl(''))
        this.Questions.addControl(`question${index + 1}Answer4`, new FormControl(''))
        arr.push(index)
      }
      this.arrayQ = arr
    }
  }

  ngOnInit() {
  }
}

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'ID', 'Number', 'Status'];
  results: any;

  constructor(private testService: TestService, private _bottomSheet: MatBottomSheet) { }

  setCurrentTest(id) {
    


  }

  ngOnInit() {
    this.testService.get('tests').subscribe((data: any) => {
      console.log(data);
      this.results = data
    });
  }
  openBottomSheet(): void {
    const dialog = this._bottomSheet.open(CartPopUp);
    dialog.afterDismissed().subscribe(result => {
      this.testService.get('tests').subscribe((data: any) => {
        console.log(data);
        this.results = data
      });
    })
  }
}
