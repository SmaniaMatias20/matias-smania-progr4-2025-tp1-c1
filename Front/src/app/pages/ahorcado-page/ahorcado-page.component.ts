import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { AhorcadoService } from '../../services/ahorcado/ahorcado.service';
import { GameResultComponent } from '../../components/game-result/game-result.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorcado-page',
  imports: [GameResultComponent, ConfirmDialogComponent],
  templateUrl: './ahorcado-page.component.html',
  styleUrls: ['./ahorcado-page.component.css']
})
export class AhorcadoPageComponent implements OnInit, OnDestroy {

  showConfirmExit = signal(false);

  rowsLetters: string[][] = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  ];

  constructor(public ahorcadoService: AhorcadoService, private router: Router) { }

  ngOnInit() {
    this.newGame();
  }

  ngOnDestroy() {
    this.ahorcadoService.stopTimer();
  }

  get time(): string {
    return this.ahorcadoService.getTime();
  }

  get score(): number {
    return this.ahorcadoService.getScore();
  }

  get finished(): boolean {
    return this.ahorcadoService.getFinished();
  }

  get livesArray(): any[] {
    return Array(this.ahorcadoService.getLives()).fill(0);
  }

  get displayedWord(): string[] {
    return this.ahorcadoService.getDisplayedWord();
  }

  get paused(): boolean {
    return this.ahorcadoService.getPause();
  }

  guess(letter: string) {
    if (!this.ahorcadoService.isLetterUsed(letter) && !this.ahorcadoService.getFinished()) {
      this.ahorcadoService.guessLetter(letter);
    }
  }

  isLetterUsed(letter: string): boolean {
    return this.ahorcadoService.isLetterUsed(letter);
  }

  pause() {
    this.ahorcadoService.pause();
  }

  resume() {
    this.ahorcadoService.resume();
  }

  exit() {
    this.ahorcadoService.stopTimer();
    this.router.navigate(['/home']);
  }

  playAgain() {
    this.newGame();
  }

  private newGame() {
    this.ahorcadoService.newGame();

    this.ahorcadoService.startTimer(() => {
      this.ahorcadoService.endGame(false);
    });
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

}
