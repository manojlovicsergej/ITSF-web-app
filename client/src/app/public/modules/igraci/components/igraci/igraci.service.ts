import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayerDto } from 'src/app/shared/models/player-dto';

@Injectable({
  providedIn: 'root',
})
export class IgraciService {
  selectedPlayers$ = new BehaviorSubject<PlayerDto[] | null>(null);
  set setSelectedPlayers(value: PlayerDto[] | null) {
    this.selectedPlayers$.next(value);
  }

  get getSelectedPlayers() {
    if (this.selectedPlayers$.getValue() === null) {
      this.setSelectedPlayers = [];
    }

    return this.selectedPlayers$.asObservable();
  }

  constructor() {}
}
