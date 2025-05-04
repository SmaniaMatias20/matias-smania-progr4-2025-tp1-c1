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
  message: string = '';
  showConfirmExit = signal(false);

  constructor(public mayorMenorService: MayorMenorService, private router: Router) { }

  ngOnInit(): void {
    this.mayorMenorService.newGame();
    this.currentCard = this.mayorMenorService.getCurrentCard();
  }

  ngOnDestroy(): void {
    this.mayorMenorService.stopTimer();
  }

  get currentCardImage(): string {
    return `assets/images/mayor-menor/${this.currentCard}.png`;
  }

  get paused(): boolean {
    return this.mayorMenorService.getPause();
  }


  get time(): string {
    return this.mayorMenorService.getTime();
  }

  get livesArray(): any[] {
    return Array(this.mayorMenorService.getLives()).fill(0);
  }

  get score(): number {
    return this.mayorMenorService.getScore();
  }

  get finished(): boolean {
    return this.mayorMenorService.getFinished();
  }

  get victory(): boolean {
    return this.mayorMenorService.getVictory();
  }

  get roundVictory(): boolean {
    return this.mayorMenorService.isRoundWon();
  }

  guess(higher: boolean): void {
    const result = this.mayorMenorService.guess(higher);
    this.currentCard = result.newCard;

    if (this.mayorMenorService.getFinished()) {
      this.message = '¡Fin del juego!';
      return;
    }

    this.message = result.success ? '¡Correcto!' : 'Incorrecto 😢';
  }


  pause() {
    this.mayorMenorService.pause();
  }

  resume() {
    this.mayorMenorService.resume();
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
    this.mayorMenorService.stopTimer();
    this.router.navigate(['/home']);
  }

}
