import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PublicComponent } from './public.component';
import { IgraciModule } from './modules/igraci/igraci.module';
import { TurnirModule } from './modules/turnir/turnir.module';
import { UtakmiceModule } from './modules/utakmice/utakmice.module';
import { DashboardResolver } from './modules/dashboard/resolvers/dashboard-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => DashboardModule,
        resolve: {
          dashboardData: DashboardResolver,
        },
        data: {
          breadcrumb: {
            label: 'Dashboard',
            disable: true,
          },
        },
      },
      {
        path: 'igraci',
        loadChildren: () => IgraciModule,
        data: {
          breadcrumb: {
            label: 'Igrači',
            disable: true,
          },
        },
      },
      {
        path: 'utakmice',
        loadChildren: () => UtakmiceModule,
        data: {
          breadcrumb: {
            label: 'Utakmice',
            disable: true,
          },
        },
      },
      {
        path: 'turnir',
        loadChildren: () => TurnirModule,
        data: {
          breadcrumb: {
            label: 'Turnir',
            disable: true,
          },
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
