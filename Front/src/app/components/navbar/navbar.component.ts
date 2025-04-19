import { Component, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user!: Signal<any>; // sin interfaz, entonces usamos `any`


  constructor(
    private authService: AuthService
  ) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    // Aquí va la lógica que quieres ejecutar cuando se carga el componente
    console.log(this.user());
    console.log('Componente inicializado');
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
