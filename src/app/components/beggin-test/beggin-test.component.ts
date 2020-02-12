import { Component, OnInit } from '@angular/core';
import TestService from '../../services/tests.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/users.service';
import AuthService from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-beggin-test',
  templateUrl: './beggin-test.component.html',
  styleUrls: ['./beggin-test.component.scss']
})
export class BegginTestComponent implements OnInit {


  mockData = ['1', '2', '3']

  constructor(
    private _snackBar: MatSnackBar,
    private testsService: TestService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
  ) {

  }

  ngOnInit() {


  }
}
