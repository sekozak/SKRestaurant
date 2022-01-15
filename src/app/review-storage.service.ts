import { Injectable } from '@angular/core';
import { Cobserver } from './cobserver';
import { Data } from './data';
import { Observer } from './observer';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewStorageService implements Cobserver {
  reviews:[Review[]]=[[]];
  reviewedDishes:Data[]=[new Data()];


  public getReviews(d:Data){
    if(this.reviewedDishes.includes(d)){
      let ix=this.reviewedDishes.indexOf(d);
      return this.reviews[ix];
    }
    return [];
  }

  public pushReview(d:Data,r:Review): void{
    console.log(this.reviews);
    if(this.reviewedDishes.includes(d)){
      let ix=this.reviewedDishes.indexOf(d);
      this.reviews[ix].push(r);
    }
    else{
      this.reviewedDishes.push(d);
      this.reviews.push([r]);
    }
    console.log(this.reviews);
    this.notify();
  }


  constructor() { }

  observers:Observer[]=[];
  addObserver(o: Observer): void {
    if(!this.observers.includes(o)) this.observers.push(o);
  }
  notify(): void {
    this.observers.forEach(e => {
      e.update();
    });
  }
}
