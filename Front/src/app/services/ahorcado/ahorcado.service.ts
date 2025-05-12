import { Injectable } from '@angular/core';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService extends Game {
  private name: string = "ahorcado";
  private word: string = '';
  private displayed: string[] = [];
  private guessedLetters: Set<string> = new Set();
  private allWords = [
    'ANGULAR', 'PROGRAMAR', 'DESARROLLO', 'AHORCADO', 'PREGUNTAS',
    'JAVASCRIPT', 'VARIABLE', 'COMPONENTE', 'FUNCION', 'SERVICIO',
    'MODULO', 'TYPESCRIPT', 'TEMPLATE', 'HTML', 'CSS', 'JUEGO', 'LOGICA'
  ];
  private wordList: string[] = [];
  private guessedWords: Set<string> = new Set();
  private roundPoints = 1000;

  /**
   * Constructor del servicio Ahorcado.
   */
  constructor() {
    super();
  }

  /**
   * Inicia un nuevo juego, reinicia los estados y comienza el temporizador.
   *
   * @returns {void}
   */
  newGame() {
    this.setScore(0);
    this.setLives(6);
    this.setTotalSeconds(180);
    this.setFinished(false);
    this.setVictory(false);
    this.guessedWords.clear();
    this.setPause(false);
    this.fillRandomWords();
    this.updateTimeString();
    this.loadNewWord();

    this.startTimer(() => {
      this.endGame(this.victory, this.name);
    });
  }

  /**
   * Llena `wordList` con 5 palabras aleatorias de `allWords`.
   *
   * @returns {void}
   */
  private fillRandomWords() {
    const shuffled = [...this.allWords].sort(() => 0.5 - Math.random());
    this.wordList = shuffled.slice(0, 5);
  }

  /**
   * Retorna una palabra aleatoria no adivinada de la lista.
   *
   * @returns {string} Palabra aleatoria.
   */
  private getRandomWord(): string {
    const remainingWords = this.wordList.filter(word => !this.guessedWords.has(word));
    const index = Math.floor(Math.random() * remainingWords.length);
    return remainingWords[index];
  }

  /**
   * Carga una nueva palabra para adivinar o finaliza el juego si no quedan palabras.
   *
   * @returns {void}
   */
  private loadNewWord(): void {
    const remainingWords = this.wordList.filter(word => !this.guessedWords.has(word));
    if (remainingWords.length === 0) {
      this.endGame(this.victory, this.name);
      return;
    }
    this.word = this.getRandomWord();
    this.displayed = Array(this.word.length).fill('_');
    this.guessedLetters.clear();
  }

  /**
   * Intenta adivinar una letra. Actualiza el estado del juego según el resultado.
   *
   * @param {string} letter Letra adivinada.
   * @returns {boolean} Verdadero si la letra está en la palabra, falso si no o si el juego terminó.
   */
  guessLetter(letter: string): boolean {
    if (this.guessedLetters.has(letter) || this.getFinished()) return false;

    this.guessedLetters.add(letter);

    let correct = false;
    this.word.split('').forEach((char, index) => {
      if (char === letter) {
        this.displayed[index] = letter;
        correct = true;
      }
    });

    if (!correct) {
      this.loseLife();
    }

    if (this.isRoundWon()) {
      this.setScore(this.getScore() + this.roundPoints);
      this.guessedWords.add(this.word);
      this.setLives(6);

      const allWordsGuessed = this.guessedWords.size === this.wordList.length;
      if (allWordsGuessed) {
        this.setVictory(true);
        this.endGame(this.victory, this.name);
        this.displayed.push("_");
      } else {
        setTimeout(() => {
          this.loadNewWord();
        }, 2000);
      }
    } else if (this.isGameOver()) {
      this.endGame(this.victory, this.name);
    }

    return correct;
  }

  /**
   * Retorna el estado actual de la palabra mostrada.
   *
   * @returns {string[]} Arreglo con letras adivinadas y guiones bajos.
   */
  getDisplayedWord(): string[] {
    return this.displayed;
  }

  /**
   * Verifica si se completó correctamente la palabra actual.
   *
   * @returns {boolean} Verdadero si se adivinó toda la palabra.
   */
  isRoundWon(): boolean {
    return !this.displayed.includes('_');
  }

  /**
   * Verifica si el juego ha terminado por falta de vidas.
   *
   * @returns {boolean} Verdadero si las vidas llegaron a cero.
   */
  isGameOver(): boolean {
    return this.getLives() === 0;
  }

  /**
   * Devuelve la palabra actual a adivinar.
   *
   * @returns {string} Palabra actual.
   */
  getWord(): string {
    return this.word;
  }

  /**
   * Verifica si una letra ya fue utilizada.
   *
   * @param {string} letter Letra a verificar.
   * @returns {boolean} Verdadero si ya fue usada.
   */
  isLetterUsed(letter: string): boolean {
    return this.guessedLetters.has(letter);
  }

}
