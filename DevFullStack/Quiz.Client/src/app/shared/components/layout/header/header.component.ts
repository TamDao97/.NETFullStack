import { Component, OnInit } from '@angular/core';
import { ICurrentUser } from '../../../interfaces/ICurrentUser';
import { AuthService } from '../../../utils/services/auth.service';
import { TdBaseComponent } from '../../../utils/extends-components/td-base.component';
import { UserChangePasswordComponent } from '../../../../pages/auth/user/user-change-password/user-change-password.component';
import { UserProfileComponent } from '../../../../pages/auth/user/user-profile/user-profile.component';
import { LoginComponent } from '../../../../pages/auth/login/login.component';
import { RegisterComponent } from '../../../../pages/auth/register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
})
export class HeaderComponent extends TdBaseComponent implements OnInit {
  currentUser!: ICurrentUser;

  constructor() {
    super();
  }

  ngOnInit() {
    const auth = AuthService.getAuthStorage(); // Lấy token từ localStorage
    if (auth) {
      this.currentUser = JSON.parse(auth) as ICurrentUser;
    }
  }

  onLogin(): void {
    this.openModal(
      {
        title: 'Đăng nhập',
        width: 500,
      },
      LoginComponent
    ).afterClose.subscribe((result: any) => {
      // console.log(result);
    });
  }

  onRegister(): void {
    this.openModal(
      {
        title: 'Đăng ký tài khoản',
        width: 500,
      },
      RegisterComponent
    ).afterClose.subscribe((result: any) => {
      // console.log(result);
    });
  }

  onEditProfile() {
    this.openModal(
      {
        title: 'Cập nhật thông tin cá nhân',
        width: 800,
      },
      UserProfileComponent,
      {
        params: { id: this.currentUser.id },
      }
    ).afterClose.subscribe((result: any) => {
      // console.log(result);
    });
  }

  onChangePassword() {
    this.openModal(
      {
        title: 'Đổi mật khẩu',
        width: 500,
      },
      UserChangePasswordComponent
    ).afterClose.subscribe((result: any) => {
      // console.log(result);
    });
  }
}
