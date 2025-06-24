import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormArray } from '@angular/forms';
import { TdBaseComponent } from '../../../utils/extends-components/td-base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
})
export class HeaderComponent extends TdBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() { }

  validateForm(form: AbstractControl): boolean {
    if (form instanceof FormGroup || form instanceof FormArray) {
      Object.values(form.controls).forEach((control) => {
        this.validateForm(control); // Đệ quy cho control con
      });
    }
    form.markAsTouched({ onlySelf: true });
    form.markAsDirty({ onlySelf: true });
    form.updateValueAndValidity({ onlySelf: true });
    return form.valid;
  }

  onLogin() {
    // Kiểm tra xem form có hợp lệ không
    if (!this.validateForm(this.frmGroup)) return;

    let payload = this.frmGroup.value;
    this._loginService.login(payload).subscribe((rs) => {
      if (rs.status == StatusCode.Ok) {
        AuthService.setAuthStorage(rs.data);
        this._router.navigate(['/user']); // Điều hướng sau khi đăng nhập thành công
        this._toastService.success(StatusResponseTitle.SUCCESS, rs.message);
      } else {
        this._toastService.error(StatusResponseTitle.ERROR, rs.message);
      }
    });
  }
}
