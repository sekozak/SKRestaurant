import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  userData: Observable<any>;
  authState$: Observable<firebase.default.User | null> = this.angularFireAuth.authState;

  constructor(private angularFireAuth: AngularFireAuth,public router: Router) {
    this.userData = angularFireAuth.authState;
   }

  /* Sign up */
  SignUp(email: string, password: string, nick: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      res.user?.updateProfile({displayName:nick})
      console.log('You are Successfully signed up!', res);
    }).catch(error => {
      console.log('Something is wrong:', error.message);
    });
    this.router.navigate(['menu']); 
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
    console.log('Loged OUT');
  }


}