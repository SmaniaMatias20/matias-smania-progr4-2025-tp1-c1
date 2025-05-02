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
        this.http.get<any>('https://opentdb.com/api.php?amount=10&type=multiple&language=es')
      );

      this.questions = data.results.map((item: any) => ({
        question: item.question,
        options: [...item.incorrect_answers, item.correct_answer],
        correctAnswer: item.correct_answer
      }));

    } catch (error) {
      console.error('Error cargando preguntas desde la API:', error);
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
    this.setRoundVictory(false);
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
    return this.getRoundVictory();
  }

  answer(answer: string): boolean {
    const current = this.getCurrentQuestion();
    if (!current) return false;

    const isCorrect = current.correctAnswer === answer;
    this.setRoundVictory(isCorrect);

    if (isCorrect) {
      this.score += this.roundPoints;
      // Mostramos feedback y luego pasamos de pregunta
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
}
