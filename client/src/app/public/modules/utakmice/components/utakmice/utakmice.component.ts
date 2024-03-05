import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PlayerHttpService } from 'src/app/shared/http/player.http.service';
import { GameDto } from 'src/app/shared/models/game-dto';
import { PlayerDto } from 'src/app/shared/models/player-dto';
import { AlertService } from 'src/app/shared/services/alert.service';
import { asFormControl } from 'src/app/shared/services/useful-things.service';
import { UtakmicaFormService } from '../../services/utakmica-form.service';
import { Side } from 'src/app/shared/models/side-type';
import { FormHelperService } from 'src/app/shared/services/form-helper.service';
import { PlayerGamesDto } from 'src/app/shared/models/player-games-dto';
import { GameHttpService } from 'src/app/shared/http/game.http.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ZavrsiUtakmicuDialogComponent } from '../dialogs/zavrsi-utakmicu-dialog/zavrsi-utakmicu-dialog.component';

@Component({
  selector: 'app-utakmice',
  templateUrl: './utakmice.component.html',
  styleUrls: ['./utakmice.component.scss'],
})
export class UtakmiceComponent implements OnInit, OnDestroy {
  /** Subscription */
  private _subs: Subscription;

  /** Props */
  form: FormGroup | null;
  model: GameDto | null;
  players: PlayerDto[] = [];
  tempPlayers: PlayerDto[] = [];
  hostPlayers: PlayerDto[] = [];
  guestPlayers: PlayerDto[] = [];
  games: GameDto[] = [];
  currentGames: GameDto[] = [];

  constructor(
    private _alertService: AlertService,
    private _playerHttp: PlayerHttpService,
    private _fs: UtakmicaFormService,
    private _formHelper: FormHelperService,
    private _gameHttp: GameHttpService,
    private _dialogService: DialogService
  ) {
    this._subs = new Subscription();
    this.model = null;
    this.form = null;
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
      this._playerHttp.getAllPlayers().subscribe((res) => {
        this.players = res;
        this.tempPlayers = this.players;
      })
    );

    this._subs.add(
      this._gameHttp.getAllGames().subscribe((res) => {
        this.games = res;
      })
    );

    this._subs.add(
      this._gameHttp.getCurrentGames().subscribe((res) => {
        this.currentGames = res;
      })
    );
  }

  izaberiIgraca(player: PlayerDto, side: Side) {
    if (side === Side.HOST) {
      if (this.hostPlayers.length < 2) {
        this.hostPlayers.push(player);
        this.izbaciIgracaIzBrzePretrage(player.id!);
      }
      return;
    }

    if (this.guestPlayers.length < 2) {
      this.guestPlayers.push(player);
      this.izbaciIgracaIzBrzePretrage(player.id!);
    }
  }

  izbaciIgraca(id: number, side: Side) {
    if (side === Side.HOST) {
      this.hostPlayers = this.hostPlayers.filter((player) => player.id !== id);
    } else {
      this.guestPlayers = this.guestPlayers.filter(
        (player) => player.id !== id
      );
    }
    const player = this.players.filter((player) => player.id === id).at(0);
    this.tempPlayers.push(player!);
  }

  izbaciIgracaIzBrzePretrage(id: number) {
    this.tempPlayers = this.tempPlayers.filter((player) => player.id !== id);
  }

  obrisiUtakmicu(id?: number) {
    if (!id) {
      this._alertService.addFailedMsg(
        'Ne moguće obrisati jer utakmica ne postoji!'
      );
    }

    this._subs.add(
      this._gameHttp.deleteGame(id!).subscribe((res) => {
        this._alertService.addSuccessMsg('Uspešno ste obrisali utakmicu!');
        this._load();
      })
    );
  }

  kreirajUtakmicu() {
    if (
      this.form === null ||
      !this.form.valid ||
      this.guestPlayers.length < 2 ||
      this.hostPlayers.length < 2
    ) {
      this._formHelper.invalidateForm(this.form!);
      this._alertService.addWarnMsg('Morate popuniti sva obavezna polja!');
      return;
    }

    this.dodajIgraceUForm();

    this._subs.add(
      this._gameHttp.addGame(this.form.value as GameDto).subscribe(
        (res) => {
          this._alertService.addSuccessMsg('Uspešno ste dodali utakmicu!');
          this._load();
          this.form?.reset();
          this._resetPlayers();
        },
        (error) => {
          this._alertService.addFailedMsg('Došlo je do greške!');
        }
      )
    );
  }

  dodajIgraceUForm() {
    this.guestPlayers.forEach((x: PlayerDto) => {
      const gamePlayer = { playerId: x.id, side: Side.GUEST } as PlayerGamesDto;
      (this.form?.controls['gamePlayers'] as FormArray).push(
        this._fs.GetGamePlayersFormGroup(gamePlayer)
      );
    });

    this.hostPlayers.forEach((x: PlayerDto) => {
      const gamePlayer = { playerId: x.id, side: Side.HOST } as PlayerGamesDto;
      (this.form?.controls['gamePlayers'] as FormArray).push(
        this._fs.GetGamePlayersFormGroup(gamePlayer)
      );
    });
  }

  updateUtakmicu(game: GameDto) {
    const ref = this._dialogService.open(ZavrsiUtakmicuDialogComponent, {
      showHeader: false,
      width: '500px',
      data: {
        title: 'Dodaj rezultat utakmice',
        gameId: game.id,
        hostResult: game.hostResult,
        guestResult: game.guestResult,
      },
    });

    ref.onClose.subscribe(() => {
      this._load();
    });
  }

  private _resetPlayers() {
    this.guestPlayers = [];
    this.hostPlayers = [];
    this.tempPlayers = this.players;
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  protected readonly asFormControl = asFormControl;
}
