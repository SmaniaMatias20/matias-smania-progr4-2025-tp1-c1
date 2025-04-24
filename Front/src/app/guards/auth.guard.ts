import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service'; // ajustá si está en otro path

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const user = this.authService.getUser();

    if (user) {
      return true; // acceso permitido
    }

    this.router.navigate(['/login']); // redirige si no está logueado
    return false;
  }
}
