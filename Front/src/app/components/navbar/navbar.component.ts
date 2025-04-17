import { Component, computed, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user!: Signal<User | null>;

  constructor(
    private authService: AuthService
  ) {
    this.user = this.authService.user;
  }

  async onLogout(): Promise<void> {
    const { success, message } = await this.authService.logout();
    if (success) {
      console.log(message);
    } else {
      console.error('Error al cerrar sesión:', message);
    }
  }
}
