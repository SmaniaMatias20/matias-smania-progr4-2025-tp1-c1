// import { Injectable } from '@angular/core';
// import { Game } from '../../models/game';

// @Injectable({
//   providedIn: 'root'
// })
// export class AhorcadoService extends Game {
//   private word: string = '';
//   private displayed: string[] = [];
//   private guessedLetters: Set<string> = new Set();
//   private wordList = ['ANGULAR', 'PROGRAMAR', 'DESARROLLO', 'AHORCADO'];

//   constructor() {
//     super();
//     this.newGame();
//   }

//   newGame() {
//     this.word = this.getRandomWord();
//     this.displayed = Array(this.word.length).fill('_');
//     this.guessedLetters.clear();
//     this.lives = 6;
//     this.totalSeconds = 180;
//     this.updateTimeString();
//   }

//   private getRandomWord(): string {
//     const index = Math.floor(Math.random() * this.wordList.length);
//     return this.wordList[index];
//   }

//   guessLetter(letter: string): boolean {
//     if (this.guessedLetters.has(letter)) return false;

//     this.guessedLetters.add(letter);

//     let correct = false;
//     this.word.split('').forEach((char, index) => {
//       if (char === letter) {
//         this.displayed[index] = letter;
//         correct = true;
//       }
//     });

//     if (!correct) {
//       this.loseLife();
//     }

//     return correct;
//   }

//   getDisplayedWord(): string[] {
//     return this.displayed;
//   }

//   isGameWon(): boolean {
//     return !this.displayed.includes('_');
//   }

//   isGameOver(): boolean {
//     return this.getLives() === 0;
//   }

//   getWord(): string {
//     return this.word;
//   }

//   isLetterUsed(letter: string): boolean {
//     return this.guessedLetters.has(letter);
//   }

// }


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

  constructor() {
    super();
    this.newGame();
  }

  newGame() {
    this.word = this.getRandomWord();
    this.displayed = Array(this.word.length).fill('_');
    this.guessedLetters.clear();
    this.lives = 6;
    this.totalSeconds = 180;
    this.finished = false;
    this.victory = false;
    this.updateTimeString();
  }

  private getRandomWord(): string {
    const index = Math.floor(Math.random() * this.wordList.length);
    return this.wordList[index];
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

    if (this.isGameWon()) {
      this.winGame();
    } else if (this.isGameOver()) {
      this.loseGame();
    }

    return correct;
  }

  getDisplayedWord(): string[] {
    return this.displayed;
  }

  isGameWon(): boolean {
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
