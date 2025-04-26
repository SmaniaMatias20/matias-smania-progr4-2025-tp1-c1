import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  private timerInterval: any;
  private totalSeconds: number = 180;
  public time: string = '03:00';

  constructor() { }

  startTimer(callback?: () => void) {
    this.totalSeconds = 180;
    this.updateTimeString();

    this.timerInterval = setInterval(() => {
      if (this.totalSeconds > 0) {
        this.totalSeconds--;
        this.updateTimeString();
      } else {
        this.stopTimer();
        if (callback) callback();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  getTime(): string {
    return this.time;
  }

  private updateTimeString() {
    const minutes = Math.floor(this.totalSeconds / 60);
    const seconds = this.totalSeconds % 60;
    this.time = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
