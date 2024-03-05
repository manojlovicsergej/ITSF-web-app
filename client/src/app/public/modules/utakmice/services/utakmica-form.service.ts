import { Injectable } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { GameDto } from 'src/app/shared/models/game-dto';
import { PlayerGamesDto } from 'src/app/shared/models/player-games-dto';

@Injectable({
  providedIn: 'root',
})
export class UtakmicaFormService {
  form$ = new BehaviorSubject<FormGroup | null>(null);
  set setForm(value: FormGroup | null) {
    this.form$.next(value);
  }

  get getForm() {
    if (this.form$.getValue() === null) {
      this.setForm = this.GetUtakmicaGroup();
    }

    return this.form$.asObservable();
  }
  constructor(private _fb: FormBuilder) {}

  public GetUtakmicaGroup(model?: GameDto): FormGroup {
    return this._fb.group({
      id: new FormControl(model?.id),
      gameName: new FormControl(model?.gameName, {
        validators: [Validators.required],
      }),
      hostName: new FormControl(model?.hostName, {
        validators: [Validators.required],
      }),
      hostResult: new FormControl(model?.hostResult ?? 0, {
        validators: [Validators.required],
      }),
      guestName: new FormControl(model?.guestName, {
        validators: [Validators.required],
      }),
      guestResult: new FormControl(model?.guestResult ?? 0, {
        validators: [Validators.required],
      }),
      gamePlayers: this.GetGamePlayersFormArray(model?.gamePlayers),
    });
  }

  public GetGamePlayersFormArray(
    gamePlayers: PlayerGamesDto[] | undefined
  ): FormArray {
    if (!gamePlayers || gamePlayers.length === 0) {
      return this._fb.array([]);
    }
    let result: FormArray = this._fb.array([]);

    gamePlayers.forEach((o) => {
      result.push(this.GetGamePlayersFormGroup(o));
    });
    return result;
  }

  public GetGamePlayersFormGroup(gamePlayer: PlayerGamesDto) {
    return this._fb.group({
      id: new FormControl(gamePlayer?.id),
      playerId: new FormControl(gamePlayer?.playerId),
      gameId: new FormControl(gamePlayer?.gameId),
      side : new FormControl(gamePlayer?.side)
    });
  }
}
