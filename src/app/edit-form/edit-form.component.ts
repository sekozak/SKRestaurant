import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../data';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent {
  str='';
  id:number;
  model:Data;

  constructor(private storage:StorageService, private router:ActivatedRoute) {
    this.id=this.router.snapshot.params['id'];
    this.model=this.storage.getdishlist()[this.id];
    this.str=this.model.link.toString();
  }

  senditem() {
    this.model.link=this.str.split(",");
    this.storage.editDish(this.model);
    alert('Zapisano pomyslnie');
  }
}