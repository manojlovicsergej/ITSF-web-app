import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { CenteredDialogComponent } from './components/dialogs/centered-dialog/centered-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldComponent } from './components/ui/field/field.component';
import { ChipsModule } from 'primeng/chips';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { RatingComponent } from './components/ui/rating/rating.component';
import { CalendarComponent } from './components/ui/calendar/calendar.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NumberWithStepsComponent } from './components/ui/number-with-steps/number-with-steps.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@NgModule({
  declarations: [
    CenteredDialogComponent,
    FieldComponent,
    RatingComponent,
    CalendarComponent,
    NumberWithStepsComponent,
  ],
  imports: [
    CommonModule,
    ChipsModule,
    InputTextModule,
    ChipModule,
    ButtonModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    RatingModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    InputNumberModule,
    ScrollPanelModule,
  ],
  exports: [
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    CommonModule,
    CalendarModule,
    ChipsModule,
    RatingModule,
    InputTextModule,
    ChipModule,
    CenteredDialogComponent,
    FieldComponent,
    RatingComponent,
    CalendarComponent,
    ConfirmPopupModule,
    ConfirmDialogModule,
    InputNumberModule,
    NumberWithStepsComponent,
    ScrollPanelModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class SharedModule {}
