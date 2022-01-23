import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../authorization.service';
import { BucketStorage } from '../bucketStorage';
import { CurrencyStorageService } from '../currency-storage.service';
import { Data } from '../data';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  available:number;
  quantity:number;
  id:number;
  card: Data=new Data();
  price:number;
  currency:string="EUR";
  imgLen:number;
  ix=0;

  constructor(private bucketObject:BucketStorage, private router:ActivatedRoute,private storage:StorageService,private currencyStorage:CurrencyStorageService,private Auth: AuthorizationService) {
    this.id=this.router.snapshot.params['id'];
    this.card=this.storage.getdishlist()[this.id];

    this.quantity=this.bucketObject.getPickedNumber(this.card);
    this.available=this.card['output']-this.quantity;
    this.price=this.calculatePrice();
    this.imgLen=this.card.link.length;

  }
  ngOnInit(): void {
    this.quantity=this.bucketObject.getPickedNumber(this.card);
    this.available=this.card.output-this.quantity;
    this.price=this.calculatePrice();
  }

// --------------firebase------------


// --------------firebase------------

  addchosen() {
    this.bucketObject.pushToOrders(this.card);
    this.storage.updateChoosen(this.card.id!,this.card.choosen+1);
    this.quantity++;
    this.available=this.card.output-this.quantity;
  }
  removechosen() {
    this.bucketObject.removeFromOrders(this.card);
    this.storage.updateChoosen(this.card.id!,this.card.choosen-1);
    this.quantity--;
    this.available=this.card.output-this.quantity;
  }
  ratingUpdate(star:number){
    // this.newItemEvent3.emit([this.ix,star]);
  }

  next(){
    this.ix=(this.ix+1)%this.imgLen;
  }
  prev(){
    if(this.ix==0) this.ix=this.imgLen-1;
    else this.ix-=1;
  }


  calculatePrice(){
    let p = this.card.price;
    this.currency=this.currencyStorage.getcurrency();
    if(this.currency==='USD') p*=1.25
    return p;
  }


  ngOnChanges(){
    this.price=this.calculatePrice();
  }
}