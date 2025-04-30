import { Injectable } from '@angular/core';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService extends Game {
  private word: string = '';
  private displayed: string[] = [];
  private guessedLetters: Set<string> = new Set();
  private wordList = ['ANGULAR', 'PROGRAMAR', 'DESARROLLO', 'AHORCADO'];
  private guessedWords: Set<string> = new Set();

  constructor() {
    super();
    this.newGame();
  }

  newGame() {
    this.setScore(0);
    this.lives = 6;
    this.totalSeconds = 180;
    this.finished = false;
    this.victory = false;
    this.guessedWords.clear();
    this.setPause(false);
    this.updateTimeString();
    this.loadNewWord();
  }

  private getRandomWord(): string {
    const remainingWords = this.wordList.filter(word => !this.guessedWords.has(word));
    const index = Math.floor(Math.random() * remainingWords.length);
    return remainingWords[index];
  }

  private loadNewWord(): void {
    const remainingWords = this.wordList.filter(word => !this.guessedWords.has(word));
    if (remainingWords.length === 0) {
      this.endGame(true);
      return;
    }
    this.word = this.getRandomWord();
    this.displayed = Array(this.word.length).fill('_');
    this.guessedLetters.clear();
  }

  guessLetter(letter: string): boolean {
    if (this.guessedLetters.has(letter) || this.finished) return false;

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
      this.setScore(this.getScore() + 1000);
      this.guessedWords.add(this.word);
      this.lives = 6;

      const allWordsGuessed = this.guessedWords.size === this.wordList.length;
      if (allWordsGuessed) {
        this.endGame(true);
      } else {
        this.loadNewWord();
      }
    } else if (this.isGameOver()) {
      this.loseGame();
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

  endGame(won: boolean) {
    this.stopTimer();
    this.finished = true;
    this.victory = won;
  }
}
