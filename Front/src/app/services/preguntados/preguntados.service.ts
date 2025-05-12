import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../../models/game';
import { firstValueFrom } from 'rxjs';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService extends Game {
  private questions: Question[] = [];
  private currentQuestionIndex: number = 0;
  private name: string = 'preguntados';
  private roundPoints: number = 1000;
  private totalQuestions: number = 10;

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Carga las preguntas desde la API y establece el estado inicial del juego.
   * @returns {Promise<void>} Una promesa que se resuelve cuando las preguntas son cargadas.
   */
  async loadQuestions(): Promise<void> {
    try {
      this.setLoading(true);
      const data = await firstValueFrom(
        this.http.get<any>('https://api-questions-zjck.onrender.com/api/questions')
      );

      this.questions = data.map((item: any) => ({
        question: item.question,
        options: this.shuffleArray([...item.incorrect_answers, item.correct_answer]),
        correctAnswer: item.correct_answer
      }));
      this.setLoading(false);
    } catch (error) {
      console.error('Error cargando preguntas desde la API:', error);
    }
  }

  /**
   * Inicializa un nuevo juego cargando las preguntas y estableciendo el estado inicial del juego.
   * @returns {Promise<void>} Una promesa que se resuelve cuando el nuevo juego es inicializado.
   */
  async newGame(): Promise<void> {
    await this.loadQuestions();
    this.setScore(0);
    this.setLives(3);
    this.setTotalSeconds(180);
    this.setFinished(false);
    this.setRoundVictory(false);
    this.setPause(false);
    this.currentQuestionIndex = 0;
    this.updateTimeString();

    this.startTimer(() => {
      this.endGame(this.victory, this.name);
    });
  }

  /**
   * Obtiene el índice de la pregunta actual.
   * @returns {number} El índice de la pregunta actual.
   */
  getCurrentQuestionIndex(): number {
    return this.currentQuestionIndex;
  }

  /**
   * Obtiene el número total de preguntas en el juego.
   * @returns {number} El número total de preguntas.
   */
  getTotalQuestions(): number {
    return this.totalQuestions;
  }

  /**
   * Obtiene la pregunta actual que se está mostrando.
   * @returns {Question | null} El objeto de la pregunta actual, o null si no hay ninguna pregunta disponible.
   */
  getCurrentQuestion(): Question | null {
    return this.questions[this.currentQuestionIndex] || null;
  }

  /**
   * Obtiene las opciones de respuesta para la pregunta actual.
   * @returns {string[]} Un arreglo de las opciones de la pregunta actual.
   */
  getCurrentOptions(): string[] {
    const question = this.getCurrentQuestion();
    return question ? question.options : [];
  }

  /**
   * Avanza a la siguiente pregunta en el juego.
   * @returns {void}
   */
  nextQuestion(): void {
    this.setRoundVictory(false);
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.setVictory(true);
      this.endGame(true, this.name);
    }
  }


  /**
   * Verifica si el juego ha terminado.
   * @returns {boolean} Devuelve true si el juego ha terminado, false en caso contrario.
   */
  isGameOver(): boolean {
    return this.getFinished() || this.getLives() <= 0;
  }

  /**
   * Verifica si la ronda ha terminado.
   * @returns {boolean} Devuelve true si la ronda ha terminado, false en caso contrario.
   */
  isRoundWon(): boolean {
    return this.getRoundVictory();
  }

  /**
   * Mezcla aleatoriamente un arreglo.
   * @param {any[]} array - El arreglo que se quiere mezclar.
   * @returns {any[]} Un nuevo arreglo con los elementos mezclados.
   */
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * Maneja la respuesta a una pregunta y verifica si la respuesta es correcta.
   * @param {string} answer - La respuesta a la pregunta actual.
   * @returns {boolean} Devuelve true si la respuesta es correcta, false en caso contrario.
   */
  answer(answer: string): boolean {
    const current = this.getCurrentQuestion();
    if (!current) return false;

    const isCorrect = current.correctAnswer === answer;
    this.setRoundVictory(isCorrect);

    if (isCorrect) {
      this.setScore(this.getScore() + this.roundPoints);
      setTimeout(() => {
        this.setRoundVictory(false);
        this.nextQuestion();
      }, 2000);
    } else {
      this.loseLife();
      if (this.getLives() <= 0) {
        this.endGame(false, this.name);
      }
    }

    return isCorrect;
  }

  /**
   * Obtiene el progreso actual del juego como un porcentaje para la barra de progreso.
   * @returns {string} El ancho de la barra de progreso como un porcentaje (por ejemplo, '50%').
   */
  get progressBarWidth(): string {
    return `${((this.currentQuestionIndex + 1) / this.totalQuestions) * 100}%`;
  }
}
