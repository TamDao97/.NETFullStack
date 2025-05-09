import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env.development';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  constructor(private _http: HttpClient) {}

  search(payload: any): Observable<any> {
    return this._http.post(`${environment.domainUrl}/api/Topic/Search`, payload);
  }

  getById(id: any): Observable<any> {
    return this._http.get(`${environment.domainUrl}/api/Topic/GetById/${id}`);
  }

  create(payload: any): Observable<any> {
    return this._http.post(`${environment.domainUrl}/api/Topic/Create`, payload);
  }

  update(payload: any): Observable<any> {
    return this._http.post(`${environment.domainUrl}/api/Topic/Update`, payload);
  }

  delete(id: any): Observable<any> {
    return this._http.delete(`${environment.domainUrl}/api/Topic/Delete/${id}`);
  }
}
