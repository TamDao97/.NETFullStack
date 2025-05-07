import { RegexPattern } from './../../../shared/utils/regex-pattern';
import { Component, inject, Input, OnInit } from '@angular/core';
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
import {
  NZ_MODAL_DATA,
  NzModalModule,
  NzModalRef,
  NzModalService,
} from 'ng-zorro-antd/modal';
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
import {
  DateFormat,
  StatusResponseMessage,
  StatusResponseTitle,
} from '../../../shared/utils/constants';

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
  id: any = inject(NZ_MODAL_DATA);
  frmGroup: any;
  passwordVisible = false;
  genderEnums = GenderEnums;
  dateFormat = DateFormat;

  lstGender: IDropdown[] = [
    { id: GenderEnums.Male, text: 'Nam' },
    { id: GenderEnums.Female, text: 'Nữ' },
    { id: GenderEnums.Orther, text: 'Khác' },
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
      id: [null],
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
    if (this.id) {
      this._userService.getById(this.id).subscribe((res) => {
        this.frmGroup.patchValue({
          id: res.data.id,
          userName: res.data.userName,
          passWord: res.data.passWord,
          displayName: res.data.displayName,
          gender: res.data.gender,
          dateBirth: res.data.dateBirth,
          address: res.data.address,
        });
      });
    }
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
      this._toastService.error(
        StatusResponseTitle.ERROR,
        'Vui lòng nhập dữ liệu bắt buộc!'
      );
      return;
    }

    if (!this.id) {
      this._userService.create(this.frmGroup.value).subscribe(
        (response) => {
          if (response.status == 200) {
            this._toastService.success(
              StatusResponseTitle.SUCCESS,
              StatusResponseMessage.ADD_SUCCESS
            );
            this.onExit();
          } else {
            this._toastService.error(
              StatusResponseTitle.ERROR,
              response.message
            );
          }
        },
        (error) => {
          this._toastService.error('Lỗi', error);
        }
      );
    } else {
      this._userService.update(this.frmGroup.value).subscribe(
        (response) => {
          if (response.status == 200) {
            this._toastService.success(
              StatusResponseTitle.SUCCESS,
              StatusResponseMessage.UPDATE_SUCCESS
            );
            this.onExit();
          } else {
            this._toastService.error(
              StatusResponseTitle.ERROR,
              response.message
            );
          }
        },
        (error) => {
          this._toastService.error(StatusResponseTitle.ERROR, error);
        }
      );
    }
  }

  onExit() {
    this._modal.close();
  }
}
