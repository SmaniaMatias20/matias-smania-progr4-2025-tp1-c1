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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]

    });
  }

  async login() {
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
