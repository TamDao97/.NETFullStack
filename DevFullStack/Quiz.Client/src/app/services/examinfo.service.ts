import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env.development';

@Injectable({
  providedIn: 'root'
})
export class ExaminfoService {

  constructor(private _http: HttpClient) { }

  getExamInfoByIdTopic(id: any): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/Topic/GetExamInfoByIdTopic/${id}`);
  }
}