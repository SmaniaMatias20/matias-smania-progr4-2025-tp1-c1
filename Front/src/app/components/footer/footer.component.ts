import { Component, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  standalone: true,
})
export class FooterComponent {
  user!: Signal<any>;
  currentYear: number = new Date().getFullYear();

  /**
  * Constructor que inyecta el servicio de autenticación.
  * Inicializa la señal `user` con los datos del usuario actual proporcionados por el servicio.
  * 
  * @param authService Servicio que gestiona la autenticación y el estado del usuario.
  */
  constructor(private authService: AuthService) {
    this.user = this.authService.user;
  }

}
