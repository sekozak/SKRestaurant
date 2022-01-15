import { Component, Input, OnInit } from '@angular/core';
import { Data } from '../data';
import { Observer } from '../observer';
import { Review } from '../review';
import { ReviewStorageService } from '../review-storage.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit, Observer {
  @Input() card:Data=new Data();

  reviews:Review[];
  constructor(private reviewObject: ReviewStorageService) {
    reviewObject.addObserver(this);
    this.reviews=reviewObject.getReviews(this.card);
  }
  
  update(): void {
    this.reviews=this.reviewObject.getReviews(this.card);
  }
  updateCurrency(): void {}

  ngOnInit(): void {
    this.reviews=this.reviewObject.getReviews(this.card);
  }

}
