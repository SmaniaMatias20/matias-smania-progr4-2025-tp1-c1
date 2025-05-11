import { Component, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ConfirmDialogComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user!: Signal<any>;
  isOpen = signal(false);
  showConfirmLogout = signal(false);

  /**
  * Constructor que inyecta el servicio de autenticación y el router.
  * @param authService Servicio para la gestión de autenticación.
  * @param router Servicio de navegación.
  */
  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.user;
  }

  /**
  * Alterna el estado del menú (abre o cierra).
  */
  toggleMenu(): void {
    this.isOpen.update(open => !open);
  }

  /**
  * Ejecuta el cierre de sesión del usuario.
  * Si tiene éxito, cierra el menú.
  * Si falla, muestra el mensaje de error en consola.
  */
  async onLogout(): Promise<void> {
    const { success, message } = await this.authService.logout();
    if (success) {
      this.isOpen.set(false);
    } else {
      console.error('Error al cerrar sesión:', message);
    }
  }

  /**
  * Muestra el diálogo de confirmación para cerrar sesión.
  */
  requestLogout() {
    this.showConfirmLogout.set(true);
  }

  /**
  * Confirma el cierre de sesión y lo ejecuta.
  */
  confirmLogout() {
    this.showConfirmLogout.set(false);
    this.onLogout();
  }

  /**
  * Cancela el proceso de cierre de sesión.
  */
  cancelLogout() {
    this.showConfirmLogout.set(false);
  }
}
