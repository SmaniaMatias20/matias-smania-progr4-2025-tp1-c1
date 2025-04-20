import { Component, Signal } from '@angular/core';
import { CardGameComponent } from './components/card-game/card-game.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardGameComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user!: Signal<any>;
  ahorcadoImage = 'assets/images/ahorcado/ahorcado.jpg';
  preguntadosImage = 'assets/images/preguntados/preguntados.png';
  mayorMenorImage = 'assets/images/mayor-menor/mayor-menor.jpg';

  constructor(
    private authService: AuthService
  ) {
    this.user = this.authService.user;
  }
}
