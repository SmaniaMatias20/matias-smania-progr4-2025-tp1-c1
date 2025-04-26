export class Game {
    protected timerInterval: any;
    protected totalSeconds: number = 180;
    protected lives: number = 3;
    protected time: string = '03:00';

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

    getLives(): number {
        return this.lives;
    }

    protected updateTimeString() {
        const minutes = Math.floor(this.totalSeconds / 60);
        const seconds = this.totalSeconds % 60;
        this.time = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
    }

    protected padZero(num: number): string {
        return num < 10 ? `0${num}` : `${num}`;
    }
}
