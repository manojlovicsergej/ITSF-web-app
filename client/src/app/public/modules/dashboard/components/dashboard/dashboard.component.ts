import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardDto } from 'src/app/shared/models/dashboard-dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private _route: ActivatedRoute) { }
  
  dashboardData: DashboardDto = {} as DashboardDto;

  ngOnInit(): void {
    this.dashboardData = this._route.snapshot.data['dashboardData'];
  }
}
