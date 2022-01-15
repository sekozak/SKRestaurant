import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  model = new Data();
  str='';

  constructor(private storage:StorageService) {}



  senditem() {
    // this.storage.create(this.model);

    this.model.link=this.str.split(",");
    this.storage.pushDish(this.model);
  }

  ngOnInit(): void {}


  newHero() {
    this.model = new Data();
  }
}