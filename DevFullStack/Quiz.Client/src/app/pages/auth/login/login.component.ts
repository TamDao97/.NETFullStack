import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/modules/shared.module';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { StatusResponseTitle } from '../../../shared/utils/constants';
import { ToastService } from '../../../shared/services/toast.service';
import { AuthService } from '../../../shared/utils/services/auth.service';
import { StatusCode } from '../../../shared/utils/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class LoginComponent implements OnInit {

  frmGroup!: FormGroup;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _authService: AuthService,
    private _loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.frmGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    // // Kiểm tra xem form có hợp lệ không
    // if (!this.validateForm(this.frmGroup)) return;

    let payload = this.frmGroup.value;
    this._loginService.login(payload).subscribe((rs) => {
      if (rs.status == StatusCode.Ok) {
        this._authService.setAuthStorage(rs.data);
        this._router.navigate(['/home']); // Điều hướng sau khi đăng nhập thành công
        this._toastService.show({
          title: 'Thông báo',
          message: 'Bạn đã lưu thành công!',
          type: 'success'
        });
      } else {
        this._toastService.show({
          title: 'Thông báo',
          message: 'Bạn đã lưu thành công!',
          type: 'error'
        });
      }
    });
  }
}

