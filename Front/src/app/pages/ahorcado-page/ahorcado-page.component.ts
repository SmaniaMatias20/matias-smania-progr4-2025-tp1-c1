import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { AhorcadoService } from '../../services/ahorcado/ahorcado.service';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { GameResultComponent } from '../../components/game-result/game-result.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorcado-page',
  imports: [GameResultComponent, ConfirmDialogComponent, SuccessMessageComponent],
  templateUrl: './ahorcado-page.component.html',
  styleUrls: ['./ahorcado-page.component.css']
})
export class AhorcadoPageComponent implements OnInit, OnDestroy {

  showConfirmExit = signal(false);
  rowsLetters: string[][] = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  ];

  /**
  * Constructor del componente donde se inyectan los servicios necesarios: AhorcadoService y Router.
  * @param ahorcadoService Servicio para gestionar la lógica del juego del ahorcado.
  * @param router Servicio de navegación para redirigir a otras páginas.
  */
  constructor(public ahorcadoService: AhorcadoService, private router: Router) { }

  /**
  * Método que se ejecuta al inicializar el componente.
  * Se llama al servicio AhorcadoService para iniciar un nuevo juego.
  * 
  * @returns {void} - No retorna ningún valor.
  */
  ngOnInit(): void {
    this.ahorcadoService.newGame();
  }

  /**
  * Método que se ejecuta cuando se destruye el componente.
  * Detiene el temporizador cuando se sale del componente.
  * 
  * @returns {void} - No retorna ningún valor.
  */
  ngOnDestroy(): void {
    this.ahorcadoService.stopTimer();
  }

  // Getters
  get time(): string { return this.ahorcadoService.getTime(); }
  get score(): number { return this.ahorcadoService.getScore(); }
  get finished(): boolean { return this.ahorcadoService.getFinished(); }
  get livesArray(): any[] { return Array(this.ahorcadoService.getLives()).fill(0); }
  get displayedWord(): string[] { return this.ahorcadoService.getDisplayedWord(); }
  get paused(): boolean { return this.ahorcadoService.getPause(); }
  get word(): string { return this.ahorcadoService.getWord(); }
  get victory(): boolean { return this.ahorcadoService.getVictory(); }
  get roundVictory(): boolean { return this.ahorcadoService.isRoundWon(); }

  /**
  * Método que se ejecuta cuando el jugador hace una suposición de letra.
  * Si la letra no ha sido usada y el juego no ha terminado, se hace la suposición.
  * 
  * @param {string} letter - Letra que el jugador desea adivinar.
  * 
  * @returns {void} - No retorna ningún valor, solo actualiza el estado del juego.
  */
  guess(letter: string): void {
    if (!this.ahorcadoService.isLetterUsed(letter) && !this.ahorcadoService.getFinished()) {
      this.ahorcadoService.guessLetter(letter);
    }
  }

  /**
  * Método que verifica si una letra ya ha sido usada.
  * 
  * @param {string} letter - Letra que se desea comprobar si ha sido utilizada.
  * 
  * @returns {boolean} - Retorna true si la letra ha sido usada, de lo contrario false.
  */
  isLetterUsed(letter: string): boolean {
    return this.ahorcadoService.isLetterUsed(letter);
  }

  /**
   * Método para pausar el juego.
   * 
   * @returns {void} - No retorna ningún valor, solo pausa el juego.
   */
  pause(): void {
    this.ahorcadoService.pause();
  }

  /**
   * Método para reanudar el juego.
   * 
   * @returns {void} - No retorna ningún valor, solo reanuda el juego.
   */

  resume(): void {
    this.ahorcadoService.resume();
  }

  /**
   * Método que se ejecuta cuando el jugador decide salir del juego.
   * Detiene el temporizador y navega a la página de inicio.
   * 
   * @returns {void} - No retorna ningún valor, solo navega a la página de inicio.
   */
  exit(): void {
    this.ahorcadoService.stopTimer();
    this.router.navigate(['/home']);
  }

  /**
   * Método que solicita la confirmación para salir del juego.
   * 
   * @returns {void} - No retorna ningún valor, solo activa la confirmación de salida.
   */
  requestExit(): void {
    this.showConfirmExit.set(true);
  }

  /**
   * Método que confirma la salida del juego y navega a la página de inicio.
   * 
   * @returns {void} - No retorna ningún valor, solo confirma la salida y navega a la página de inicio.
   */
  confirmExit(): void {
    this.showConfirmExit.set(false);
    this.exit();
  }

  /**
   * Método que cancela la solicitud de salida del juego.
   * 
   * @returns {void} - No retorna ningún valor, solo cancela la confirmación de salida.
   */
  cancelExit(): void {
    this.showConfirmExit.set(false);
  }

}
