import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import TestService from '../../services/tests.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'popUp',
  templateUrl: './cartPopUp.html',
})
export class CartPopUp implements OnInit, DoCheck {

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

  selectQ() {
    console.log('sfsddss');

  }


  onSubmit() {
    const body = this.AddTestForm.value;
    console.log(this.ques_num);

  }
  ngDoCheck() {
    if (this.selected !== 0) {
      console.log(this.Questions.value);

      let del = Object.values(this.Questions.value);
      for (let index = 0; index < del.length; index++) {
        this.Questions.removeControl(`${index}`)
      }
      const arr = [];
      for (let index = 0; index < this.selected; index++) {
        this.Questions.addControl(`${index}`, new FormControl(''));
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
  displayedColumns: string[] = ['Name', 'ID', 'Number'];
  results: any;

  constructor(private testService: TestService, private _bottomSheet: MatBottomSheet) { }


  ngOnInit() {
    this.testService.get('tests').subscribe((data: any) => {
      console.log(data);

      this.results = data
    });
  }
  openBottomSheet(): void {
    this._bottomSheet.open(CartPopUp);
  }


}
