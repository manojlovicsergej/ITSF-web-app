import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../services/useful-things.service';
import { DashboardDto } from '../models/dashboard-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardHttpService {
  private _baseUrl: string;

  constructor(protected _http: HttpClient) {
    this._baseUrl = BASE_URL;
  }

  getDashboardData(): Observable<DashboardDto> {
    return this._http.get<DashboardDto>(`${this._baseUrl}/get-dashboard`);
  }
}
