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

  /**
   * Constructor de MayorMenorService.
   * Hereda de la clase base `Game` y se encarga de la inicialización de la baraja.
   */
  constructor() {
    super();
    //this.initializeDeck();
  }

  /**
   * Devuelve el nombre del juego.
   * @returns {string} El nombre del juego.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Inicia un nuevo juego.
   * Resetea el puntaje, las vidas, el temporizador y la baraja de cartas.
   * @returns {void}
   */
  newGame(): void {
    this.setScore(0);
    this.setLives(3);
    this.totalSeconds = 180;
    this.setFinished(false);
    this.setVictory(false);
    this.setRoundVictory(false);
    this.initializeDeck();
    this.drawInitialCard();
    this.startTimer(() => this.getVictory() ? this.endGame(true, this.name) : this.endGame(false, this.name));
  }


  /**
   * Inicializa la baraja con valores del 2 al 10.
   * Luego mezcla las cartas.
   * @returns {void}
   */
  private initializeDeck(): void {
    this.deck = Array.from({ length: 9 }, (_, i) => i + 2);
    this.shuffleDeck();
  }

  /**
   * Mezcla las cartas en la baraja utilizando el algoritmo de Fisher-Yates.
   * @returns {void}
   */
  private shuffleDeck(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  /**
   * Dibuja la primera carta de la baraja.
   * @returns {void}
   */
  private drawInitialCard(): void {
    this.currentCard = this.drawCard();
  }

  /**
   * Dibuja una carta de la baraja. Si la baraja está vacía, la reinicia.
   * @returns {number} El valor de la carta dibujada.
   */
  private drawCard(): number {
    if (this.deck.length === 0) {
      this.initializeDeck();
    }
    return this.deck.pop()!;
  }

  /**
   * Realiza una suposición sobre si la siguiente carta será mayor o menor.
   * Si la suposición es correcta, se suman puntos, de lo contrario se pierde una vida.
   * @param {boolean} higher - Si es verdadero, se espera que la siguiente carta sea mayor, si es falso, que sea menor.
   * @returns {Object} Resultado del intento con la carta siguiente, el puntaje y las vidas restantes.
   */
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
      this.setVictory(false);
      this.setFinished(true);
      this.endGame(this.getVictory(), this.name);
    }

    this.wonGame();

    return {
      success,
      newCard: nextCard,
      remainingLives: this.lives,
      score: this.score
    };
  }


  /**
   * Verifica si el jugador ha ganado el juego.
   * Si el puntaje es igual o mayor a 10,000, el jugador ha ganado.
   * @returns {void}
   */
  wonGame(): void {
    if (this.getScore() >= 10000) {
      this.setVictory(true);
    }
  }

  /**
   * Devuelve el valor de la carta actual.
   * @returns {number} El valor de la carta actual.
   */
  getCurrentCard(): number {
    return this.currentCard;
  }

  /**
   * Verifica si la ronda actual ha sido ganada.
   * @returns {boolean} True si la ronda ha sido ganada, false si no.
   */
  isRoundWon(): boolean {
    return this.roundVictory;
  }

}
