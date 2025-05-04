import { Injectable } from '@angular/core';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService extends Game {
  private name: string = "ahorcado";
  private word: string = '';
  private displayed: string[] = [];
  private guessedLetters: Set<string> = new Set();
  private wordList = ['ANGULAR', 'PROGRAMAR', 'DESARROLLO', 'AHORCADO'];
  private guessedWords: Set<string> = new Set();
  private roundPoints = 1000;

  constructor() {
    super();
  }

  newGame() {
    this.setScore(0);
    this.setLives(6);
    this.setTotalSeconds(180);
    this.setFinished(false);
    this.setVictory(false);
    this.guessedWords.clear();
    this.setPause(false);
    this.updateTimeString();
    this.loadNewWord();

    this.startTimer(() => {
      this.endGame(this.victory, this.name);
    });
  }

  private getRandomWord(): string {
    const remainingWords = this.wordList.filter(word => !this.guessedWords.has(word));
    const index = Math.floor(Math.random() * remainingWords.length);
    return remainingWords[index];
  }

  private loadNewWord(): void {
    const remainingWords = this.wordList.filter(word => !this.guessedWords.has(word));
    if (remainingWords.length === 0) {
      this.endGame(this.victory, this.name);
      return;
    }
    this.word = this.getRandomWord();
    this.displayed = Array(this.word.length).fill('_');
    this.guessedLetters.clear();
  }

  guessLetter(letter: string): boolean {
    if (this.guessedLetters.has(letter) || this.getFinished()) return false;

    this.guessedLetters.add(letter);

    let correct = false;
    this.word.split('').forEach((char, index) => {
      if (char === letter) {
        this.displayed[index] = letter;
        correct = true;
      }
    });

    if (!correct) {
      this.loseLife();
    }

    if (this.isRoundWon()) {
      this.setScore(this.getScore() + this.roundPoints);
      this.guessedWords.add(this.word);
      this.setLives(6);

      const allWordsGuessed = this.guessedWords.size === this.wordList.length;
      if (allWordsGuessed) {
        this.setVictory(true);
        this.endGame(this.victory, this.name);
        this.displayed.push("_");
      } else {
        setTimeout(() => {
          this.loadNewWord();
        }, 2000);
      }
    } else if (this.isGameOver()) {
      this.endGame(this.victory, this.name);
    }

    return correct;
  }

  getDisplayedWord(): string[] {
    return this.displayed;
  }

  isRoundWon(): boolean {
    return !this.displayed.includes('_');
  }

  isGameOver(): boolean {
    return this.getLives() === 0;
  }

  getWord(): string {
    return this.word;
  }

  isLetterUsed(letter: string): boolean {
    return this.guessedLetters.has(letter);
  }

}
