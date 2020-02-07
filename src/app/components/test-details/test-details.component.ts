import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import AuthService from '../../services/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import TestService from 'src/app/services/tests.service';
import { UserService } from 'src/app/services/users.service';
import { UserModel } from 'src/app/models';

@Component({
  selector: 'test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss']
})

export class TestDetails implements OnInit {

  users: any[] = [];

  constructor(
    private router: ActivatedRoute,
    private usersService: UserService,
  ) {

  }

  ngOnInit() {
    this.router.params.subscribe(data => {
      let id = data.id;
     


    })

  }

}
