import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import AuthService from '../../services/auth.service';

import { LoginData } from '../../services/common.servise';

import { Subscription } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatSnackBar } from '@angular/material/snack-bar';
import TestService from 'src/app/services/tests.service';
import '../../../assets/shared/images/bg-image.png'
import { TranslateService } from '@ngx-translate/core';
import { UserType } from 'src/app/shared/enums';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-headder',
  templateUrl: './headder.component.html',
  styleUrls: ['./headder.component.scss']
})
export class HeadderComponent implements OnInit {

  @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;

  loginWelcome: string;
  avatar: any = " url('../../../assets/shared/images/bg-image.png')"
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
    private authService: AuthService,
    public jwtHelper: JwtHelperService,
    public testService: TestService
  ) {
    this.subscription1 = this.testService.start$.subscribe(data => {
      this.isTestStarted = data;
    })
  }

  logout() {
    this.authService.user = undefined;
    this.trigger.openMenu();
    localStorage.clear();
    this.avatar = ``;
    this.loginWelcome = ``;
    this.check = false;
    this.admin = false;
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.check = true;
      if (this.authService.user.userType === UserType.Admin) {
        this.admin = true
      }
    }
  }
}