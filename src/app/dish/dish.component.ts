import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BucketStorage } from '../bucketStorage';
import { CurrencyStorageService } from '../currency-storage.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})


export class DishComponent implements OnInit {
  @Input() info:any;
  @Input() currency='USD';
  @Input() ix=0;
  @Input() maxprice=0;
  @Input() minprice=0;
  available:number;
  price:number;

quantity:number=0;
constructor(private storage:StorageService,private bucketObject:BucketStorage,private currencyStorage:CurrencyStorageService){
  this.available=0;
  this.price=this.calculatePrice();
}
ngOnInit(): void {
  this.quantity=this.info.choosen;
  this.available=this.info.output-this.quantity;
  this.price=this.calculatePrice();
}


  addchosen() {
    this.storage.updateChoosen(this.info.id,this.info.choosen+1);
  }
  removechosen() {
    this.storage.updateChoosen(this.info.id,this.info.choosen-1);
  }
  cardix() {
    this.storage.deleteDishFromFire(this.info.id);
    this.bucketObject.removeAllFromOrders(this.info);
  }

  calculatePrice(){
    let p = this.storage.getDichPrice(this.ix);
    this.currency=this.currencyStorage.getcurrency();
    if(this.currency==='USD') p*=1.25;
    return p;
  }


  ngOnChanges(){
    this.price=this.calculatePrice();
  }

  add(){
    this.quantity++;
    this.available=this.info.output-this.quantity;
  }
  remove(){
    this.quantity--;
    this.available=this.info.output-this.quantity;
  }

}