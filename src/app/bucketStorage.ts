import { Injectable } from '@angular/core';
import { Bobserver } from './bobserver';
import { Data } from './data';
import { Observer } from './observer';


@Injectable({
    providedIn: 'root'
})
export class BucketStorage implements Bobserver {
    orders:Data[]=[];
    count:number[]=[];


    public getOrders(){
        return this.orders;
    }

    public getQuantity(){
        return this.count;
    }

    public pushToOrders(d:Data){
        if(this.orders.includes(d)){
            let ix=this.orders.indexOf(d);
            this.count[ix]=+this.count[ix] + +1;
        }
        else{ 
            this.orders.push(d);
            this.count.push(1);
        }
        this.notify();
    }

    public removeFromOrders(d:Data){
        let ix=this.orders.indexOf(d);
        if(this.count[ix]>1){
            this.count[ix]=+this.count[ix] - +1;
        }
        else{ 
            this.orders.splice(ix,1);
            this.count.splice(ix,1);
        }
        this.notify();
    }

    public removeAllFromOrders(d:Data){
        if(this.orders.includes(d)){
            let ix=this.orders.indexOf(d);
            this.orders.splice(ix,1);
            this.count.splice(ix,1);
        }
        this.notify();
    }

    public getPickedNumber(d:Data){
        if(this.orders.includes(d)){
            let ix=this.orders.indexOf(d);
            return this.count[ix];
        } 
        else return 0;
    }


    observers:Observer[]=[];
    notify(): void {
        this.observers.forEach(e => {
            e.update();
        });
    }

    addObserver(o:Observer): void {
       this.observers.push(o);
    }
}