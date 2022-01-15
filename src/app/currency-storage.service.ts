import { Injectable } from '@angular/core';
import { Cobserver } from './cobserver';
import { Observer } from './observer';

@Injectable({
  providedIn: 'root'
})
export class CurrencyStorageService implements Cobserver {
  currency:string="EUR";

  constructor() {
  }

  changecurrency(): void{
    if(this.currency==="EUR") this.currency="USD";
    else this.currency="EUR";
    this.notify();
  }

  getcurrency(): string{
    return this.currency;
  }

  observers:Observer[]=[];
  notify(): void {
      this.observers.forEach(e => {
          e.updateCurrency();
      });
  }

  addObserver(o:Observer): void {
    if(!this.observers.includes(o)) this.observers.push(o);
  }
}