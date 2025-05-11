import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css']
})
export class GameResultComponent {
  @Input() isVictory: boolean = false;
  @Input() score: number = 0;
  @Input() resume: boolean = false;
  @Input() message: string = "";
  @Output() closeModal = new EventEmitter<void>();
  @Output() endGame = new EventEmitter<void>();

  /**
  * Inyecta el servicio de navegación de Angular.
  */
  constructor(private router: Router) { }

  /**
  * Cierra el modal de resultado.
  */
  onClose() {
    this.closeModal.emit();
  }

  /**
  * Finaliza el juego y emite el evento correspondiente.
  */
  onEndGame() {
    this.endGame.emit();
  }

  /**
  * Navega a la página de inicio del juego o aplicación.
  */
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
