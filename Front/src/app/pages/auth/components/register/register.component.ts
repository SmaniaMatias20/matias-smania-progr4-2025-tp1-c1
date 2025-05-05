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

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async register() {
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
