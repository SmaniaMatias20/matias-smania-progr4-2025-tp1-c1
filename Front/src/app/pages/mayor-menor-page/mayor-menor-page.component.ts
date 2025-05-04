import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { MayorMenorService } from '../../services/mayor-menor/mayor-menor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mayor-menor-page',
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

  get isFinished(): boolean {
    return this.mayorMenorService.getFinished();
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
