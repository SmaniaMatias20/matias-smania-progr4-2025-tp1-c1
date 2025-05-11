import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string = '';
  isError: boolean = false;
  isPasswordVisible: boolean = false;


  /**
  * Constructor que inyecta el servicio de autenticación y el router.
  * @param fb Servicio para construir formularios reactivos.
  * @param authService Servicio para la gestión de autenticación.
  */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]

    });
  }

  /**
  * Método que cambia la visibilidad de la contraseña.
  * 
  * @returns {void} - No retorna ningún valor, solo cambia el estado de visibilidad de la contraseña.
  */
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  /**
  * Método que maneja el inicio de sesión. Si el formulario es válido, intenta iniciar sesión con el servicio de autenticación.
  * Si el formulario es inválido, muestra un mensaje de error.
  * 
  * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando se completa el proceso de inicio de sesión.
  */
  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      this.message = 'Completá todos los campos correctamente.';
      this.isError = true;
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      const result = await this.authService.login(email, password);
      this.message = result.message;
      this.isError = !result.success;
    } catch (error: any) {
      this.message = 'Ocurrió un error inesperado.';
      this.isError = true;
      console.error('Error en login():', error);
    }
  }

  /**
  * Método de prueba para el inicio de sesión con credenciales predefinidas.
  * Se muestra un mensaje dependiendo si el inicio de sesión fue exitoso o no.
  * 
  * @param {string} email - Correo electrónico para iniciar sesión.
  * @param {string} password - Contraseña para iniciar sesión.
  * 
  * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando se completa el proceso de inicio de sesión.
  */
  async loginTest(email: string, password: string) {
    try {
      const result = await this.authService.login(email, password);

      if (!result.success) {
        this.message = result.message;
        this.isError = true;
      } else {
        this.message = result.message;
        this.isError = false;
      }
    } catch (error: any) {
      this.message = 'Ocurrió un error al intentar iniciar sesión.';
      this.isError = true;
      console.error('Error en loginTest():', error);
    }
  }

}
