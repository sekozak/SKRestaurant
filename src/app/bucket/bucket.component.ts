import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { BucketStorage } from '../bucketStorage';
import { CurrencyStorageService } from '../currency-storage.service';
import { Data } from '../data';
import { Observer } from '../observer';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit,Observer {

  list:Data[]=[];
  counter:number[]=[];
  sum:number;
  currency:string;

  constructor(private bucketObject:BucketStorage, private currencyObject:CurrencyStorageService,private Auth: AuthorizationService) {
      this.bucketObject.addObserver(this);
      this.currencyObject.addObserver(this);

      this.Auth.authState$.subscribe(state => {
        if(state!==null){
          this.list=bucketObject.getOrders();
          this.counter=bucketObject.getQuantity();
          this.currencyConverter();
        }
      });


      this.currency=currencyObject.getcurrency();
      this.sum=this.orderSum();

  }

  ngOnInit(): void {}

  // -------------firebase-----------

  // -----------firebase-----------
  
  orderSum(){
    let i=0,s=0;
    this.list.forEach(e => {
      s+=e.price*this.counter[i];
      i++;
    });
    if(this.currency==="USD") s*=1.25;
    return s;
  }

  update(): void {
    this.list=this.bucketObject.getOrders();
    this.counter=this.bucketObject.getQuantity();
    this.sum=this.orderSum();
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