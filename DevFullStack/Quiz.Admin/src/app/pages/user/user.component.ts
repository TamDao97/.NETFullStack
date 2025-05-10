import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { UserEditComponent } from './user-edit/user-edit.component';
import { BaseComponent } from '../../shared/components/base/base.component';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../shared/services/toast.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTagModule } from 'ng-zorro-antd/tag';
import {
  StatusResponseMessage,
  StatusResponseTitle,
} from '../../shared/utils/constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
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
export class UserComponent extends BaseComponent implements OnInit {
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
    private _userService: UserService
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
    this._userService.search(filter).subscribe((res) => {
      this.gridData = res.data.datas;
      this.totalRecord = res.data.totalRecord;
      this._cd.detectChanges(); // ép render lại
      console.log(this.gridData);
    });
  }

  reset(): void {
    // this.searchValue = '';
    // this.search();
  }

  search(): void {
    this.gridLoadData();
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

  onCreateUser(): void {
    const modalRef = this._modalService.create({
      nzWidth: '1000px',
      nzTitle: 'Thêm mới người dùng',
      nzContent: UserEditComponent,
    });
    modalRef.afterClose.subscribe((rs) => {
      console.log(rs);
      this.gridLoadData();
    });
  }

  onEditUser(id: any): void {
    const modalRef = this._modalService.create({
      nzWidth: '1000px',
      nzTitle: 'Cập nhật người dùng',
      nzContent: UserEditComponent,
      nzData: id,
    });
    modalRef.afterClose.subscribe((rs) => {
      console.log(rs);
      this.gridLoadData();
    });
  }

  onDeleteUser(id: any): void {
    const confirmModal = this._modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa dữ liệu?',
      // nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () => {
        this._userService.delete(id).subscribe((res) => {
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
