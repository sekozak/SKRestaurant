import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { User } from '../user';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  userlist:User[]=[];
  constructor(private storage:StorageService) {
    this.getUserlist();
   }

   b=true;

  getUserlist(){
  this.storage.getuserlistSubject().subscribe(u=>{
    this.userlist=u;
    });
  }

  changeMenager(u:User){
    this.storage.changeMenager(u);
  }
  changeAdmin(u:User){
    this.storage.changeAdmin(u);
  }
  changeBanned(u:User){
    if(u.admin) alert("Can't ban ADMIN")
    else this.storage.changeBanned(u);
  }


  ngOnInit(): void {
  }

}
