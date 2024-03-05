import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnirComponent } from './components/turnir/turnir.component';

const routes: Routes = [
  {
    path: '',
    component: TurnirComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TurnirRoutingModule {}
