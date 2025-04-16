import { Component } from '@angular/core';
import { DatabaseService } from '../../../../services/database/database.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private db: DatabaseService) { }

  async register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      this.successMessage = '';
      return;
    }

    const { error } = await this.db.supabase.auth.signUp({
      email: this.email,
      password: this.password
    });

    if (error) {
      this.errorMessage = error.message;
      this.successMessage = '';
    } else {
      this.successMessage = 'Registro exitoso. Revisa tu correo para confirmar.';
      this.errorMessage = '';
    }
  }
}
