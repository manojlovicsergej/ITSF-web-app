import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { GameHttpService } from 'src/app/shared/http/game.http.service';
import { ZavrsiUtakmicuDto as ZavrsiUtakmicuDto } from 'src/app/shared/models/zavrsi-utakmicu-dto';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormHelperService } from 'src/app/shared/services/form-helper.service';
import { asFormControl } from 'src/app/shared/services/useful-things.service';

@Component({
  selector: 'app-zavrsi-utakmicu-dialog',
  templateUrl: './zavrsi-utakmicu-dialog.component.html',
  styleUrls: ['./zavrsi-utakmicu-dialog.component.scss'],
})
export class ZavrsiUtakmicuDialogComponent implements OnInit, OnDestroy {
  /** Subs */
  private _subs: Subscription;

  /** Props */
  form: FormGroup;
  dialogTitle: string = '';

  constructor(
    private fb: FormBuilder,
    private _dialogRef: DynamicDialogRef,
    private _dialogConfig: DynamicDialogConfig,
    private _formHelper: FormHelperService,
    private _alertService: AlertService,
    private _gameHttp: GameHttpService
  ) {
    this._subs = new Subscription();
    this.form = this.fb.group({
      gameId: [null, Validators.required],
      hostResult: [null, Validators.required],
      guestResult: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.dialogTitle = this._dialogConfig.data.title;
    this.form.controls['gameId'].patchValue(this._dialogConfig.data.gameId);
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  handleSave() {
    if (this.form === null || !this.form.valid) {
      this._formHelper.invalidateForm(this.form!);
      this._alertService.addWarnMsg('Morate popuniti sva obavezna polja!');
      this._dialogRef.close();
      return;
    }

    this._subs.add(
      this._gameHttp
        .updateGame(this.form.value as ZavrsiUtakmicuDto)
        .subscribe(() => {
          this._alertService.addSuccessMsg('Utakmica je uspešno završena!');
          this._dialogRef.close();
        })
    );
  }

  handleCancel() {
    this._dialogRef.close();
  }

  protected readonly asFormControl = asFormControl;
}
