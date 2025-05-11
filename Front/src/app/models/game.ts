import { DatabaseService } from '../services/database/database.service';
import { AuthService } from '../services/auth/auth.service';
import { User } from '@supabase/supabase-js';

export class Game {
    // Servicios
    protected supabase: DatabaseService = new DatabaseService();
    protected authService: AuthService = new AuthService(this.supabase);

    // Estado del juego
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

    /**
    * Inicia el temporizador del juego.
    * @param callback Función opcional que se ejecuta cuando el tiempo se agota.
    */
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

    /**
    * Detiene el temporizador del juego.
    */
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    /**
    * Reanuda el temporizador si está detenido y aún queda tiempo.
    * @param callback Función opcional que se ejecuta cuando el tiempo se agota.
    */
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

    // Métodos getter para obtener el estado actual del juego
    getLoading(): boolean { return this.loading; }
    getScore(): number { return this.score; }
    getTime(): string { return this.time; }
    getLives(): number { return this.lives; }
    getPause(): boolean { return this.isPause; }
    getVictory(): boolean { return this.victory; }
    getFinished(): boolean { return this.finished; }
    getRoundVictory(): boolean { return this.roundVictory; }

    // Métodos setter para actualizar el estado del juego
    setPause(isPause: boolean) { this.isPause = isPause; }
    setScore(score: number) { this.score = score; }
    setLives(lives: number) { this.lives = lives; }
    setVictory(victory: boolean) { this.victory = victory; }
    setRoundVictory(roundVictory: boolean) { this.roundVictory = roundVictory; }
    setFinished(finished: boolean) { this.finished = finished; }
    setTotalSeconds(totalSeconds: number) { this.totalSeconds = totalSeconds; }
    setLoading(loading: boolean) { this.loading = loading; }

    /**
    * Resta una vida al jugador, asegurando que no baje de 0.
    */
    loseLife() {
        this.lives = Math.max(0, this.lives - 1);
    }

    /**
    * Actualiza la representación en string del tiempo restante.
    */
    protected updateTimeString() {
        const minutes = Math.floor(this.totalSeconds / 60);
        const seconds = this.totalSeconds % 60;
        this.time = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
    }

    /**
    * Agrega un cero a la izquierda si el número es menor que 10.
    * @param num Número a formatear
    * @returns String con cero a la izquierda si corresponde
    */
    protected padZero(num: number): string {
        return num < 10 ? `0${num}` : `${num}`;
    }

    /**
    * Pausa el juego y detiene el temporizador.
    */
    pause() {
        this.setPause(true);
        this.stopTimer();
    }

    /**
    * Reanuda el juego y el temporizador.
    */
    resume() {
        this.setPause(false);
        this.resumeTimer();
    }

    /**
    * Calcula la puntuación final sumando bonificaciones por vidas y tiempo restante.
    */
    calculateFinalScore(): void {
        if (!this.victory) return;

        const bonusFromLives = this.lives * 1000;
        const bonusFromTime = this.totalSeconds * 100;
        const totalBonus = bonusFromLives + bonusFromTime;

        this.score += totalBonus;
    }

    /**
    * Guarda el resultado del juego en la base de datos.
    * @param data Información del resultado a guardar.
    */
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

    /**
    * Finaliza el juego, calcula la puntuación si corresponde y guarda el resultado en la base de datos.
    * @param won Indica si el jugador ganó o no.
    * @param gameName Nombre del juego actual.
    */
    async endGame(won: boolean, gameName: string): Promise<void> {
        this.stopTimer();
        this.finished = true;
        this.victory = won;

        if (this.victory) {
            this.calculateFinalScore();
        }

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

