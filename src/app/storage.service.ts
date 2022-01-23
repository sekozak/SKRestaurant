import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Cobserver } from './cobserver';
import { Data } from './data';
import { Observer } from './observer';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements Cobserver{
  dishlist:Data[];
  dishSubject:BehaviorSubject<Data[]>;

  userlist:User[];
  userSubject: BehaviorSubject<User[]>;

  bucketlist:any[];
  bucketSubject: BehaviorSubject<any[]>;

  bucketsList : AngularFirestoreCollection<any>;
  dishesList : AngularFirestoreCollection<any>;
  usersList : AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore) {
    this.dishlist=[];
    this.userlist=[];
    this.bucketlist=[];
    this.bucketSubject = new BehaviorSubject<any[]>(this.bucketlist);
    this.dishSubject = new BehaviorSubject<Data[]>(this.dishlist);
    this.userSubject = new BehaviorSubject<User[]>(this.userlist);
    this.bucketsList = this.db.collection('/buckets');
    this.usersList = this.db.collection('/users');
    this.dishesList = this.db.collection('/dishes');
    this.getDishlistFromFire();
    this.getUserListFromFire();
    this.getBucketListFromFire();
  }



  // ------------firebase------------

  getDishlistFromFire(): void {
    this.dishesList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.dishlist = data;
      this.dishSubject.next(this.dishlist);
    }); 
  }

  getUserListFromFire(){
    this.usersList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({
            id: c.payload.doc.id,
            nick: c.payload.doc.data().nick,
            admin: c.payload.doc.data().admin,
            menager: c.payload.doc.data().menager,
            banned: c.payload.doc.data().banned,
          })
        ))
    ).subscribe(x =>{
       this.userlist = x;
       this.userSubject.next(this.userlist);
      });
  }

  getBucketListFromFire(){
    this.bucketsList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({
            id: c.payload.doc.id,
            dish: c.payload.doc.data().dish,
            quantity: c.payload.doc.data().quantity,
          })
        ))
    ).subscribe(x =>{
       this.bucketlist = x;
       this.bucketSubject.next(this.bucketlist);
      });
  }

  deleteDishFromFire(id:string){
    this.dishesList.doc(id).delete();
    this.getDishlistFromFire();
  }

  updateChoosen(id:string,q:number){
    this.dishesList.doc(id).update({choosen: q});
  }


  // ------------firebase------------

  public getdishlistSubject(): Observable<Data[]>{
    return this.dishSubject.asObservable();
  }
  public getdishlist(){
    return this.dishlist;
  }

  public getuserlistSubject(): Observable<User[]>{
    return this.userSubject.asObservable();
  }
  public getuserlist(){
    return this.userlist;
  }

  public getbucketlistSubject(): Observable<User[]>{
    return this.bucketSubject.asObservable();
  }
  public getbucketlist(){
    return this.bucketlist;
  }

  public pushDish(d:Data): void{
    const data = {
      name:d.name,
      country:d.country,
      type:d.type,
      ingredients:d.ingredients,
      output:d.output,
      price:d.price, 
      description:d.description,
      link:d.link,
      choosen:d.choosen
    }
    this.dishesList.add({...data});
  }

  public editDish(d:Data): void{
    this.dishesList.doc(d.id).set(d);
  }


  public getDichPrice(ix:number){
    return this.dishlist[ix].price;
  }


  changeMenager(u:User){
    let bool=true;
    if(u.menager) bool=false;
    this.usersList.doc(u.id).update({menager: bool});
  }
  changeAdmin(u:User){
    let bool=true;
    if(u.admin) bool=false;
    this.usersList.doc(u.id).update({admin: bool});
  }
  changeBanned(u:User){
    let bool=true;
    if(u.banned) bool=false;
    this.usersList.doc(u.id).update({banned: bool});
  }




  observers:Observer[]=[];
  addObserver(o: Observer): void {
    if(!this.observers.includes(o)) this.observers.push(o);
  }
  notify(): void {
    this.observers.forEach(e => {
      e.update();
  });
  }
}
