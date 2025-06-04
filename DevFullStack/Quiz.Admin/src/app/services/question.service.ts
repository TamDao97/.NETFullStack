import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env.development';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _http: HttpClient) {}

  getListQuestionType(): Observable<any> {
    return this._http.get(
      `${environment.domainUrl}/api/Common/GetListQuestionType`
    );
  }

  getListQuestionLevel(): Observable<any> {
    return this._http.get(
      `${environment.domainUrl}/api/Common/GetListQuestionLevel`
    );
  }

  getListTopic(): Observable<any> {
    return this._http.get(`${environment.domainUrl}/api/Common/GetListTopic`);
  }

  search(payload: any): Observable<any> {
    return this._http.post(
      `${environment.domainUrl}/api/Question/Search`,
      payload
    );
  }

  getById(id: any): Observable<any> {
    return this._http.get(
      `${environment.domainUrl}/api/Question/GetById/${id}`
    );
  }

  create(payload: any): Observable<any> {
    return this._http.post(
      `${environment.domainUrl}/api/Question/Create`,
      payload
    );
  }

  update(payload: any): Observable<any> {
    return this._http.post(
      `${environment.domainUrl}/api/Question/Update`,
      payload
    );
  }

  delete(id: any): Observable<any> {
    return this._http.delete(
      `${environment.domainUrl}/api/Question/Delete/${id}`
    );
  }
}
