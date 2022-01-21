import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login='';
  password='';
  str='';
  constructor(private authService: AuthorizationService) { }

  ngOnInit(): void {
  }

  senditem() {
    this.authService.SignIn(this.login,this.password);
  }

  newHero() {
    this.login='';
    this.password='';
  }

}
