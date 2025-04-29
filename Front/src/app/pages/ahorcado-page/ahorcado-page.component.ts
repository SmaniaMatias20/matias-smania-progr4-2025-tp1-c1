import { Component, OnInit, OnDestroy } from '@angular/core';
import { AhorcadoService } from '../../services/ahorcado/ahorcado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorcado-page',
  templateUrl: './ahorcado-page.component.html',
  styleUrls: ['./ahorcado-page.component.css']
})
export class AhorcadoPageComponent implements OnInit, OnDestroy {

  letters: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  rowsLetters: string[][] = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  ];

  constructor(public ahorcadoService: AhorcadoService, private router: Router) { }

  ngOnInit() {
    this.ahorcadoService.newGame();
    this.ahorcadoService.startTimer(() => {
      alert('¡Se acabó el tiempo! La palabra era: ' + this.ahorcadoService.getWord());
      this.ahorcadoService.newGame();
    });
  }

  ngOnDestroy() {
    this.ahorcadoService.stopTimer();
  }

  get time(): string {
    return this.ahorcadoService.getTime();
  }

  get livesArray(): any[] {
    return Array(this.ahorcadoService.getLives()).fill(0);
  }

  get displayedWord(): string[] {
    return this.ahorcadoService.getDisplayedWord();
  }

  guess(letter: string) {
    if (!this.ahorcadoService.isLetterUsed(letter) && !this.ahorcadoService.isGameOver()) {
      this.ahorcadoService.guessLetter(letter);

      if (this.ahorcadoService.isGameWon()) {
        alert('¡Ganaste!');
        this.ahorcadoService.newGame();
      } else if (this.ahorcadoService.isGameOver()) {
        alert('¡Perdiste! La palabra era: ' + this.ahorcadoService.getWord());
        this.ahorcadoService.newGame();
      }
    }
  }

  isLetterUsed(letter: string): boolean {
    return this.ahorcadoService.isLetterUsed(letter);
  }

  pause() {
    if (this.ahorcadoService.getPause()) {
      this.ahorcadoService.setPause(false);
      this.ahorcadoService.resumeTimer();
    } else {
      this.ahorcadoService.setPause(true);
      this.ahorcadoService.stopTimer();
    }
  }

  exit() {
    this.ahorcadoService.stopTimer();
    this.router.navigate(['/home']);
  }
}
