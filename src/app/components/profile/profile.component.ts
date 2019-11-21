import { Component, OnInit, OnDestroy } from '@angular/core';
import AuthService from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/users.service';
import { UserModel } from 'src/app/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public user: UserModel;
  public loading: boolean = true;
  subscription: Subscription;
  avatar: string;

  constructor(private authService: AuthService, private userService: UserService) {
  }

  toBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  async UploadAvatar() {
    let path: any = document.querySelector("#text-button-file") as HTMLElement;
    if (path.value !== "") {
      await this.toBase64(path.files[0]).then((json: string) => this.avatar = json);
      path.value = "";
      const body = {
        avatar: this.avatar
      }
      this.userService.put('users/1', body).subscribe()
    } else { alert("Please pick some picture to upload") }
  }

  ngOnInit() {
    this.authService.get('users/currentUser').subscribe((res: any) => {
      this.user = res.user;
      this.loading = false
      this.authService.getAvatar('getAvatar', { id: res.user.id }).subscribe(data => {
        this.avatar = data.avatar;
      })
    }
    );
  }

  ngOnDestroy() {

  }

}
