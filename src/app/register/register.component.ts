import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  login='';
  nick='';
  password='';
  str='';
  constructor(private authService: AuthorizationService,private storage:StorageService) { }

  ngOnInit(): void {
  }

  senditem() {
    this.authService.SignUp(this.login,this.password,this.nick);
  }


  newHero() {
    this.nick='';
    this.login='';
    this.password='';
  }

}