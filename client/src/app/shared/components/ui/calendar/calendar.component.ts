import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { asFormControl } from 'src/app/shared/services/useful-things.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  /** I/O */
  @Input() formCtrl!: FormControl;
  @Input() dateFormat: string = 'dd.mm.yy';

  ngOnInit(): void {}

  protected readonly asFormControl = asFormControl;
}
