import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TournamentDto } from 'src/app/shared/models/tournament-dto';
import { asFormControl } from 'src/app/shared/services/useful-things.service';
import { TurnirFormService } from '../../services/turnir-form.service';
import { GameDto } from 'src/app/shared/models/game-dto';
import { GameHttpService } from 'src/app/shared/http/game.http.service';
import { FormHelperService } from 'src/app/shared/services/form-helper.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TournamentHttpService } from 'src/app/shared/http/tournament.http.service';
import { UtakmicaFormService } from '../../../utakmice/services/utakmica-form.service';

@Component({
  selector: 'app-turnir',
  templateUrl: './turnir.component.html',
  styleUrls: ['./turnir.component.scss'],
})
export class TurnirComponent implements OnInit, OnDestroy {
  /** Subscription */
  private _subs: Subscription;

  /** Props */
  form: FormGroup | null;
  model: TournamentDto | null;
  tempGames: GameDto[] = [];
  games: GameDto[] = [];
  chosenGames: GameDto[] = [];

  tournaments: TournamentDto[] = [];

  utakmiceSelectVisible: boolean = false;

  constructor(
    private _fs: TurnirFormService,
    private _gameHttp: GameHttpService,
    private _formHelper: FormHelperService,
    private _alertService: AlertService,
    private _tournamentHttp: TournamentHttpService,
    private _fsGame: UtakmicaFormService
  ) {
    this._subs = new Subscription();
    this.form = null;
    this.model = null;
  }

  ngOnInit(): void {
    this._subs.add(
      this._fs.getForm.subscribe((res) => {
        this.form = res;
      })
    );

    this._load();
  }

  private _load() {
    this._subs.add(
      this._gameHttp.getAllGames().subscribe((res) => {
        this.games = res;
        this.tempGames = this.games;
      })
    );

    this._subs.add(
      this._tournamentHttp.getAllTournaments().subscribe((res) => {
        this.tournaments = res;
      })
    );
  }

  kreirajTurnir() {
    if (
      this.form === null ||
      !this.form.valid ||
      this.chosenGames.length === 0
    ) {
      this._formHelper.invalidateForm(this.form!);
      this._alertService.addWarnMsg('Morate popuniti sva obavezna polja!');
      return;
    }

    this.dodajUtakmiceUForm();

    this._subs.add(
      this._tournamentHttp
        .addTournament(this.form.value as TournamentDto)
        .subscribe((res) => {
          this._alertService.addSuccessMsg('Uspešno ste dodali turnir!');
          this._load();
          this.utakmiceSelectVisible = false;
          this.chosenGames = [];
          this.tempGames = this.games;
          this.form?.reset();
        })
    );
  }

  setUtakmiceVisibility() {
    this.utakmiceSelectVisible = !this.utakmiceSelectVisible;
  }

  dodajUtakmicu(game: GameDto) {
    this.tempGames = this.tempGames = this.tempGames.filter(
      (gameTemp) => gameTemp.id !== game.id
    );
    this.chosenGames.push(game);
  }

  izbaciUtakmicu(game: GameDto) {
    this.tempGames.push(game);
    this.chosenGames = this.chosenGames = this.chosenGames.filter(
      (gameTemp) => gameTemp.id !== game.id
    );
  }

  dodajUtakmiceUForm() {
    this.chosenGames.forEach((x: GameDto) => {
      (this.form?.controls['games'] as FormArray).push(
        this._fsGame.GetUtakmicaGroup(x)
      );
    });
  }

  obrisiTurnir(tournamentId: number) {
    this._subs.add(
      this._tournamentHttp.deleteTournament(tournamentId).subscribe((res) => {
        this._alertService.addSuccessMsg('Uspešno ste obrisali turnir!');
        this._load();
      })
    );
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  protected readonly asFormControl = asFormControl;
}
