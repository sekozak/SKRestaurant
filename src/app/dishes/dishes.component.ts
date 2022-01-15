import { Component, OnInit} from '@angular/core';
import { Data } from '../data';
import { BucketStorage } from '../bucketStorage';
import { Observer } from '../observer';
import { CurrencyStorageService } from '../currency-storage.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})

export class DishesComponent implements OnInit, Observer {
  searchType='';
  searchCountry='';
  searchRating=0;
  searchPrice=[0,0];
  currency: string;

  setRating(q:number){
    this.searchRating=q;
  }
  setPrice(q:number[]){
    this.searchPrice=q;
  }
  setCountry(q:string){
    this.searchCountry=q;
  }
  setType(q:string){
    this.searchType=q;
  }
  
  public dishlist:Data[]=[];

  constructor(private storage:StorageService,private bucketObject:BucketStorage,private currencyObject:CurrencyStorageService) {
    this.currencyObject.addObserver(this);
    this.currency=currencyObject.getcurrency();

    this.getDishlist();
  }
  ngOnInit(): void{ this.getDishlist();}

  getDishlist(){
    this.storage.getdishlistSubject().subscribe(dish=>{
      this.findMinMax();
      this.findcountry();
      this.findtype();
      this.findprice();
      this.updateQuantity();
      this.dishlist=dish
    });
    this.updateQuantity();;
  }


// -------------firebase--------------


// -------------firebase--------------


  maxprice=0;minprice=0;
  tab:number[]=[];
  tab2:number[]=[];
  findMinMax(){ 
    this.maxprice=Math.max.apply(Math, this.dishlist.map(function(o) { return o.price; }))
    this.minprice=Math.min.apply(Math, this.dishlist.map(function(o) { return o.price; }))
  }

  countrylist:string[]=[];
  findcountry(){
    this.countrylist=[];
    for(let i=0; i<this.dishlist.length; i++){
      let q=this.dishlist[i].country;
      q=q[0].toUpperCase()+q.substring(1);
      if(!this.countrylist.includes(q)) this.countrylist.push(q);
    }
  }
  typelist:string[]=[];
  findtype(){
    this.typelist=[];
    for(let i=0; i<this.dishlist.length; i++){
      let q=this.dishlist[i].type;
      q=q[0].toUpperCase()+q.substring(1);
      if(!this.typelist.includes(q)) this.typelist.push(q);
    }
  }
  prices:number[]=[];
  pricelist:[number[]]=[[]];
  findprice(){
    this.prices=[];
    this.pricelist=[[]];
    if(this.maxprice!=0){
      let delta=this.maxprice -this.minprice;
      let m=this.minprice;
      this.prices.push(m);
      for(let i=1;i<5;i++){
        if(delta>i*20){
          this.prices.push( +m + +(i*20) );
        }
      }
      this.prices.push(+this.maxprice + +1);
      for(let i=1;i<this.prices.length;i++){
        let x=this.prices[i-1];
        let y=this.prices[i]-1;
        this.pricelist.push([x,y]);
      }
    }
    this.pricelist.splice(0,1);
  }


  ratingUpdate(tab: number[]){
    // this.dishlist[tab[0]].rating=tab[1];
  }


  chosen=0;
  updateQuantity(){
    this.chosen=0;
    this.dishlist.forEach(e => {
      this.chosen+=e.choosen;
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
      this.pricesCurrency.push(e.price*q);
    })
  }
}