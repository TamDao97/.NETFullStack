import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IDropdown } from '../../../../interfaces/IDropdown';
import { IResponse } from '../../../../interfaces/IResponse';
import { HeaderService } from '../../../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule,],
})
export class HeaderComponent implements OnInit {
  topics: IDropdown[] = [];
  constructor(private _headerService: HeaderService) {}

  ngOnInit():void  {
     const id = {}; 
    this._headerService.getListTopic(id).subscribe((res: IResponse<IDropdown[]>) => {
      console.log('Response:', res);
      if (res.status == 200) {
        this.topics = res.data;
      }
    });
  }
  goToLogin() {
    // điều hướng đến trang đăng nhập
  }

  goToRegister() {
    // điều hướng đến trang đăng ký
  }
}
