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
  private currentQuestionIndex = 0;
  private name = 'preguntados';
  private roundPoints = 1000;

  constructor(private http: HttpClient) {
    super();
  }

  async loadQuestions() {
    try {
      const data = await firstValueFrom(
        this.http.get<Question[]>('assets/data/questions.json')
      );
      this.questions = data;
    } catch (error) {
      console.error('Error cargando preguntas:', error);
    }
  }

  async newGame() {
    await this.loadQuestions();
    this.setScore(0);
    this.setLives(3);
    this.totalSeconds = 180;
    this.finished = false;
    this.victory = false;
    this.setPause(false);
    this.currentQuestionIndex = 0;
    this.updateTimeString();

    this.startTimer(() => {
      this.endGame(this.victory, this.name);
    });
  }
  startGame() {
    this.newGame();
  }

  getCurrentQuestion(): Question | null {
    return this.questions[this.currentQuestionIndex] || null;
  }

  getCurrentOptions(): string[] {
    const question = this.getCurrentQuestion();
    return question ? question.options : [];
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.victory = true;
      this.endGame(true, this.name);
    }
  }

  isGameOver(): boolean {
    return this.finished || this.getLives() <= 0;
  }

  isRoundWon(): boolean {
    // Agregar logica para ronda ganada
    return true;
  }

  answer(answer: string): boolean {
    const current = this.getCurrentQuestion();
    if (!current) return false;

    const isCorrect = current.correctAnswer === answer;
    if (isCorrect) {
      this.score += this.roundPoints;
      this.nextQuestion();
    } else {
      this.loseLife();
      if (this.getLives() <= 0) {
        this.endGame(false, this.name);
      }
    }
    return isCorrect;
  }
}
