import { Injectable } from '@angular/core';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class MayorMenorService extends Game {
  private deck: number[] = [];
  private currentCard: number = 0;
  private name: string = 'mayor menor';
  private roundPoints: number = 1000;

  constructor() {
    super();
    this.initializeDeck();
  }

  newGame() {
    this.setScore(0);
    this.setLives(3);
    this.totalSeconds = 180;
    this.setFinished(false);
    this.setVictory(false);
    this.setRoundVictory(false);
    this.initializeDeck();
    this.drawInitialCard();
    this.startTimer(() => this.getScore() > 10000 ? this.endGame(true, this.name) : this.endGame(false, this.name));
  }

  private initializeDeck() {
    this.deck = Array.from({ length: 9 }, (_, i) => i + 2);
    this.shuffleDeck();
  }


  private shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  private drawInitialCard() {
    this.currentCard = this.drawCard();
  }

  private drawCard(): number {
    if (this.deck.length === 0) {
      this.initializeDeck();
    }
    return this.deck.pop()!;
  }

  guess(higher: boolean): { success: boolean; newCard: number; remainingLives: number; score: number } {
    const nextCard = this.drawCard();
    const success = (higher && nextCard > this.currentCard) || (!higher && nextCard < this.currentCard);

    if (success) {
      this.setScore(this.getScore() + this.roundPoints);
      this.setRoundVictory(true);
      setTimeout(() => {
        this.setRoundVictory(false);
      }, 2000);
    } else {
      this.loseLife();
      this.setRoundVictory(false);
    }

    this.currentCard = nextCard;

    if (this.getLives() === 0) {
      this.setFinished(true);
      this.endGame(false, this.name);
    }

    return {
      success,
      newCard: nextCard,
      remainingLives: this.lives,
      score: this.score
    };
  }

  getCurrentCard(): number {
    return this.currentCard;
  }

  isRoundWon(): boolean {
    return this.roundVictory;
  }

}
