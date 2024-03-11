import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerDto } from '../models/player-dto';
import { BASE_URL } from '../services/useful-things.service';
import { PlayerFilterRequest } from '../models/player-filter-request';

@Injectable({
  providedIn: 'root',
})
export class PlayerHttpService {
  private _baseUrl: string;

  constructor(protected _http: HttpClient) {
    this._baseUrl = BASE_URL;
  }

  getAllPlayers(): Observable<PlayerDto[]> {
    return this._http.get<PlayerDto[]>(`${this._baseUrl}/get-all-players`);
  }

  getAllPlayersByFilter(request: PlayerFilterRequest): Observable<PlayerDto[]> {
    return this._http.post<PlayerDto[]>(
      `${this._baseUrl}/get-all-players-by-filter`,
      request,
      {
        responseType: 'json',
      }
    );
  }

  addPlayer(request: PlayerDto): Observable<string> {
    return this._http.post(`${this._baseUrl}/add-player`, request, {
      responseType: 'text',
    });
  }

  updatePlayer(request: PlayerDto): Observable<string> {
    return this._http.put(`${this._baseUrl}/update-player`, request, {
      responseType: 'text',
    });
  }

  deletePlayer(playerId: number): Observable<string> {
    return this._http.delete<string>(
      `${this._baseUrl}/delete-player?playerId=${playerId}`
    );
  }
}
