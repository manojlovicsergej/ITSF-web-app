import { NgModule } from '@angular/core';
import { UtakmiceRoutingModule } from './utakmice-routing.module';
import { UtakmiceComponent } from './components/utakmice/utakmice.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ZavrsiUtakmicuDialogComponent } from './components/dialogs/zavrsi-utakmicu-dialog/zavrsi-utakmicu-dialog.component';

@NgModule({
  declarations: [UtakmiceComponent, ZavrsiUtakmicuDialogComponent],
  imports: [UtakmiceRoutingModule, SharedModule],
  providers: [],
  bootstrap: [UtakmiceComponent],
})
export class UtakmiceModule {}
