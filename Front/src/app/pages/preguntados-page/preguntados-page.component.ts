import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntadosService } from '../../services/preguntados/preguntados.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { GameResultComponent } from '../../components/game-result/game-result.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntados-page',
  standalone: true,
  imports: [GameResultComponent, ConfirmDialogComponent, CommonModule],
  templateUrl: './preguntados-page.component.html',
  styleUrls: ['./preguntados-page.component.css']
})
export class PreguntadosPageComponent implements OnInit, OnDestroy {

  showConfirmExit = signal(false);
  constructor(public preguntadosService: PreguntadosService, private router: Router) { }

  ngOnInit() {
    this.preguntadosService.newGame();
  }

  ngOnDestroy() {
    this.preguntadosService.stopTimer();
  }

  get time(): string {
    return this.preguntadosService.getTime();
  }

  get score(): number {
    return this.preguntadosService.getScore();
  }

  get paused(): boolean {
    return this.preguntadosService.getPause();
  }

  get livesArray(): any[] {
    return Array(this.preguntadosService.getLives()).fill(0);
  }

  get currentQuestion(): any {
    return this.preguntadosService.getCurrentQuestion();
  }

  get currentOptions(): string[] {
    return this.preguntadosService.getCurrentOptions();
  }

  get isGameOver(): boolean {
    return this.preguntadosService.isGameOver();
  }

  get victory(): boolean {
    return this.preguntadosService.getVictory();
  }

  get roundVictory(): boolean {
    return this.preguntadosService.isRoundWon();
  }

  get finished(): boolean {
    return this.preguntadosService.getFinished();
  }

  get progressBarWidth(): string {
    return this.preguntadosService.progressBarWidth;
  }

  answer(option: string) {
    const isCorrect = this.preguntadosService.answer(option);

    if (!isCorrect && this.preguntadosService.isGameOver()) {
      this.preguntadosService.setFinished(true);
      this.preguntadosService.setVictory(false);
    }
  }


  pause() {
    this.preguntadosService.pause();
  }

  resume() {
    this.preguntadosService.resume();
  }

  requestExit() {
    this.showConfirmExit.set(true);
  }

  confirmExit() {
    this.showConfirmExit.set(false);
    this.exit();
  }

  cancelExit() {
    this.showConfirmExit.set(false);
  }

  exit() {
    this.preguntadosService.stopTimer();
    this.router.navigate(['/home']);
  }

  playAgain() {
    this.preguntadosService.setFinished(false);
    this.preguntadosService.setVictory(false);
    this.preguntadosService.newGame();
  }

}
