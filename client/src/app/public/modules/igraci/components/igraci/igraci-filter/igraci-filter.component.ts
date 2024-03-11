import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PlayerFilterRequest } from 'src/app/shared/models/player-filter-request';
import { Position } from 'src/app/shared/models/position-type';
import { asFormControl } from 'src/app/shared/services/useful-things.service';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-igraci-filter',
  templateUrl: './igraci-filter.component.html',
  styleUrls: ['./igraci-filter.component.scss'],
})
export class IgraciFilterComponent implements OnInit {
  cities: City[] | undefined;
  selectedCity: City | undefined;

  form!: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    // init form
    this.form = this._fb.group<PlayerFilterRequest>({
      position: new FormControl(undefined),
      rating: new FormControl(null),
      winrate: new FormControl(null),
    });

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  protected readonly asFormControl = asFormControl;
}
