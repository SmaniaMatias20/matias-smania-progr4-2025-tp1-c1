import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css']
})
export class GameResultComponent {
  @Input() isVictory: boolean = false;
  @Input() message: string = '';

  constructor(private router: Router) { }

  // Función para navegar al home
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
