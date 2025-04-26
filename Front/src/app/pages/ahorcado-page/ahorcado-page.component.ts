import { Component, OnInit, OnDestroy } from '@angular/core';

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

  time: string = '03:00';
  private timerInterval: any;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startTimer() {
    let totalSeconds = 180;

    this.timerInterval = setInterval(() => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      this.time = `${this.padZero(minutes)}:${this.padZero(seconds)}`;

      if (totalSeconds > 0) {
        totalSeconds--;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
