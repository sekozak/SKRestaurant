import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthorizationService } from './authorization.service';
import { Bobserver } from './bobserver';
import { Data } from './data';
import { Observer } from './observer';
import { StorageService } from './storage.service';


@Injectable({
    providedIn: 'root'
})
export class BucketStorage implements Bobserver {
    bucketlist:any[]=[];
    
    orders:Data[]=[];
    count:number[]=[];

    constructor( private db: AngularFirestore, private Auth: AuthorizationService, private storage:StorageService ){
        this.getBucketlist();
    }

    getBucketlist(){
        this.storage.getbucketlistSubject().subscribe(b=>{
          this.bucketlist=b;
          this.Auth.authState$.subscribe(state => {
            if(state!==null) this.getBucket(state.uid);
          });

        });
    }
    getBucket(id:string){
        this.bucketlist.forEach(e=>{
            if(id===e.id){
                console.log(e.dish,e.quantity);
                this.orders=e.dish;
                this.count=e.quantity;
                this.notify();
            }
        });
    }


    getOrders(){
        return this.orders;
    }
    getQuantity(){
        return this.count;
    }

    updateBucket(){
        this.Auth.authState$.subscribe(state => {
            if(state!==null){
                this.db.collection('/buckets').doc(state.uid).update({dish:this.orders});
                this.db.collection('/buckets').doc(state.uid).update({quantity:this.count});
            }
          });
        this.notify();
    }


    contain(d:Data){
        let bool=-1;
        this.orders.forEach(x=>{
            if(x.id===d.id) bool=this.orders.indexOf(x);
        });
        return bool;
    }

    pushToOrders(d:Data){
        if(this.contain(d)!=-1){
            let ix=this.contain(d);
            this.count[ix]=+this.count[ix] + +1;
        }
        else{ 
            this.orders.push(d);
            this.count.push(1);
        }
        this.updateBucket();
    }

    public removeFromOrders(d:Data){
        let ix=this.contain(d);
        if(this.count[ix]>1){
            this.count[ix]=+this.count[ix] - +1;
        }
        else{ 
            this.orders.splice(ix,1);
            this.count.splice(ix,1);
        }
        this.updateBucket();
    }


    public removeAllFromOrders(d:Data){
        // if(this.orders.includes(d)){
        //     let ix=this.orders.indexOf(d);
        //     this.orders.splice(ix,1);
        //     this.count.splice(ix,1);
        // }
        // this.notify();
    }

    public getPickedNumber(d:Data){
        if(this.contain(d)!=-1){
            return this.count[this.contain(d)];
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