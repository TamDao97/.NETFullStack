import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  create(payload: any): Observable<any> {
    return this._http.post(`${environment.domainUrl}/api/User/Create`, payload);
  }
}
