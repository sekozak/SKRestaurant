import { Component, Input, OnInit } from '@angular/core';
import { Data } from '../data';
import { Review } from '../review';
import { ReviewStorageService } from '../review-storage.service';

@Component({
  selector: 'app-dish-review',
  templateUrl: './dish-review.component.html',
  styleUrls: ['./dish-review.component.css']
})
export class DishReviewComponent implements OnInit {
  @Input() card:Data=new Data();


  constructor(private reviewStorage:ReviewStorageService){}
  
  senditem() {
    this.reviewStorage.pushReview(this.card,this.model);
  }

  ngOnInit(): void {
  }

  model = new Review('','','',new Date );

  newHero() {
    this.model = new Review('','','',new Date );
  }
}
