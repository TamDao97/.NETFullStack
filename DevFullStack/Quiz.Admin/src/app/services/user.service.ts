import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  search(payload: any): Observable<any> {
    return this._http.post(`${environment.domainUrl}/api/User/Search`, payload);
  }

  getById(id: any): Observable<any> {
    return this._http.get(`${environment.domainUrl}/api/User/GetById/${id}`);
  }

  create(payload: any): Observable<any> {
    return this._http.post(`${environment.domainUrl}/api/User/Create`, payload);
  }

  update(payload: any): Observable<any> {
    return this._http.post(`${environment.domainUrl}/api/User/Update`, payload);
  }

  delete(id: any): Observable<any> {
    return this._http.delete(`${environment.domainUrl}/api/User/Delete/${id}`);
  }
}
