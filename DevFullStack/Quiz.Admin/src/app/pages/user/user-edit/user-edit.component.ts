import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  standalone: true,
  imports: [
    FormsModule, // bắt buộc nếu dùng [(ngModel)]
    ReactiveFormsModule, // nếu dùng FormGroup
    NzFormModule, // để có giao diện đẹp
    NzButtonModule,
    NzCardModule,
    NzTableModule,
    NzIconModule,
    NzDropDownModule,
    NzInputModule,
    NzGridModule,
    NzToolTipModule,
    NzModalModule,
    NzButtonModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    NzRadioModule,
    NzTabsModule,
  ],
})
export class UserEditComponent implements OnInit {
  frmGroup: any;
  passwordVisible = false;

  constructor(private _fb: FormBuilder, private _toastService: ToastService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.frmGroup = this._fb.group({
      userName: [null, [Validators.required]],
      passWord: [null, [Validators.required]],
      displayName: [null, [Validators.required]],
      gender: [null],
      dateBirth: [null, [Validators.required]],
      address: [null, [Validators.required]],
    });
  }

  onSave() {
    if (!this.frmGroup.valid) {
      this._toastService.error('Lỗi', 'Vui lòng nhập dữ liệu bắt buộc!');
      return;
    }

    console.log(this.frmGroup.value);
  }

  onExit() {}
}
