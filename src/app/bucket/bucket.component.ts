import { Component, OnInit } from '@angular/core';
import { BucketStorage } from '../bucketStorage';
import { CurrencyStorageService } from '../currency-storage.service';
import { Data } from '../data';
import { Observer } from '../observer';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit,Observer {

  dlist:Data[]=[];
  list:Data[]=[];
  counter:Number[];
  sum:number;
  currency:string;

  constructor(private storage:StorageService,private bucketObject:BucketStorage, private currencyObject:CurrencyStorageService) {
      this.bucketObject.addObserver(this);
      this.currencyObject.addObserver(this);

      // this.list=bucketObject.getOrders();
      this.counter=bucketObject.getQuantity();

      this.getDishlist();

      this.currency=currencyObject.getcurrency();
      this.sum=this.orderSum();
  }

  ngOnInit(): void {
    this.getDishlist();
  }

  // -------------firebase-----------
  getDishlist(){ 
    this.list=[];
    this.storage.getdishlistSubject().subscribe(dish=>{
      dish.forEach(e=>{
        if(e.choosen!=0 && !this.list.includes(e)) this.list.push(e);
      });
      this.currencyConverter();
      this.sum=this.orderSum();
    });
   }

  // -----------firebase-----------
  
  orderSum(){
    let i=0,s=0;
    this.list.forEach(e => {
      s+=e.price*e.choosen;
      i++;
    });
    if(this.currency==="USD") s*=1.25;
    return s;
  }

  update(): void {
    // this.list=this.bucketObject.getOrders();
    // this.counter=this.bucketObject.getQuantity();
    // this.sum=this.orderSum();
  }

  // --------------




  currencyButton(){
    this.currencyObject.changecurrency();
  }

  updateCurrency(): void{
    if( this.currency!=this.currencyObject.getcurrency() ){
      this.currency=this.currencyObject.getcurrency();
      this.currencyConverter();
    };
  }

  prices:number[]=[];
  currencyConverter(): void{
    this.prices=[];
    let q=1;
    if(this.currency==="USD") q=1.25;
    this.list.forEach(e=>{
      this.prices.push(e.price*q);
    });
    this.sum=this.orderSum();
  }
}