import { Component, OnInit, DoCheck } from '@angular/core';
import TestService from '../../services/tests.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, FormBuilder, RequiredValidator } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { TestModel, Questions } from '../../models/test';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'popUp',
  templateUrl: './cartPopUp.html',
  styleUrls: ['./admin.component.scss']
})
export class CartPopUp implements OnInit, DoCheck {
  constructor(private dialog: MatDialog, private testService: TestService) { }
  testLength: any[] = [
    { value: 15, viewValue: '15 хвилин' },
    { value: 30, viewValue: '30 хвилин' },
    { value: 45, viewValue: '45 хвилин' },
    { value: 60, viewValue: '60 хвилин' },
  ];
  arrayQ: any[] = []
  selected = 1;
  testLengthControl = new FormControl('');
  AddTestForm = new FormGroup({
    title: new FormControl(''),
    questionsQuantity: new FormControl(this.selected)
  });
  Questions = new FormGroup({
  });

  onSubmit() {
    let duration: number = this.testLengthControl.value;
    let questionValues = this.Questions.value;
    let keyNames: Array<string> = Object.keys(questionValues);
    let keyValues: Array<string> = Object.values(questionValues);
    let arrQuestions: Array<Questions> = [];

    for (let index = 0; index < this.selected; index++) {
      keyNames.forEach((name, idx) => {
        if (name === `question${index + 1}`) {
          let currentQuestion: Questions = {
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
    let body: TestModel = {
      duration: duration,
      title: tests.title,
      isCurrentlyDoing: false
    }
    body.questions = arrQuestions;
    this.testService.post('tests', body).subscribe((data: any) => {
    });
    this.dialog.closeAll()
  }

  incrementQuestions() {
    this.selected++
  }

  decrementQuestions() {
    if (this.selected > 1)
      this.selected--
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

  bookTitle = new FormControl();
  bookForm: FormGroup = this.formBuilder.group({
    bookTitle: this.bookTitle
  })

  displayedColumns: string[] = ['Name', 'ID', 'Number', 'Status'];
  results: any;

  constructor(
    private testService: TestService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  setCurrentTest(test: TestModel) {
    let body: TestModel = test;
    if (body.isCurrentlyDoing) {
      body.isCurrentlyDoing = false;
    } else {
      body.isCurrentlyDoing = true;
    }

    this.testService.post('tests/currentTask', body).subscribe((data: any) => {
    });
  }

  ngOnInit() {
    this.searchBook();
    this.testService.get('tests').subscribe((data: any) => {
      this.results = data
    });
  }

  openBottomSheet(): void {
    const dialog = this.dialog.open(CartPopUp, {
      height: "100%",
      width:"80%"
    });
    dialog.afterClosed().subscribe(result => {
      this.testService.get('tests').subscribe((data: any) => {
        this.results = data
      });
    })
  }

  searchBook() {
    this.bookTitle.valueChanges.pipe(
      debounceTime(1000),
      switchMap((title) => {
        return this.testService.searchBook(title);
      })
    ).subscribe(res => this.results = res);
  }
}
