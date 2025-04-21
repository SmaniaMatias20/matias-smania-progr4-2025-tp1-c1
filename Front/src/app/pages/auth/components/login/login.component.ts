import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  async login() {
    const result = await this.authService.login(this.email, this.password);

    this.message = result.message;
    this.isError = !result.success;

    // if (result.success) {
    //   // Redireccionar si querés
    //   this.router.navigateByUrl('/');
    // }
  }
}
