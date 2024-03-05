import { Injectable } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TournamentDto } from 'src/app/shared/models/tournament-dto';
import { UtakmicaFormService } from '../../utakmice/services/utakmica-form.service';
import { GameDto } from 'src/app/shared/models/game-dto';

@Injectable({
  providedIn: 'root',
})
export class TurnirFormService {
  form$ = new BehaviorSubject<FormGroup | null>(null);
  set setForm(value: FormGroup | null) {
    this.form$.next(value);
  }

  get getForm() {
    if (this.form$.getValue() === null) {
      this.setForm = this.GetTurnirGroup();
    }

    return this.form$.asObservable();
  }
  constructor(
    private _fb: FormBuilder,
    private _gameFormService: UtakmicaFormService
  ) {}

  public GetTurnirGroup(model?: TournamentDto): FormGroup {
    return this._fb.group({
      id: new FormControl(model?.id),
      name: new FormControl(model?.name, {
        validators: [Validators.required],
      }),
      format: new FormControl(model?.format, {
        validators: [Validators.required],
      }),
      place: new FormControl(model?.place, {
        validators: [Validators.required],
      }),
      prize: new FormControl(model?.prize, {
        validators: [Validators.required],
      }),
      games: this.GetGamesFormArray(model?.games),
    });
  }

  public GetGamesFormArray(utakmica: GameDto[] | undefined): FormArray {
    if (!utakmica || utakmica.length === 0) {
      return this._fb.array([]);
    }
    let result: FormArray = this._fb.array([]);

    utakmica.forEach((o) => {
      result.push(this._gameFormService.GetUtakmicaGroup(o));
    });
    return result;
  }
}
