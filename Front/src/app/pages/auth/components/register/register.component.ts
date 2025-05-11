import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isPasswordVisible: boolean = false;


  /**
  * Constructor que inyecta el servicio de autenticación y el formulario.
  * @param authService Servicio para la gestión de autenticación.
  * @param fb Servicio para construir formularios reactivos.
  */
  constructor(private authService: AuthService, private fb: FormBuilder,) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      age: ['', [Validators.required, Validators.max(99), Validators.min(18)]]
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
   * Método que maneja el registro del usuario. Si el formulario es válido, intenta registrar al usuario con el servicio de autenticación.
   * Si el formulario es inválido o el registro falla, muestra un mensaje de error.
   * 
   * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando se completa el proceso de registro.
   */
  async register(): Promise<void> {
    this.errorMessage = '';
    this.successMessage = '';

    try {

      const { email, password, confirmPassword, firstName, lastName, age } = this.registerForm.value;
      const response = await this.authService.register(email, password, {
        firstName: firstName,
        lastName: lastName,
        age: age
      });

      if (response.success) {
        this.successMessage = "Usuario registrado correctamente";
      } else {
        this.errorMessage = "El usuario ya se encuentra registrado";
      }

    } catch (error: any) {
      console.error(error);
      this.errorMessage = "Hubo otro error al registrarse";
    }
  }
}
