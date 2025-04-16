import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  login() {
    if (this.username === 'admin' && this.password === '12345678') {
      this.navigateToHomePage();
    } else {
      console.log('Usuario o contraseña incorrectos');
    }
  }

  navigateToHomePage() {
    this.router.navigate(['/home']);
  }
}
