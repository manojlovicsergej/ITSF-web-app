import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IgraciComponent } from './components/igraci/igraci.component';

const routes: Routes = [
  {
    path: '',
    component: IgraciComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IgraciRoutingModule {}
