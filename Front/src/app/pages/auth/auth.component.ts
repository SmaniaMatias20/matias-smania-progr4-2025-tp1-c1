import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Necesitamos Router para redirigir

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']  // Corregí la propiedad `styleUrls` (no `styleUrl`)
})
export class AuthComponent {
  // Variable para simular si el usuario está logueado
  private loggedIn = false;

  constructor(private router: Router) { }

  onLogin() {
    // Simulamos el login (sin hacer ninguna validación real)
    this.loggedIn = true;

    // Redirigimos al Home después del login
    this.router.navigate(['/home']);
  }


}
