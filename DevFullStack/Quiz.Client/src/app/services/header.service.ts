import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env.development';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  constructor(private _http: HttpClient) {}

  getListTopic(id: any): Observable<any> {
    return this._http.get(`${environment.domainUrl}/api/Common/GetListTopic`, id);
  }
}
