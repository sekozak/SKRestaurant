import { Component, Input, OnInit } from '@angular/core';
import { BucketStorage } from '../bucketStorage';
import { CurrencyStorageService } from '../currency-storage.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit {

  @Input() info:any;
  @Input() currency='USD';
  @Input() ix=0;
  available:number;
  price:number;

quantity:number=0;
constructor(private storage:StorageService,private bucketObject:BucketStorage,private currencyStorage:CurrencyStorageService){
  this.available=0;
  this.price=this.calculatePrice();
}
ngOnInit(): void {
  this.quantity=this.bucketObject.getPickedNumber(this.info);
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