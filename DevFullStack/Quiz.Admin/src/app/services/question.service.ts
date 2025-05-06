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
}
