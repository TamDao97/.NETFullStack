import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-true-or-false',
  templateUrl: './true-or-false.component.html',
  styleUrls: ['./true-or-false.component.scss'],
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
    NzCheckboxModule,
  ],
})
export class TrueOrFalseComponent implements OnInit {
  @Input() answers: any = [
    {
      name: 'A',
      content: 'Đúng',
      isTrue: false,
    },
    {
      name: 'B',
      content: 'Sai',
      isTrue: false,
    },
  ];
  constructor() {}

  ngOnInit() {}

  onCheckAnswer(e: any, index: number) {
    for (let i = 0; i < this.answers.length; i++) {
      if (i !== index) {
        if (this.answers[index].isTrue) {
          this.answers[i].isTrue = false;
        } else {
          continue;
        }
      }
    }
  }
}
