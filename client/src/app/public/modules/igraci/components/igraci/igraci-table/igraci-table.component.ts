import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DodajIgracaDijalogComponent } from '../../ui/dodaj-igraca-dijalog/dodaj-igraca-dijalog.component';
import { PlayerHttpService } from 'src/app/shared/http/player.http.service';
import { Subscription } from 'rxjs';
import { PlayerDto } from 'src/app/shared/models/player-dto';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-igraci-table',
  templateUrl: './igraci-table.component.html',
  styleUrls: ['./igraci-table.component.scss'],
})
export class IgraciTableComponent implements OnInit {
  /** Subs */
  _subs: Subscription;

  /** Props */
  players: PlayerDto[] = [];

  constructor(
    private _playerHttp: PlayerHttpService,
    private _dialogService: DialogService,
    private _alertService: AlertService,
    private confirmationService: ConfirmationService
  ) {
    this._subs = new Subscription();
  }

  ngOnInit(): void {
    this._load();
  }

  private _load() {
    this._subs.add(
      this._playerHttp.getAllPlayers().subscribe((res) => {
        this.players = res;
      })
    );
  }

  crudPlayer(player?: PlayerDto) {
    const ref = this._dialogService.open(DodajIgracaDijalogComponent, {
      showHeader: false,
      width: '600px',
      data: {
        player: player ?? null,
        title: player ? 'Izmena igrača' : 'Dodavanje novog igrača',
      },
    });

    ref.onClose.subscribe(() => {
      this._load();
    });
  }

  deletePlayer(playerId: number) {
    this.confirmationService.confirm({
      header : 'Brisanje igrača',
      message: 'Da li ste sigurni da želite da obrišete igrača?',
      acceptLabel: "Da",
      rejectLabel: "Ne",
      accept: () => {
        this._subs.add(
          this._playerHttp.deletePlayer(playerId).subscribe((res) => {
            this._alertService.addSuccessMsg('Igrač je uspešno obrisan!');
            this._load();
          })
        );
      },
      reject: () => {
        this.confirmationService.close();
      },
    });
    
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
}
