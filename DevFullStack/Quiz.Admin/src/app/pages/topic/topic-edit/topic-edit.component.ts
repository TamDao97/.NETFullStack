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
import { TopicService } from '../../../services/topic.service';
import { HttpClientModule } from '@angular/common/http';
import {
  DateFormat,
  StatusResponseMessage,
  StatusResponseTitle,
} from '../../../shared/utils/constants';

@Component({
  selector: 'app-topic-edit',
  templateUrl: './topic-edit.component.html',
  styleUrls: ['./topic-edit.component.css'],
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
export class TopicEditComponent implements OnInit {
   id: any = inject(NZ_MODAL_DATA);
  frmGroup: any;
  passwordVisible = false;
  dateFormat = DateFormat;
  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _modal: NzModalRef,
    private _topicService: TopicService
  ) {}

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.frmGroup = this._fb.group({
      topicName: [null, [Validators.required]],
      description: [null],
    });
    if (this.id) {
      this._topicService.getById(this.id).subscribe((res) => {
        this.frmGroup.patchValue({
          id: res.data.id,
          topicName: res.data.topicName,
          questionCount: res.data.questionCount,
          answerCount: res.data.answerCount,
          description: res.data.description,
          upDate: res.data.upDate,
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
      this._topicService.create(this.frmGroup.value).subscribe(
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
      const payload = {
        id:this.id,
        topicName:this.frmGroup.get('topicName').value,
        description:this.frmGroup.get('description').value
      }

      this._topicService.update(payload).subscribe(
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
    this._modal.close()
  }
} 