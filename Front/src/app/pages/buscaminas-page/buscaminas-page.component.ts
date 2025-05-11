import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscaminasService } from '../../services/buscaminas/buscaminas.service'; import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { GameResultComponent } from '../../components/game-result/game-result.component';
import { Router } from '@angular/router';

interface Cell {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

@Component({
  selector: 'app-buscaminas-page',
  imports: [GameResultComponent, ConfirmDialogComponent, CommonModule],
  templateUrl: './buscaminas-page.component.html',
  styleUrls: ['./buscaminas-page.component.css']
})
export class BuscaminasPageComponent implements OnInit {
  showConfirmExit = signal(false);


  /**
   * Inyecta el servicio del juego Buscaminas y el servicio de navegación.
   * @param buscaminasService Servicio que contiene la lógica del juego.
   * @param router Servicio para la navegación entre rutas.
   */
  constructor(public buscaminasService: BuscaminasService, private router: Router) { }

  /**
   * Se ejecuta al inicializar el componente. Inicia una nueva partida.
   * @returns void
   */
  ngOnInit(): void {
    this.buscaminasService.newGame()
  }

  // Getters
  get livesArray(): any[] { return Array(this.buscaminasService.getLives()).fill(0); }
  get paused(): boolean { return this.buscaminasService.getPause(); }
  get board(): Cell[][] { return this.buscaminasService.board; }
  get score(): number { return this.buscaminasService.getScore(); }
  get victory(): boolean { return this.buscaminasService.getVictory(); }
  get finished(): boolean { return this.buscaminasService.getFinished(); }
  get time(): string { return this.buscaminasService.getTime(); }
  get remainingMines(): number { return this.buscaminasService.board.flat().filter(c => c.isMine && !c.isRevealed).length; }

  /**
   * Maneja el clic izquierdo sobre una celda para revelarla.
   * @param cell Celda sobre la cual se hizo clic.
   * @returns {void}
   */
  onCellClick(cell: Cell): void {
    this.buscaminasService.revealCell(cell.row, cell.col);
  }

  /**
   * Maneja el clic derecho sobre una celda para alternar una bandera.
   * @param event Evento del mouse.
   * @param cell Celda sobre la cual se hizo clic derecho.
   * @returns {void}
   */
  onRightClick(event: MouseEvent, cell: Cell): void {
    event.preventDefault();
    this.buscaminasService.toggleFlag(cell.row, cell.col);
  }

  /**
   * Método para reanudar el juego.
   * 
   * @returns {void} - No retorna ningún valor, solo reanuda el juego.
   */
  pause(): void {
    this.buscaminasService.pause();
  }

  /**
   * Método para reanudar el juego.
   * 
   * @returns {void} - No retorna ningún valor, solo reanuda el juego.
   */
  resume(): void {
    this.buscaminasService.resume();
  }

  /**
   * Método que se ejecuta cuando el jugador decide salir del juego.
   * Detiene el temporizador y navega a la página de inicio.
   * 
   * @returns {void} - No retorna ningún valor, solo navega a la página de inicio.
   */
  exit(): void {
    this.buscaminasService.stopTimer();
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
