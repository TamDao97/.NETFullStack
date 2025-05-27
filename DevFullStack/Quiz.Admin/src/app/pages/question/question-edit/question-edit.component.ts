import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { QuestionService } from '../../../services/question.service';
import { IDropdown } from '../../../interfaces/IDropdown';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../shared/services/toast.service';
import {
  StatusResponseMessage,
  StatusResponseTitle,
} from '../../../shared/utils/constants';
import { QuestionTypeEnums } from '../../../shared/utils/enums.enum';
import { SingleChoiceComponent } from './answers/single-choice/single-choice.component';
import { MultiChoiceComponent } from './answers/multi-choice/multi-choice.component';
import { TrueOrFalseComponent } from './answers/true-or-false/true-or-false.component';
import { OrderingOrSequencingComponent } from './answers/ordering-or-sequencing/ordering-or-sequencing.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Base64UploadAdapter } from '../../../shared/editor/base64-upload';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss'],
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
    NzCollapseModule,
    CommonModule,
    CKEditorModule,
    SingleChoiceComponent,
    MultiChoiceComponent,
    TrueOrFalseComponent,
    OrderingOrSequencingComponent,
  ],
})
export class QuestionEditComponent implements OnInit {
  lstTopic: IDropdown[] = [];
  lstQuestionType: IDropdown[] = [];
  lstQuestionLevel: IDropdown[] = [];

  id: any = inject(NZ_MODAL_DATA);
  frmGroup: any;
  questionTypeEnums = QuestionTypeEnums;
  constructor(
    private _fb: FormBuilder,
    private _modal: NzModalRef,
    private _toastService: ToastService,
    private _questionService: QuestionService
  ) {}

  ngOnInit() {
    this.getListTopic();
    this.getListQuestionType();
    this.getListQuestionLevel();
    this.initForm();
    this.eventRegiterChanges();
  }

  initForm() {
    this.frmGroup = this._fb.group({
      id: [null],
      idTopic: [null, [Validators.required]],
      questionType: [QuestionTypeEnums.SingleChoice, [Validators.required]],
      questionLevel: [null, [Validators.required]],
      content: [null, [Validators.required]],
      description: [null],
    });
    // if (this.id) {
    //   this._questionService.getById(this.id).subscribe((res) => {
    //     this.frmGroup.patchValue({
    //       id: res.data.id,
    //       userName: res.data.userName,
    //       passWord: res.data.passWord,
    //       displayName: res.data.displayName,
    //       gender: res.data.gender,
    //       dateBirth: res.data.dateBirth,
    //       address: res.data.address,
    //     });
    //   });
    // }
  }

  eventRegiterChanges() {
    this.frmGroup.get('questionType').valueChanges.subscribe((val: any) => {
      this.answers = [];
    });
  }

  getListTopic() {
    return this._questionService.getListTopic().subscribe((rs) => {
      this.lstTopic = rs.data;
    });
  }

  getListQuestionType() {
    return this._questionService.getListQuestionType().subscribe((rs) => {
      this.lstQuestionType = rs.data;
    });
  }

  getListQuestionLevel() {
    return this._questionService.getListQuestionLevel().subscribe((rs) => {
      this.lstQuestionLevel = rs.data;
    });
  }

  answers: any[] = [];
  onAddAnswer() {
    const questionType = this.frmGroup.get('questionType').value;
    if (questionType === null || questionType === undefined) {
      this.frmGroup.get('questionType').markAsTouched();
      this._toastService.error(
        StatusResponseTitle.ERROR,
        'Vui lòng chọn dạng câu hỏi trước khi tạo đán án!'
      );
      return;
    }

    switch (questionType) {
      case QuestionTypeEnums.SingleChoice:
        this.answers.push({ content: 'xin chào các bạn!' });
        this.setNameByOrder();
        break;
      case QuestionTypeEnums.MultiChoice:
        this.answers.push({ content: 'xin chào các bạn!' });
        this.setNameByOrder();
        break;
      case QuestionTypeEnums.TrueOrFalse:
        break;
      case QuestionTypeEnums.OrderingOrSequencing:
        this.answers.push({ content: 'xin chào các bạn!' });
        this.setNameByOrder();
        break;
    }
  }

  setNameByOrder() {
    this.answers.forEach((el: any, index: number) => {
      const nextChar = String.fromCharCode(65 + index); // 65 là mã ASCII của 'A'
      el.name = nextChar;
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
      this._toastService.error(
        StatusResponseTitle.ERROR,
        'Vui lòng nhập dữ liệu bắt buộc!'
      );
      return;
    }

    let payload = {
      ...this.frmGroup.value,
      answers: this.answers,
    };

    if (!this.id) {
      this._questionService.create(payload).subscribe(
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
      this._questionService.update(payload).subscribe(
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

  public Editor = ClassicEditor as any;
  public editorData = '';

  public editorConfig = {
    simpleUpload: {
      uploadUrl: '', // Không cần thiết nếu dùng base64
    },
  };

  // Base64 Upload Adapter Plugin
  Base64UploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return new Base64UploadAdapter(loader);
    };
  }
}
