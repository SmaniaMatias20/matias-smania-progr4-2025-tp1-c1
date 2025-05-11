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

  /* 
  * Método que muestra el formulario de inicio de sesión al cambiar la variable isLoginVisible a true.
  */
  showLogin() {
    this.isLoginVisible = true;
  }

  /* 
  * Método que muestra el formulario de registro al cambiar la variable isLoginVisible a false.
  */
  showRegister() {
    this.isLoginVisible = false;
  }
}
