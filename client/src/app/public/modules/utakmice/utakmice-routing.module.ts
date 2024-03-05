import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtakmiceComponent} from './components/utakmice/utakmice.component';

const routes: Routes = [
  {
    path: '',
    component: UtakmiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtakmiceRoutingModule {}
