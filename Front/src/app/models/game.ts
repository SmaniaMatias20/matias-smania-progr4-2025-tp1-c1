

export class Game {
    protected timerInterval: any;
    protected totalSeconds: number = 180;
    protected lives: number = 3;
    protected time: string = '03:00';
    protected isPause: boolean = false;
    protected victory: boolean = false;
    protected finished: boolean = false;
    protected score: number = 0;

    constructor() { }

    startTimer(callback?: () => void) {
        this.totalSeconds = 180;
        this.finished = false;
        this.victory = false;
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

    resumeTimer(callback?: () => void) {
        if (this.timerInterval || this.totalSeconds <= 0) return;

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

    getScore(): number {
        return this.score;
    }

    getTime(): string {
        return this.time;
    }

    getLives(): number {
        return this.lives;
    }

    getPause(): boolean {
        return this.isPause;
    }

    getVictory(): boolean {
        return this.victory;
    }

    getFinished(): boolean {
        return this.finished;
    }

    setPause(isPause: boolean) {
        this.isPause = isPause;
    }

    setScore(score: number) {
        this.score = score;
    }

    loseLife() {
        this.lives = Math.max(0, this.lives - 1);
    }

    protected updateTimeString() {
        const minutes = Math.floor(this.totalSeconds / 60);
        const seconds = this.totalSeconds % 60;
        this.time = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
    }

    protected padZero(num: number): string {
        return num < 10 ? `0${num}` : `${num}`;
    }

    pause() {
        this.setPause(true);
        this.stopTimer();
    }

    resume() {
        this.setPause(false);
        this.resumeTimer();
    }

    winGame() {
        this.victory = true;
        this.finished = true;
        this.stopTimer();
    }

    loseGame() {
        this.victory = false;
        this.finished = true;
        this.stopTimer();
    }

    isVictory(): boolean {
        return this.victory;
    }

    isFinished(): boolean {
        return this.finished;
    }
}

