import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';
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
constructor(private storage:StorageService,private bucketObject:BucketStorage,private currencyStorage:CurrencyStorageService,private Auth: AuthorizationService, private router:Router){
  this.available=0;
  this.price=this.calculatePrice();
}
ngOnInit(): void {
  this.quantity=this.bucketObject.getPickedNumber(this.info);
  this.available=this.info.output-this.quantity;
  this.price=this.calculatePrice();
}


  addchosen() {
    this.Auth.authState$.subscribe(state => {
      if(state === null) this.router.navigate(['login']);
      else{
        this.bucketObject.pushToOrders(this.info);
        this.storage.updateChoosen(this.info.id,this.info.choosen+1);
        this.quantity++;
        this.available=this.info.output-this.quantity;
      } 
    });
  }
  removechosen() {
    this.Auth.authState$.subscribe(state => {
      if(state === null) this.router.navigate(['login']);
      else{
        this.bucketObject.removeFromOrders(this.info);
        this.storage.updateChoosen(this.info.id,this.info.choosen-1);
        this.quantity--;
        this.available=this.info.output-this.quantity;
      }
    });
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

}