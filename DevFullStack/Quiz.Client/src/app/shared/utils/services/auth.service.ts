import { Injectable } from '@angular/core';
import { StorageLocalService } from './storage-local.service';
import { LocalStorageKey } from '../constants';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { ICurrentUser } from '../../interfaces/ICurrentUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject = new BehaviorSubject<ICurrentUser | null>(null);
  currentUser$: Observable<ICurrentUser | null> = this.currentUserSubject.asObservable(); // Expose as Observable (read-only)

  constructor() { }

  // Kiểm tra nếu người dùng đã đăng nhập
  static isLoggedIn(): boolean {
    return !!StorageLocalService.getItem(LocalStorageKey.Auth);
  }

  setAuthStorage(item: any): void {
    this.currentUserSubject.next(item);
    StorageLocalService.setItem(LocalStorageKey.Auth, item);
  }

  // Lấy token hiện tại
  getAuthStorage(): string | null {
    return StorageLocalService.getItem(LocalStorageKey.Auth);
  }

  // Xóa token hệ thống
  removeAuthStorage(): void {
    this.currentUserSubject.next(null);
    StorageLocalService.removeItem(LocalStorageKey.Auth);
  }
}
