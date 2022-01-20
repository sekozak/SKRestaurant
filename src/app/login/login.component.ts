import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login='';
  password='';
  str='';
  constructor() { }

  ngOnInit(): void {
  }

  senditem() {
    // this.storage.pushDish();
  }

  newHero() {
    this.login='';
    this.password='';
  }

}
