import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import AuthService from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../services/common.servise';
import { GroupList } from '../../../assets/shared/groupList.enum'

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) { }
  groups: any;

  RegisterForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    userGroup: new FormControl('')

  });
  registerNewUser() {
    const form = this.RegisterForm.value;

    // this.authService.post('users/signup', form).subscribe(
    //   (data: any) => {
    //     const loginData = {
    //       email: form.email,
    //       password: form.password
    //     }
    //     this.loginService.registerToLogin(loginData)
    //     this.router.navigateByUrl("/");
    //   },
    //   (error: any) => {
    //     this._snackBar.open(error.error.message);
    //   }

    // );
  }
  ngOnInit() {
    this.groups = Object.values(GroupList);
  }


}
