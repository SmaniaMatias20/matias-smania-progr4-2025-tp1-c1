import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  /**
  * Inyecta el servicio de autenticación y el enrutador para redireccionar si es necesario.
  * @param authService Servicio de autenticación para verificar el estado del usuario.
  * @param router Servicio de enrutamiento para redirigir al usuario si no está autenticado.
  */
  constructor(private authService: AuthService, private router: Router) { }

  /**
  * Método que determina si una ruta puede ser activada.
  * @returns `true` si el usuario está autenticado, de lo contrario redirige a '/home' y retorna `false`.
  */
  canActivate(): boolean {
    const user = this.authService.getUser();

    if (user) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
