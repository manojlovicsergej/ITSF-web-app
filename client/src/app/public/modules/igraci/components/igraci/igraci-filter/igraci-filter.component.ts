import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.cities = [
      { name: 'New York', code: 'NY'},
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }
}
