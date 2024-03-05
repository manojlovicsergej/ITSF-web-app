import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-number-with-steps',
  templateUrl: './number-with-steps.component.html',
  styleUrls: ['./number-with-steps.component.scss']
})
export class NumberWithStepsComponent implements OnInit{
  /** Props */
  @Input() formCtrl!: FormControl;
  
  ngOnInit(): void {
    
  }

}
