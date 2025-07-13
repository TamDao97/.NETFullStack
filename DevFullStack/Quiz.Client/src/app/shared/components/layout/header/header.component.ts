import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../utils/services/auth.service';
import { ICurrentUser } from '../../../interfaces/ICurrentUser';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../../../../services/login.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule,],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  currentUser!: ICurrentUser | null;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _authService: AuthService,
    private _loginService: LoginService
  ) {
  }

  ngOnInit() {
    this._authService.currentUser$.subscribe(user => {
      this.currentUser = user
      this.isLoggedIn = user != null;
      // this.isLoggedIn = this._authService.isLoggedIn();
    });
  }

  // onEditProfile() {
  //   this.openModal(
  //     {
  //       title: 'Cập nhật thông tin cá nhân',
  //       width: 800,
  //     },
  //     UserProfileComponent,
  //     {
  //       params: { id: this.currentUser.id },
  //     }
  //   ).afterClose.subscribe((result: any) => {
  //     // console.log(result);
  //   });
  // }

  // onChangePassword() {
  //   this.openModal(
  //     {
  //       title: 'Đổi mật khẩu',
  //       width: 800,
  //     },
  //     UserChangePasswordComponent
  //   ).afterClose.subscribe((result: any) => {
  //     // console.log(result);
  //   });
  // }

  onLogout() {
    this._authService.removeAuthStorage();
    this._router.navigate(['/home']); // Điều hướng sau khi đăng nhập thành công
    this._toastService.show({
      title: 'Thông báo',
      message: 'Bạn đã lưu thành công!',
      type: 'success'
    });
  }
}
