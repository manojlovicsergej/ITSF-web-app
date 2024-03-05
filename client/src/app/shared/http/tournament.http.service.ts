import { Injectable } from '@angular/core';
import { TournamentDto } from '../models/tournament-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../services/useful-things.service';

@Injectable({
  providedIn: 'root',
})
export class TournamentHttpService {
  private _baseUrl: string;

  constructor(protected _http: HttpClient) {
    this._baseUrl = BASE_URL;
  }

  getAllTournaments(): Observable<TournamentDto[]> {
    return this._http.get<TournamentDto[]>(
      `${this._baseUrl}/get-all-tournaments`
    );
  }

  addTournament(request: TournamentDto): Observable<string> {
    return this._http.post(`${this._baseUrl}/add-tournament`, request, {
      responseType: 'text',
    });
  }

  deleteTournament(tournamentId: number): Observable<string> {
    return this._http.delete<string>(
      `${this._baseUrl}/delete-tournament?tournamentId=${tournamentId}`
    );
  }
}
