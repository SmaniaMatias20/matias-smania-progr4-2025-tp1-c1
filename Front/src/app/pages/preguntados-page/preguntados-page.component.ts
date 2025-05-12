import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntadosService } from '../../services/preguntados/preguntados.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { SuccessMessageComponent } from '../../components/success-message/success-message.component';
import { GameResultComponent } from '../../components/game-result/game-result.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntados-page',
  standalone: true,
  imports: [GameResultComponent, ConfirmDialogComponent, SuccessMessageComponent, SpinnerComponent, CommonModule],
  templateUrl: './preguntados-page.component.html',
  styleUrls: ['./preguntados-page.component.css']
})
export class PreguntadosPageComponent implements OnInit, OnDestroy {
  selectedOptions: string[] = [];
  showConfirmExit = signal(false);

  /**
   * Constructor del componente.
   *
   * @param {PreguntadosService} preguntadosService Servicio que maneja la lógica del juego.
   * @param {Router} router Servicio de enrutamiento para navegar entre páginas.
   */
  constructor(public preguntadosService: PreguntadosService, private router: Router) { }

  /**
   * Inicializa el juego al cargar el componente.
   * @returns {void}
   */
  ngOnInit(): void {
    this.preguntadosService.newGame();
  }

  /**
   * Detiene el temporizador al destruir el componente.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.preguntadosService.stopTimer();
  }

  // Getters
  get loading(): boolean { return this.preguntadosService.getLoading(); }
  get time(): string { return this.preguntadosService.getTime(); }
  get score(): number { return this.preguntadosService.getScore(); }
  get paused(): boolean { return this.preguntadosService.getPause(); }
  get livesArray(): any[] { return Array(this.preguntadosService.getLives()).fill(0); }
  get currentQuestion(): any { return this.preguntadosService.getCurrentQuestion(); }
  get currentOptions(): string[] { return this.preguntadosService.getCurrentOptions(); }
  get isGameOver(): boolean { return this.preguntadosService.isGameOver(); }
  get victory(): boolean { return this.preguntadosService.getVictory(); }
  get roundVictory(): boolean { return this.preguntadosService.isRoundWon(); }
  get finished(): boolean { return this.preguntadosService.getFinished(); }
  get progressBarWidth(): string { return this.preguntadosService.progressBarWidth; }

  /**
   * Procesa la respuesta seleccionada por el usuario.
   * 
   * @param option La opción de respuesta seleccionada por el usuario.
   * @returns {void}
   */
  answer(option: string) {
    const isCorrect = this.preguntadosService.answer(option);

    if (!isCorrect) {
      this.selectedOptions.push(option)
    }

    if (!isCorrect && this.preguntadosService.isGameOver()) {
      this.preguntadosService.setFinished(true);
      this.preguntadosService.setVictory(false);
    }
  }

  /**
   * Pausa el juego.
   * @returns {void}
   */
  pause(): void {
    this.preguntadosService.pause();
  }

  /**
   * Reanuda el juego.
   * @returns {void}
   */
  resume(): void {
    this.preguntadosService.resume();
  }

  /**
   * Solicita la confirmación del usuario para salir del juego.
   * @returns {void}
   */
  requestExit(): void {
    this.showConfirmExit.set(true);
  }

  /**
   * Confirma la salida del juego y navega al inicio.
   * @returns {void}
   */
  confirmExit(): void {
    this.showConfirmExit.set(false);
    this.exit();
  }

  /**
   * Cancela la solicitud de salida del juego.
   * @returns {void}
   */
  cancelExit(): void {
    this.showConfirmExit.set(false);
  }

  /**
   * Sale del juego y redirige al usuario a la página de inicio.
   * @returns {void}
   */
  exit(): void {
    this.preguntadosService.stopTimer();
    this.router.navigate(['/home']);
  }

}
