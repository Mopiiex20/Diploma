import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import AuthService from '../../services/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/common.servise';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  token: string;
  subscription: Subscription;
  provider = new firebase.auth.GoogleAuthProvider();
  constructor(
    private authService: AuthService,
    public jwtHelper: JwtHelperService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  logInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  getAuthWithGoosle() {
    firebase.auth().signInWithPopup(this.provider).then(
      data => {
        debugger
      }
    )
  }

  async onSubmit() {
    const body = this.logInForm.value;
    const res = await this.authService.auth(body.username, body.password);
    if (res) {
      this.router.navigateByUrl('home');
    } else {
      this._snackBar.open('Невірна авторизація');
    }
  }

  ngOnInit() {
    let isLoggedIn = this.authService.isAuthenticated();
    if (isLoggedIn) {
      this.router.navigateByUrl('home')
    }
  }

}
