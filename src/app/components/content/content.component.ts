import { Component, OnInit } from '@angular/core';
import BooksService from '../../services/tests.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import TestService from '../../services/tests.service';
import { CartService } from 'src/app/services/common.servise';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  bookTitle = new FormControl();
  bookForm: FormGroup = this.formBuilder.group({
    bookTitle: this.bookTitle
  })

  results: any[];


  constructor(private formBuilder: FormBuilder, private testsService: TestService, private cartServise: CartService) { }

  ngOnInit() {
    this.searchBook();
    this.testsService.get('tests').subscribe((data: any) => {
      console.log(data);
      
      this.results = data
    });
  }

  addToCart(book: any) {
    this.cartServise.addToCart(book);

  }
  searchBook() {
    this.bookTitle.valueChanges.pipe(
      debounceTime(1000),
      switchMap((title) => {
        console.log(title)
        return this.testsService.searchBook(title);
      })
    ).subscribe(res => this.results = res);
  }


}
