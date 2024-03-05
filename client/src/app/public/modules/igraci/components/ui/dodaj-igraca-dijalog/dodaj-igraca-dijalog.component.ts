import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { PlayerDto } from '../../../../../../shared/models/player-dto';
import { IgracFormService } from '../../../services/igrac-form.service';
import { FormHelperService } from '../../../../../../shared/services/form-helper.service';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { FormGroup } from '@angular/forms';
import { asFormControl } from '../../../../../../shared/services/useful-things.service';
import { PlayerHttpService } from '../../../../../../shared/http/player.http.service';

@Component({
  selector: 'app-dodaj-igraca-dijalog',
  templateUrl: './dodaj-igraca-dijalog.component.html',
  styleUrls: ['./dodaj-igraca-dijalog.component.scss'],
})
export class DodajIgracaDijalogComponent implements OnInit, OnDestroy {
  // Subs
  private _subs: Subscription;

  // props
  dialogTitle: string = '';
  form: FormGroup | null;
  model: PlayerDto | null;
  isEdit: boolean = false;

  constructor(
    private _dialogRef: DynamicDialogRef,
    private _dialogConfig: DynamicDialogConfig,
    private _fs: IgracFormService,
    private _formHelper: FormHelperService,
    private _alertService: AlertService,
    private _client: PlayerHttpService
  ) {
    this._subs = new Subscription();
    this.model = null;
    this.form = null;
  }

  ngOnInit(): void {
    // Init form
    this.form = this._fs.GetIgracGroup();

    this.dialogTitle = this._dialogConfig.data.title;
    this.model = this._dialogConfig.data.player;

    if (this.model) {
      this.patchFormByModel(this.model);
      this.isEdit = true;
    }
  }

  handleSave() {
    if (this.form === null || !this.form.valid) {
      this._formHelper.invalidateForm(this.form!);
      this._alertService.addWarnMsg('Morate popuniti sva obavezna polja!');
      this._dialogRef.close();
      return;
    }

    if (this.isEdit) {
      this._subs.add(
        this._client
          .updatePlayer(this.form.value as PlayerDto)
          .subscribe((res) => {
            this._alertService.addSuccessMsg('Uspešno ste izmenili igrača!');
            this._dialogRef.close();
            this.form?.reset();
          })
      );
    } else {
      this._subs.add(
        this._client
          .addPlayer(this.form.value as PlayerDto)
          .subscribe((res) => {
            this._alertService.addSuccessMsg('Uspešno ste dodali igrača!');
            this._dialogRef.close();
            this.form?.reset();
          })
      );
    }
  }

  handleCancel() {
    this._dialogRef.close();
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  private patchFormByModel(model: PlayerDto) {
    if (this.form != null) {
      this.form.patchValue(model);
    }
  }

  protected readonly asFormControl = asFormControl;
}
