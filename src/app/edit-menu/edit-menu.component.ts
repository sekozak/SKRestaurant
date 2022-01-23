import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { BucketStorage } from '../bucketStorage';
import { CurrencyStorageService } from '../currency-storage.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  currency: string;
  
  public dishlist:Data[]=[];

  constructor(private storage:StorageService,private bucketObject:BucketStorage,private currencyObject:CurrencyStorageService) {
    this.currencyObject.addObserver(this);
    this.currency=currencyObject.getcurrency();

    this.getDishlist();
  }
  ngOnInit(): void{ this.getDishlist();}

  getDishlist(){
    this.storage.getdishlistSubject().subscribe(dish=>{
      this.updateQuantity();
      this.dishlist=dish
    });
    this.updateQuantity();;
  }

// -------------firebase--------------

// -------------firebase--------------



  ratingUpdate(tab: number[]){
    // this.dishlist[tab[0]].rating=tab[1];
  }


  chosen=0;
  updateQuantity(){
    this.chosen=0;
    this.dishlist.forEach(e => {
      this.chosen+=e['choosen'];
    });
  }


  // -------------currency------


  update(): void {}

  updateCurrency(): void{
    if( this.currency!=this.currencyObject.getcurrency() ){
      this.currency=this.currencyObject.getcurrency();
      this.currencyConverter();
    };
  }

  currencyButton(){
    this.currencyObject.changecurrency();
  }

  pricesCurrency:number[]=[];
  currencyConverter(): void{
    this.pricesCurrency=[];
    let q=1;
    if(this.currency==="USD") q=1.25;
    this.dishlist.forEach(e=>{
      this.pricesCurrency.push(e['price']*q);
    })
  }
}
