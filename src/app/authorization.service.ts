import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  userData: Observable<any>;
  authState$: Observable<firebase.default.User | null> = this.angularFireAuth.authState;

  constructor(private angularFireAuth: AngularFireAuth,public router: Router,private db: AngularFirestore) {
    this.userData = angularFireAuth.authState;
   }


  /* Sign up */
  SignUp(email: string, password: string, nick: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      res.user?.updateProfile({displayName:nick});

      this.db.collection('/users').doc(`${res.user!.uid}`).set({
        uid: res.user!.uid,
        nick: nick,
        menager: false,
        admin: false,
        banned: false
      });

      // this.angularFireAuth.signOut();

      console.log('You are Successfully signed up!', res);
      console.log('Loged OUT');
    }).catch(error => {
      console.log('Something is wrong:', error.message);
    });

    this.router.navigate(['login']); 
    // this.angularFireAuth.signOut();
  } 

    
    /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
      console.log('Youre in!');
    }).catch(err => {
      console.log('Something went wrong:',err.message);
    });
    this.router.navigate(['menu']);
  }
    
    /* Sign out */
  SignOut() {
    this.angularFireAuth.signOut();
    this.router.navigate(['home']);
    console.log('Loged OUT');
  }


}