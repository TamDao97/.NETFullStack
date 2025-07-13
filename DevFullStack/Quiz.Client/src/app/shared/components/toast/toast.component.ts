import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { IToast } from '../../interfaces/IToast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  toasts: IToast[] = [];

  constructor(private _toastService: ToastService) { }

  ngOnInit(): void {
    this._toastService.toastState$.subscribe(toast => {
      this.toasts.push(toast);
      setTimeout(() => this.remove(toast), toast.delay || 3000);
    });
  }

  remove(toast: IToast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  getClass(type: string = 'info'): string {
    return {
      success: 'bg-success text-white',
      error: 'bg-danger text-white',
      warning: 'bg-warning text-dark',
      info: 'bg-primary text-white'
    }[type] ?? 'bg-secondary text-white';
  }
}