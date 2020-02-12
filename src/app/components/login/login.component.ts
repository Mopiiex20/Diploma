import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import AuthService from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  logInForm = new FormGroup({
    password: new FormControl(''),
  });


  async onSubmit() {
    const { password } = this.logInForm.value;
    if (password.toLowerCase() == 'капусик') {
      localStorage.setItem('token', 'done')
      this.router.navigateByUrl('home');
    } else {
      this._snackBar.open('Неверный пароль!');
    }
  }

  ngOnInit() {
  }

}
