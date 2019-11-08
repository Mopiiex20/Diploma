import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import AuthService from '../../services/auth.service';


import { LoginService, CartService, Book } from '../../services/common.servise';

import { Subscription } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-headder',
  templateUrl: './headder.component.html',
  styleUrls: ['./headder.component.scss']
})
export class HeadderComponent implements OnInit, DoCheck {

  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;


  loginWelcome: string;
  avatar: string;
  token: string;
  cartBadge: number;

  check: boolean = false;
  subscription: Subscription;
  subCart: Subscription;


  logInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    public jwtHelper: JwtHelperService,
    private cartService: CartService,
    private _snackBar: MatSnackBar,
   

  ) {

    let a = JSON.parse(localStorage.getItem('login'))
    if (a) {
      this.check = a.isLoggedIn
    }
    this.subscription = this.loginService.register$.subscribe(
      loginData => {
        this.logInForm.patchValue({
          username: loginData.email,
          password: loginData.password,
        })
      });
  }

  

  logout() {
    this.trigger.openMenu();
    localStorage.clear()
    this.check = !this.check
    this.cartBadge = undefined;
  }

  onSubmit() {

    const body = this.logInForm.value;
    this.authService.post('login', body).subscribe(
      (data: any) => {
      this.token = data.token;
      localStorage.setItem('token', this.token);
      this.check = true;
    },
    (error: any) => {      
      this._snackBar.open(error.error.error);
    })
  }

  ngDoCheck() {
    if (this.check) {
      const token = this.authService.getToken()
      const decoded = this.jwtHelper.decodeToken(token);

      this.avatar = `url("${decoded.avatar}")`;
      this.loginWelcome = `Welcome - ${decoded.firstName} !`;

    }

  }

  ngOnInit() {
    const token = this.authService.getToken()
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      this.avatar = `url("${decoded.avatar}")`;
      this.check = true;
      this.loginWelcome = `Welcome  - ${decoded.firstName} !`;
      const currentBooks: any[] = JSON.parse(localStorage.getItem('books'));
      if (currentBooks) {
        let num = 0;
        currentBooks.forEach((book: any) => {
          num += book.quantity;
          this.cartBadge = num;
        });
      }
    }
  }
}