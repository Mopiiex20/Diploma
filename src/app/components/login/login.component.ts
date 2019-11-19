import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import AuthService from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/common.servise';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  token: string;
  subscription: Subscription;

  constructor(

    private loginService: LoginService,
    private authService: AuthService,
    public jwtHelper: JwtHelperService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.subscription = this.loginService.register$.subscribe(
      loginData => {
        this.logInForm.patchValue({
          username: loginData.email,
          password: loginData.password,
        })
      });

  }

  logInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    const body = this.logInForm.value;
    this.authService.post('login', body).subscribe(
      (data: any) => {
        this.token = data.token;
        let avatar: string = data.avatar;
        localStorage.setItem('token', this.token);
        this.loginService.loginToHeader({ token: this.token, avatar: avatar })
        this.router.navigateByUrl('home')
      },
      (error: any) => {
        this._snackBar.open(error.error.error);
      })
  }

  ngOnInit() {
    let isLoggedIn = this.authService.isAuthenticated();
    if (isLoggedIn) {
      this.router.navigateByUrl('home')
    }
  }

}
