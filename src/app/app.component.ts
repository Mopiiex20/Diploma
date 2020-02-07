import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from './services/common.servise';
import { UserService } from './services/users.service';
import AuthService from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private _snackBar: MatSnackBar,
    private commonService: CommonService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    if (localStorage.getItem('token')) {
      this.userService.get().subscribe(
        data => this.authService.user = data
      )

    }
    this.commonService.httpError.asObservable().subscribe(
      (errorMessage: string) => {
        this._snackBar.open(errorMessage)
      }
    )
  }
}
