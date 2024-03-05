import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { DashboardHttpService } from 'src/app/shared/http/dashboard.http.service';
import { DashboardDto } from 'src/app/shared/models/dashboard-dto';

@Injectable({
  providedIn: 'root',
})
export class DashboardResolver implements Resolve<DashboardDto> {
  constructor(private _client: DashboardHttpService) {}
  errorHandler: any;

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<DashboardDto> | Promise<DashboardDto> | DashboardDto {
    return this._client.getDashboardData().pipe(
      map((res) => {
        return res;
      }),
      catchError(this.errorHandler),
      finalize(() => {})
    );
  }
}
