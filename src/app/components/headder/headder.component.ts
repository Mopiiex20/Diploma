import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import AuthService from '../../services/auth.service';

import { LoginService, LoginData } from '../../services/common.servise';

import { Subscription } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatSnackBar } from '@angular/material/snack-bar';
import TestService from 'src/app/services/tests.service';

@Component({
  selector: 'app-headder',
  templateUrl: './headder.component.html',
  styleUrls: ['./headder.component.scss']
})
export class HeadderComponent implements OnInit {

  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;

  loginWelcome: string;
  avatar: string;
  token: string;
  cartBadge: number;
  public isTestStarted: boolean;
  check: boolean = false;
  admin: boolean = false;
  subscription: Subscription;
  subscription1: Subscription;

  subCart: Subscription;


  logInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    public jwtHelper: JwtHelperService,
    private _snackBar: MatSnackBar,
    public testService: TestService
  ) {
    this.subscription = this.loginService.login$.subscribe(
      (data: LoginData) => {
        if (data) {
          if (this.authService.isAdmin()) {
            this.admin = true
          }
          const decoded = this.jwtHelper.decodeToken(data.token);
          this.check = true;
          this.avatar = `url("${data.avatar}")`;
          this.loginWelcome = `Доброго дня - ${decoded.firstName} !`;
        } else {
          this.check = false;
        }
      });
    this.subscription1 = this.testService.start$.subscribe(data => {
      this.isTestStarted = data;

    })
  }

  logout() {
    this.trigger.openMenu();
    localStorage.clear();
    this.avatar = ``;
    this.loginWelcome = ``;
    this.check = false;
    this.admin = false;
  }

  ngOnInit() {
    const token = this.authService.getToken()
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      this.authService.getAvatar('getAvatar', { id: decoded.id }).subscribe(data => {
        this.loginService.loginToHeader({ token: token, avatar: data.avatar })
        if (this.authService.isAdmin()) {
          this.admin = true
        }
      })
    }
  }
}