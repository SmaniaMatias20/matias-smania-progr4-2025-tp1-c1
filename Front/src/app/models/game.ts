import { DatabaseService } from '../services/database/database.service';

export class Game {
    protected supabase: DatabaseService = new DatabaseService();
    protected timerInterval: any;
    protected totalSeconds: number = 180;
    protected lives: number = 3;
    protected time: string = '03:00';
    protected isPause: boolean = false;
    protected victory: boolean = false;
    protected finished: boolean = false;
    protected score: number = 0;

    constructor() {
    }

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

    async saveResult(data: { id_user: number; id_game: number; score: number; victory: boolean }) {
        if (!this.supabase) throw new Error('Supabase client not initialized');

        const { error } = await this.supabase.client.from('results').insert({
            id_user: data.id_user,
            id_game: data.id_game,
            score: data.score,
            victory: data.victory
        });

        if (error) throw error;
    }

    // Método que finaliza el juego y guarda el resultado
    async endGame(won: boolean, gameName: string, userId: number): Promise<void> {
        this.stopTimer();
        this.finished = true;
        this.victory = won;

        try {
            // Obtener el id_game usando el nombre del juego desde el servicio
            const idGame = await this.supabase.getGameIdByName(gameName);

            if (idGame === null) {
                console.error('No se encontró el juego con ese nombre');
                return;
            }

            // Guardar en Supabase
            await this.saveResult({
                id_user: userId,
                id_game: idGame,
                score: this.score,
                victory: this.victory
            });
        } catch (error) {
            console.error('Error al guardar resultado:', error);
        }
    }


}

