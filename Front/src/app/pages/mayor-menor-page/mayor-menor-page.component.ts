import { Component, OnInit, OnDestroy } from '@angular/core';
import { MayorMenorService } from '../../services/mayor-menor/mayor-menor.service';

@Component({
  selector: 'app-mayor-menor-page',
  templateUrl: './mayor-menor-page.component.html',
  styleUrls: ['./mayor-menor-page.component.css']
})
export class MayorMenorPageComponent implements OnInit, OnDestroy {
  currentCard: number = 0;
  message: string = '';

  constructor(public mayorMenorService: MayorMenorService) { }

  ngOnInit(): void {
    this.mayorMenorService.newGame();
    this.currentCard = this.mayorMenorService.getCurrentCard();
  }

  ngOnDestroy(): void {
    this.mayorMenorService.stopTimer();
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
}
