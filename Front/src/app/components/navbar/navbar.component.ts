import { Component, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user!: Signal<any>;
  isOpen = signal(false); // <-- menú hamburguesa

  constructor(private authService: AuthService) {
    this.user = this.authService.user;
  }

  toggleMenu(): void {
    this.isOpen.update(open => !open);
  }

  async onLogout(): Promise<void> {
    const { success, message } = await this.authService.logout();
    if (success) {
      console.log(message);
      this.isOpen.set(false); // <-- cerrar menú si estaba abierto
    } else {
      console.error('Error al cerrar sesión:', message);
    }
  }
}
