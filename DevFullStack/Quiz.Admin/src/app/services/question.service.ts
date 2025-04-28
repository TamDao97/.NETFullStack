import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _httpClient: HttpClient) {}

  getSelectTopic() {
    return this._httpClient.get(
      'http://localhost:5110/api/Topic/GetSelectTopic'
    );
  }
}
