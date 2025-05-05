import { DatabaseService } from '../services/database/database.service';
import { AuthService } from '../services/auth/auth.service';
import { User } from '@supabase/supabase-js';

export class Game {
    protected supabase: DatabaseService = new DatabaseService();
    protected authService: AuthService = new AuthService(this.supabase);
    protected timerInterval: any;
    protected totalSeconds: number = 180;
    protected lives: number = 3;
    protected time: string = '03:00';
    protected isPause: boolean = false;
    protected victory: boolean = false;
    protected finished: boolean = false;
    protected roundVictory: boolean = false;
    protected score: number = 0;
    protected user: User | boolean = this.authService.getUser();
    protected userId = typeof this.user === 'object' && this.user !== null ? this.user.id : null;
    protected loading: boolean = false;

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

    getLoading(): boolean {
        return this.loading;
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

    getRoundVictory(): boolean {
        return this.roundVictory;
    }

    setPause(isPause: boolean) {
        this.isPause = isPause;
    }

    setScore(score: number) {
        this.score = score;
    }

    setLives(lives: number) {
        this.lives = lives
    }

    setVictory(victory: boolean) {
        this.victory = victory;
    }

    setRoundVictory(roundVictory: boolean) {
        this.roundVictory = roundVictory;
    }

    setFinished(finished: boolean) {
        this.finished = finished;
    }

    setTotalSeconds(totalSeconds: number) {
        this.totalSeconds = totalSeconds;
    }

    setLoading(loading: boolean) {
        this.loading = loading;
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

    private async saveResult(data: { id_user: string | null; id_game: string; firstname: string | null; lastname: string | null; score: number; victory: boolean }) {
        if (!this.supabase) throw new Error('Supabase client not initialized');

        const { error } = await this.supabase.client.from('results').insert({
            id_user: data.id_user,
            id_game: data.id_game,
            firstname: data.firstname,
            lastname: data.lastname,
            score: data.score,
            victory: data.victory
        });

        if (error) throw error;
    }

    async endGame(won: boolean, gameName: string): Promise<void> {
        this.stopTimer();
        this.finished = true;
        this.victory = won;

        try {
            const idGame = await this.supabase.getGameIdByName(gameName);
            const user = await this.supabase.getUserById(this.userId);

            if (!user) {
                console.error('No se encontró el usuario con ese id');
                return;
            }

            if (idGame === null) {
                console.error('No se encontró el juego con ese nombre');
                return;
            }

            const { firstname, lastname } = user;

            await this.saveResult({
                id_user: this.userId,
                id_game: idGame,
                firstname: firstname,
                lastname: lastname,
                score: this.score,
                victory: this.victory
            });
        } catch (error) {
            console.error('Error al guardar resultado:', error);
        }
    }


}

