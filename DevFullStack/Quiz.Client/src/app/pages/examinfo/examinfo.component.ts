import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ExaminfoService } from '../../services/examinfo.service';
import { IResponse } from '../../interfaces/IResponse';

@Component({
  selector: 'app-examinfo',
  templateUrl: './examinfo.component.html',
  styleUrls: ['./examinfo.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class ExaminfoComponent implements OnInit, OnDestroy {
  examInfo: any = {};
  private paramSub: any;
  constructor(
    private _examinfoService: ExaminfoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.paramSub = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this._examinfoService
          .getExamInfoByIdTopic(id)
          .subscribe((res: IResponse) => {
            if (res.status == 200) {
              this.examInfo = res.data;
              console.log('Response:', this.examInfo);
            }
          });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }

  startExam() {
    if (this.examInfo && this.examInfo.id) {
      this.router.navigate(['/examdetail', this.examInfo.id]);
    }
  }
}
