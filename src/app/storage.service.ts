import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Cobserver } from './cobserver';
import { Data } from './data';
import { Observer } from './observer';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements Cobserver{
  dishlist:Data[];
  dishSubject:BehaviorSubject<Data[]>;
  // new Data('Obiad2','włoska','kolacja','bataty stek salata',7,100,'pyszny fest git','/assets/meal.jpg',1),
  // new Data('Kompot','polska','napoj','woda truskawki',117,4,'pyszny super git','/assets/kompot.jpeg',0),
  // new Data('Kolacja1','włoska','miesny','ziemniaki kotlet salata',17,18,'pyszny obiad git','/assets/meal.jpg,/assets/kompot.jpeg',0),
  // new Data('Obiad4','Polska','miesny','ziemniaki kotlet salata',15,10,'pyszny obiad git','/assets/meal.jpg',0),


  private dbPath = '/dishes';
  dishesList : AngularFirestoreCollection<Data>;
  constructor(private db: AngularFirestore) {
    this.dishlist=[];
    this.dishSubject = new BehaviorSubject<Data[]>(this.dishlist);
    this.dishesList = db.collection(this.dbPath);
    this.getDishlistFromFire();
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

  public pushDish(d:Data): void{
    this.dishesList.add({...d});
  }

  public getDichPrice(ix:number){
    return this.dishlist[ix].price;
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
