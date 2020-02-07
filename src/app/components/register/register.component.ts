import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import AuthService from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GroupList } from '../../../assets/shared/groupList.enum'
import { UserModel } from '../../../app/models';
import { CommonService } from '../../../app/services/common.servise';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router,
  ) { }
  groups: any;

  RegisterForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    userGroup: new FormControl('')

  });
  registerNewUser() {
    const form = this.RegisterForm.value;
    const newUser: UserModel = {
      email: form.email,
      firstname: form.firstName,
      lastname: form.lastName,
      password: form.password,
      userGroup: form.userGroup,
    }
    this.authService.register(newUser).subscribe(
      (res) => {
        this.authService.user = res.user;
        localStorage.setItem('token', res.token)
        this.router.navigateByUrl("/");
      },
      (errorResponse: HttpErrorResponse) => {
        this.commonService.setError(errorResponse.error)
      })
  }

  ngOnInit() {
    this.groups = Object.values(GroupList);
  }


}
