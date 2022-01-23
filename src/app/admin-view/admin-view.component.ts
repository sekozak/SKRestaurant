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


  getUserlist(){
  this.storage.getuserlistSubject().subscribe(u=>{
    this.userlist=u;
    });
  }


  ngOnInit(): void {
  }

}
