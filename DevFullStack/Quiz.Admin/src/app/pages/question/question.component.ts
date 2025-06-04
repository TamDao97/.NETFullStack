import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { BaseComponent } from '../../shared/components/base/base.component';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../shared/services/toast.service';
import {
  StatusResponseMessage,
  StatusResponseTitle,
} from '../../shared/utils/constants';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { QuestionService } from '../../services/question.service';

interface DataItem {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  standalone: true,
  imports: [
    NzButtonModule,
    NzCardModule,
    NzTableModule,
    NzIconModule,
    NzDropDownModule,
    NzInputModule,
    FormsModule,
    NzGridModule,
    NzToolTipModule,
    NzModalModule,
    CommonModule,
    NzPaginationModule,
    NzTypographyModule,
    NzTagModule,
  ],
})
export class QuestionComponent extends BaseComponent implements OnInit {
  gridFilter = {
    keyWord: null,
  };

  constructor(
    private _cd: ChangeDetectorRef,
    private _modalService: NzModalService,
    private _toastService: ToastService,
    private _questionService: QuestionService
  ) {
    super();
  }

  ngOnInit() {
    this.gridLoadData();
  }

  override gridLoadData() {
    var filter = {
      ...this.gridFilter,
      page: this.page,
      pageSize: this.pageSize,
    };
    this._questionService.search(filter).subscribe((res) => {
      this.gridData = res.data.datas;
      this.totalRecord = res.data.totalRecord;
      this._cd.detectChanges(); // ép render lại
      console.log(this.gridData);
    });
  }

  search(): void {
    this.gridLoadData();
  }

  changePageIndex(page: number): void {
    this.page = page;
    this.gridLoadData();
  }

  changePageSize(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.gridLoadData();
  }

  onCreateQuestion(): void {
    this._modalService.create({
      nzTitle: 'Thêm mới câu hỏi',
      nzContent: QuestionEditComponent,
      nzWidth: '1350px',
    });
  }

  onEditQuestion(id: any): void {
    const modalRef = this._modalService.create({
      nzWidth: '1000px',
      nzTitle: 'Cập nhật câu hỏi',
      nzContent: QuestionEditComponent,
      nzData: id,
    });
    modalRef.afterClose.subscribe((rs) => {
      console.log(rs);
      this.gridLoadData();
    });
  }

  onDeleteQuestion(id: any): void {
    const confirmModal = this._modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa dữ liệu?',
      // nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () => {
        this._questionService.delete(id).subscribe((res) => {
          this.gridLoadData();
          this._toastService.success(
            StatusResponseTitle.SUCCESS,
            StatusResponseMessage.DELETE_SUCCESS
          );
        });
      },
    });
  }

  reset() {}
}
