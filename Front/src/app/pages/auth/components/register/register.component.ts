import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';
import { NgClass, NgIf } from '@angular/common';

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

  constructor(private authService: AuthService, private fb: FormBuilder,) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      age: ['', [Validators.required, Validators.max(99), Validators.min(18)]]
    });

  }

  async register() {
    this.errorMessage = '';
    this.successMessage = '';

    try {

      const { email, password, confirmPassword, firstName, lastName, age } = this.registerForm.value;
      await this.authService.register(email, password, {
        firstName: firstName,
        lastName: lastName,
        age: age
      });

      this.successMessage = 'Registro completo';
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = 'El email registrado ya existe.';
      } else {
        this.errorMessage = 'Otro error.';
      }
      console.error(error);
    }
  }
}
