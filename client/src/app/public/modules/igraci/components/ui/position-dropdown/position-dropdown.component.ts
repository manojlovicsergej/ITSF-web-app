import {Component, Input, OnInit} from '@angular/core';
import {SelectItem} from "primeng/api";
import {FormControl} from "@angular/forms";
import {Position} from "../../../../../../shared/models/position-type";

@Component({
  selector: 'app-position-dropdown',
  templateUrl: './position-dropdown.component.html',
  styleUrls: ['./position-dropdown.component.scss']
})
export class PositionDropdownComponent implements OnInit {
  /** Props */
  items: SelectItem[];
  @Input() formCtrl: FormControl;
  @Input() formCtrlId: string;

  constructor() {
    this.items = [];
    this.formCtrl = new FormControl();
    this.formCtrlId = '';
  }
  ngOnInit(): void {
    this.items = [
      {
        label: "Napadač",
        value: Position.ATTACKER,
      },
      {
        label: "Odbrana",
        value: Position.DEFENDER
      }
    ]
  }
}
