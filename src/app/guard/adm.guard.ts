import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthorizationService } from '../authorization.service';
import { StorageService } from '../storage.service';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AdmGuard implements CanActivate {
  userlist:User[]=[];
  constructor( public authService: AuthorizationService, public router: Router, private storage:StorageService ){
    this.getUserlist();
  }

  getUserlist(){
    this.storage.getuserlistSubject().subscribe(u=>{
      this.userlist=u;
    });
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.authState$.pipe(map(state =>{
      let bool=false;
      this.userlist.forEach(x =>{
        if(x.id === state?.uid && x.admin) bool=true;
      });
      if(!bool){ this.router.navigate(['home']); return false;}
      return true;
    }));
  }
}
