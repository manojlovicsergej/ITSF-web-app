import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit{
  /** I/O */
  @Input() value! : number;
  @Input() readonly : boolean = false;
  @Input() stars : number = 0;

  ngOnInit(): void {
    
  }

}
