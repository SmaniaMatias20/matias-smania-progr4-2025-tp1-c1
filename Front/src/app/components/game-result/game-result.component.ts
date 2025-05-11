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
   * 
   * @param router Servicio de enrutamiento para la navegación entre páginas.
   */
  constructor(private router: Router) { }

  /**
   * Cierra el modal de resultado.
   * 
   * @returns {void} - No retorna ningún valor.
   */
  onClose(): void {
    this.closeModal.emit();
  }

  /**
   * Finaliza el juego y emite el evento correspondiente.
   * 
   * @returns {void} - No retorna ningún valor.
   */
  onEndGame(): void {
    this.endGame.emit();
  }

  /**
   * Navega a la página de inicio del juego o aplicación.
   * 
   * @returns {void} - No retorna ningún valor.
   */
  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
