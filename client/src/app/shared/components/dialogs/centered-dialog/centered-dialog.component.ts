import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-centered-dialog',
  templateUrl: './centered-dialog.component.html',
  styleUrls: ['./centered-dialog.component.scss']
})
export class CenteredDialogComponent implements OnInit{
  /** Props */
  shouldDisableBtn: boolean = false;

  @Input() dialogTitle: string = '';
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  handleSave() {
    this.shouldDisableBtn = true;
    this.onSave.emit();
  }

  handleCancel() {
    this.onCancel.emit();
  }
}
