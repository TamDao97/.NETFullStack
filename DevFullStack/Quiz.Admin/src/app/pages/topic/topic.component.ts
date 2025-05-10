import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { BaseComponent } from '../../shared/components/base/base.component';
import { TopicService } from '../../services/topic.service';
import { ToastService } from '../../shared/services/toast.service';
import { TopicEditComponent } from './topic-edit/topic-edit.component';
import { StatusResponseMessage, StatusResponseTitle } from '../../shared/utils/constants';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzCardModule,
    NzTableModule,
    NzIconModule,
    NzDropDownModule,
    NzInputModule,
    NzGridModule,
    NzToolTipModule,
    NzModalModule,
    NzPaginationModule,
    NzTypographyModule,
    NzTagModule,
  ],
})
export class TopicComponent extends BaseComponent implements OnInit {
  gridFilter = {
    keyWord: null,
  };
  override page: number = 1;
  override pageSize: number = 10;
  override totalRecord: number = 0;
  override gridData: any[] = [];
  

  constructor(
    private _cd: ChangeDetectorRef,
    private _modalService: NzModalService,
    private _toastService: ToastService,
    private _topicService: TopicService
  ) {
    super();
  }

  ngOnInit(): void {
    this.gridLoadData();
  }

  override gridLoadData(): void {
    const filter = {
      ...this.gridFilter,
      page: this.page,
      pageSize: this.pageSize,
    };
    this._topicService.search(filter).subscribe((res) => {
      this.gridData = res.data.datas;
      this.totalRecord = res.data.totalRecord;
      this._cd.detectChanges(); // ép render lại
      console.log(this.gridData);
    });
  }
  reset(): void{

  }
  search(): void {
    this.page = 1;
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

  onCreateTopic(): void {
    const modalRef = this._modalService.create({
      nzWidth: '1000px',
      nzTitle: 'Thêm mới chủ đề',
      nzContent: TopicEditComponent,
    });

    modalRef.afterClose.subscribe((rs) => {
      console.log(rs);
      this.gridLoadData();
    });
  }

  onEditTopic(id: any): void {
    const modalRef = this._modalService.create({
      nzWidth: '1000px',
      nzTitle: 'Cập nhật chủ đề',
      nzContent: TopicEditComponent,
      nzData: id,
    });

   modalRef.afterClose.subscribe((rs) => {
      console.log(rs);
      this.gridLoadData();
    });
  }

  onDeleteTopic(id: any): void {
    const confirmModal = this._modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa dữ liệu?',
      // nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () => {
        this._topicService.delete(id).subscribe((res) => {
          this.gridLoadData();
          this._toastService.success(
            StatusResponseTitle.SUCCESS,
            StatusResponseMessage.DELETE_SUCCESS
          );
        });
      },
    });
  }
}
