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

  constructor(private authService: AuthService, private router: Router) {
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

  requestLogout() {
    this.showConfirmLogout.set(true);
  }

  confirmLogout() {
    this.showConfirmLogout.set(false);
    this.onLogout();
  }

  cancelLogout() {
    this.showConfirmLogout.set(false);
  }
}
