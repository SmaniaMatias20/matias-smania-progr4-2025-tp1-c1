import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { MayorMenorService } from '../../services/mayor-menor/mayor-menor.service';
import { GameResultComponent } from '../../components/game-result/game-result.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mayor-menor-page',
  imports: [GameResultComponent, ConfirmDialogComponent, SuccessMessageComponent],
  templateUrl: './mayor-menor-page.component.html',
  styleUrls: ['./mayor-menor-page.component.css']
})
export class MayorMenorPageComponent implements OnInit, OnDestroy {
  currentCard: number = 0;
  showConfirmExit = signal(false);
  showGameResult: boolean = false;

  /**
 * Constructor del componente MayorMenorPageComponent.
 * 
 * @param {MayorMenorService} mayorMenorService - Servicio que maneja la lógica del juego.
 * @param {Router} router - Servicio de enrutamiento para navegar entre páginas.
 */
  constructor(public mayorMenorService: MayorMenorService, private router: Router) { }

  /**
 * Método ngOnInit que se ejecuta cuando se inicializa el componente.
 * 
 * @returns {void} - No retorna ningún valor.
 */
  ngOnInit(): void {
    this.mayorMenorService.newGame();
    this.currentCard = this.mayorMenorService.getCurrentCard();
  }

  /**
 * Método ngOnDestroy que se ejecuta cuando el componente es destruido.
 * 
 * @returns {void} - No retorna ningún valor.
 */
  ngOnDestroy(): void {
    this.mayorMenorService.stopTimer();
  }

  // Getters
  get currentCardImage(): string { return `assets/images/mayor-menor/${this.currentCard}.png`; }
  get paused(): boolean { return this.mayorMenorService.getPause(); }
  get time(): string { return this.mayorMenorService.getTime(); }
  get livesArray(): any[] { return Array(this.mayorMenorService.getLives()).fill(0); }
  get score(): number { return this.mayorMenorService.getScore(); }
  get finished(): boolean { return this.mayorMenorService.getFinished(); }
  get victory(): boolean { return this.mayorMenorService.getVictory(); }
  get roundVictory(): boolean { return this.mayorMenorService.isRoundWon(); }

  /**
 * Método para hacer una adivinanza en el juego.
 * 
 * @param {boolean} higher - Si 'true' adivina si la siguiente carta es mayor, si 'false' adivina si es menor.
 * @returns {void} - No retorna ningún valor.
 */
  guess(higher: boolean): void {
    const result = this.mayorMenorService.guess(higher);
    this.currentCard = result.newCard;

    if (result.score == 10000) {
      this.showGameResult = true;
    }

    if (this.mayorMenorService.getFinished()) {
      return;
    }

  }

  /**
 * Método para pausar el juego.
 * 
 * @returns {void} - No retorna ningún valor.
 */
  pause(): void {
    this.mayorMenorService.pause();
  }

  /**
 * Método para reanudar el juego.
 * 
 * @returns {void} - No retorna ningún valor.
 */
  resume(): void {
    this.mayorMenorService.resume();
  }

  /**
   * Método para solicitar la salida del juego.
   * 
   * @returns {void} - No retorna ningún valor.
   */
  requestExit(): void {
    this.showConfirmExit.set(true);
  }

  /**
 * Método para confirmar la salida del juego.
 * 
 * @returns {void} - No retorna ningún valor.
 */
  confirmExit(): void {
    this.showConfirmExit.set(false);
    this.exit();
  }

  /**
   * Método para cancelar la salida del juego.
   * 
   * @returns {void} - No retorna ningún valor.
   */
  cancelExit(): void {
    this.showConfirmExit.set(false);
  }

  /**
 * Método para salir del juego y redirigir al usuario a la página de inicio.
 * 
 * @returns {void} - No retorna ningún valor.
 */
  exit(): void {
    this.mayorMenorService.stopTimer();
    this.router.navigate(['/home']);
  }

  /**
 * Método que se ejecuta al continuar el juego después de ver el resultado.
 * 
 * @returns {void} - No retorna ningún valor.
 */
  onContinueGame(): void {
    this.showGameResult = false;
  }

  /**
   * Método que se ejecuta cuando el juego ha terminado.
   * 
   * @returns {void} - No retorna ningún valor.
   */
  onGameOver(): void {
    this.mayorMenorService.endGame(this.mayorMenorService.getVictory(), this.mayorMenorService.getName());
    this.exit();
  }
}
