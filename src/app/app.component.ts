import { Component } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { StorageService } from './storage.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logged!: boolean;
  admin!: boolean;
  menager!: boolean;
  nick:string='---';
  userlist:User[]=[];
  constructor(public Auth: AuthorizationService, private storage:StorageService){
    this.Auth.authState$.subscribe(state => {
      if(state !== null) this.logged=true; 
      else this.logged=false; 
    });

    this.getUserlist();
  }


  getUserlist(){
    this.storage.getuserlistSubject().subscribe(u=>{
      this.userlist=u;

      this.Auth.authState$.subscribe(state => {
        this.userlist.forEach(x =>{
          if(x.id === state?.uid){
            this.nick=x.nick;
            if(x.admin) this.admin=true;
            else this.admin=false;
            if(x.menager) this.menager=true;
            else this.menager=false;
          };
        });
      });

      console.log(this.userlist);
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
    this.nick='---';
    this.Auth.SignOut();
  }

}