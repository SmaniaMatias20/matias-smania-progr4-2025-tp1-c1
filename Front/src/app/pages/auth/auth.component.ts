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

  /**
   * Muestra el formulario de inicio de sesión.
   * Establece `isLoginVisible` en `true`.
   * 
   * @returns {void} - No retorna ningún valor.
   */
  showLogin(): void {
    this.isLoginVisible = true;
  }


  /**
   * Muestra el formulario de registro.
   * Establece `isLoginVisible` en `false`.
   * 
   * @returns {void} - No retorna ningún valor.
   */
  showRegister(): void {
    this.isLoginVisible = false;
  }
}
