import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@Component({
  selector: 'app-auth',
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginVisible: boolean = true;

  showLogin() {
    this.isLoginVisible = true;
  }

  showRegister() {
    this.isLoginVisible = false;
  }
}
