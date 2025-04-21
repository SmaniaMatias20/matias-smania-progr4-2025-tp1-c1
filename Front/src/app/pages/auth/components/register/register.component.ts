import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  age: number | null = null;

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  async register() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (!this.firstName || !this.lastName || !this.age) {
      this.errorMessage = 'Please complete all fields.';
      return;
    }

    try {
      await this.authService.register(this.email, this.password, {
        firstName: this.firstName,  // Cambié "name" a "firstName"
        lastName: this.lastName,    // Cambié "lastName" a "lastName"
        age: this.age               // Cambié "edad" a "age"
      });

      this.successMessage = 'Registration successful!';
      this.router.navigate(['/']);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = 'This email is already registered.';
      } else {
        this.errorMessage = 'An error occurred during registration.';
      }
      console.error(error);
    }
  }
}
