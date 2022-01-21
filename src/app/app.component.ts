import { Component } from '@angular/core';
import { AuthorizationService } from './authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logged!:boolean;
  nick:string='---';
  constructor(public Auth: AuthorizationService){
    this.Auth.authState$.subscribe(state => {
      if(state !== null) this.logged=true; 
      else this.logged=false; 
    });
    this.Auth.authState$.subscribe(state => {
      if(state?.displayName != null) this.nick=state.displayName;
    });
  }
  menuOpen = false;
  toogle(){
    if(!this.menuOpen) {
      this.menuOpen = true;
    } else {
      this.menuOpen = false;
    }
  }

  logout(){
    this.Auth.SignOut();
  }

}