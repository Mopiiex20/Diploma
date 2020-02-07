import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import AuthService from '../../services/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../app/services/common.servise';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  token: string;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    public jwtHelper: JwtHelperService,
    private router: Router,
    private commonService: CommonService

  ) {
  }

  logInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  async onSubmit() {
    const body = this.logInForm.value;
    this.authService.login(body.username, body.password).subscribe(
      data => {
        this.authService.user = data.user;
        localStorage.setItem('token', data.token)
        this.router.navigateByUrl('home');
      },
      error => {
        this.commonService.setError(error.error)
      }
    )

  }

  ngOnInit() {
    let isLoggedIn = this.authService.isAuthenticated();
    if (isLoggedIn) {
      this.router.navigateByUrl('home')
    }
  }

}
