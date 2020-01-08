import { Component, OnInit, OnDestroy } from '@angular/core';
import AuthService from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/users.service';
import { UserModel } from 'src/app/models';
import { getBase64 } from '../../../assets/shared/helpers';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public user: UserModel;
  public loading: boolean = false;
  subscription: Subscription;
  avatar: string;

  constructor(private authService: AuthService, private userService: UserService) {
  }

  async UploadAvatar() {
    let path: any = document.querySelector("#text-button-file") as HTMLElement;
    if (path.value !== "") {
      await getBase64(path.files[0]).then((json: string) => this.avatar = json);
      path.value = "";
      const body = {
        file: path.files[0],
        avatar: this.avatar
      }
      this.userService.postAvatar(this.authService.user.id, body)
    } else { alert("Please pick some picture to upload") }
  }

  ngOnInit() {
    this.user = this.authService.user
  }

  ngOnDestroy() {

  }

}
