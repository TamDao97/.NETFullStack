import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env.development';
import { IResponse } from '../interfaces/IResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = `${environment.domainUrl}/auth`;
  constructor(private httpClient: HttpClient) {}

  login(payload: any): Observable<IResponse> {
    return this.httpClient.post<IResponse>(`${this.apiUrl}/login`, payload);
  }
}
