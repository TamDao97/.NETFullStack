import { Injectable } from '@angular/core';
import { IToast } from '../interfaces/IToast';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<IToast>();
  toastState$ = this.toastSubject.asObservable();

  show(toast: IToast) {
    this.toastSubject.next(toast);
  }
}
