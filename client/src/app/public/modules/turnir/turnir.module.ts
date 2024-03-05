import { NgModule } from '@angular/core';

import { TurnirRoutingModule } from './turnir-routing-module';
import { TurnirComponent } from './components/turnir/turnir.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TurnirComponent],
  imports: [TurnirRoutingModule, SharedModule],
  providers: [],
})
export class TurnirModule {}
