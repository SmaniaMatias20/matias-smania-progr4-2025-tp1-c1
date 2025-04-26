import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-ahorcado-page',
  templateUrl: './ahorcado-page.component.html',
  styleUrls: ['./ahorcado-page.component.css']
})
export class AhorcadoPageComponent implements OnInit, OnDestroy {

  // Letras del juego
  letters: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  rowsLetters: string[][] = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    ['M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  ];

  // Temporizador de 3:00
  time: string = '03:00';
  private timerInterval: any;

  // Iniciar temporizador
  ngOnInit() {
    this.startTimer();
  }

  // Parar temporizador al destruir el componente
  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startTimer() {
    let totalSeconds = 180; // 3 minutos = 180 segundos

    this.timerInterval = setInterval(() => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      this.time = `${this.padZero(minutes)}:${this.padZero(seconds)}`;

      if (totalSeconds > 0) {
        totalSeconds--;
      } else {
        clearInterval(this.timerInterval); // Detener el temporizador cuando llegue a 0
      }
    }, 1000);
  }

  // Método para agregar ceros a la izquierda
  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
