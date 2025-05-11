import { Component, Signal } from '@angular/core';
import { CardGameComponent } from './components/card-game/card-game.component';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardGameComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user!: Signal<any>;
  games: any[] = [];

  /**
 * Constructor del componente HomeComponent.
 * 
 * @param {AuthService} authService - Servicio de autenticación que se inyecta para obtener información del usuario.
 * @param {HttpClient} http - Servicio de peticiones HTTP que se utiliza para obtener la lista de juegos.
 */
  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.user = this.authService.user;
  }

  /**
   * Método ngOnInit que se ejecuta cuando se inicializa el componente.
   * 
   * @returns {void} - No retorna ningún valor.
   */
  ngOnInit(): void {
    this.http.get<any[]>('assets/data/games.json').subscribe((data) => {
      this.games = data;
    });
  }
}
