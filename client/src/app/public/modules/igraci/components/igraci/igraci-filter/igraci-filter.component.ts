import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PlayerHttpService } from 'src/app/shared/http/player.http.service';
import { PlayerDto } from 'src/app/shared/models/player-dto';
import { PlayerFilterRequest } from 'src/app/shared/models/player-filter-request';
import { Position } from 'src/app/shared/models/position-type';
import { asFormControl } from 'src/app/shared/services/useful-things.service';
import { IgraciService } from '../igraci.service';

@Component({
  selector: 'app-igraci-filter',
  templateUrl: './igraci-filter.component.html',
  styleUrls: ['./igraci-filter.component.scss'],
})
export class IgraciFilterComponent implements OnInit, OnDestroy {
  private _subs: Subscription = new Subscription();

  form!: FormGroup;
  selectedPlayers: PlayerDto[] = [];

  constructor(
    private _fb: FormBuilder,
    private _playerClient: PlayerHttpService,
    private _igraciService: IgraciService
  ) {}

  ngOnInit(): void {
    // init form
    this.form = this.GetPlayerFilterRequestFormGroup();

    this.form.valueChanges.subscribe(() => {
      this._igraciService.setSelectedPlayers = this._loadAllPlayers();
    });
  }

  private _loadAllPlayers(): PlayerDto[] {
    this._subs.add(
      this._playerClient
        .getAllPlayersByFilter(this.form.value)
        .subscribe((res) => {
          this.selectedPlayers = res;
        })
    );
    return this.selectedPlayers;
  }

  resetFilter() {
    this.form.reset();
  }

  public GetPlayerFilterRequestFormGroup(
    model?: PlayerFilterRequest
  ): FormGroup {
    return this._fb.group({
      position: new FormControl(Position.EMPTY),
      winrate: new FormControl(null),
      rating: new FormControl(null),
    });
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  protected readonly asFormControl = asFormControl;
}
