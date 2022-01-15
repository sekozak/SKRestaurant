import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }


stars: number[] = [1, 2, 3, 4, 5];
selectedValue: number = 0;
tmpValue: number = 0;

countStar(star: number) {
    this.tmpValue=star;
    this.selectedValue = star;
    this.newItemEvent.emit(star);
  }

addClass(star: number) {
  this.tmpValue=this.selectedValue;
  this.selectedValue = star;
   }

removeClass(star: number) {
  this.selectedValue = this.tmpValue;
  }
}

