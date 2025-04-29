import { RegexPattern } from './../../../shared/utils/regex-pattern';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
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
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ToastService } from '../../../shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { GenderEnums } from '../../../shared/utils/enums.enum';
import { IDropdown } from '../../../interfaces/IDropdown';
import { UserService } from '../../../services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    CommonModule,
  ],
})
export class UserEditComponent implements OnInit {
  frmGroup: any;
  passwordVisible = false;
  genderEnums = GenderEnums;

  lstGender: IDropdown[] = [
    { value: GenderEnums.Male, text: 'Nam' },
    { value: GenderEnums.Female, text: 'Nữ' },
    { value: GenderEnums.Orther, text: 'Khác' },
  ];

  constructor(
    private _fb: FormBuilder,
    private _modal: NzModalRef,
    private _toastService: ToastService,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.frmGroup = this._fb.group({
      userName: [
        null,
        [
          Validators.required,
          Validators.pattern(RegexPattern.Email),
          // Validators.pattern(RegexPattern.Sdt),
        ],
      ],
      passWord: [null, [Validators.required]],
      displayName: [null, [Validators.required]],
      gender: [GenderEnums.Male],
      dateBirth: [null],
      address: [null],
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    for (const i in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(i)) {
        formGroup.controls[i].markAsDirty();
        formGroup.controls[i].updateValueAndValidity();
      }
    }
  }

  onSave() {
    if (!this.frmGroup.valid) {
      this.markFormGroupTouched(this.frmGroup);
      this._toastService.error('Lỗi', 'Vui lòng nhập dữ liệu bắt buộc!');
      return;
    }

    debugger;
    this._userService.create(this.frmGroup.value).subscribe(
      (response) => {
        console.log('Dữ liệu:', response);
      },
      (error) => {
        console.error('Có lỗi xảy ra:', error); // Xử lý lỗi
      },
      () => {
        console.log('Yêu cầu hoàn thành!'); // Xử lý khi hoàn thành
      }
    );
  }

  onExit() {
    this._modal.close();
  }
}
