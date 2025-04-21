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
  isOpen = signal(false);

  constructor(private authService: AuthService) {
    this.user = this.authService.user;
  }

  toggleMenu(): void {
    this.isOpen.update(open => !open);
  }

  async onLogout(): Promise<void> {
    const { success, message } = await this.authService.logout();
    if (success) {
      this.isOpen.set(false);
    } else {
      console.error('Error al cerrar sesión:', message);
    }
  }
}
