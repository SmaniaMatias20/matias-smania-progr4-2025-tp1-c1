import { Injectable } from '@angular/core';
import { Game } from '../../models/game';

interface Cell {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

@Injectable({
  providedIn: 'root'
})
export class BuscaminasService extends Game {
  private name: string = "buscaminas";
  board: Cell[][] = [];
  rows = 10;
  cols = 10;
  totalMines = 10;

  /**
   * Constructor de la clase BuscaminasService. 
   * Llama al constructor de la clase base `Game`.
   */
  constructor() {
    super();
  }

  /**
   * Inicia un nuevo juego.
   * Establece el tablero vacío, coloca las minas, calcula los números de minas adyacentes,
   * establece los parámetros de juego como el tiempo límite, vidas, puntuación, y el estado de finalización.
   * Comienza el temporizador y define el comportamiento al finalizar el juego.
   * 
   * @returns {void} No retorna nada. Solo establece el estado inicial del juego.
   */
  newGame(): void {
    this.board = this.createEmptyBoard();
    this.placeMines();
    this.calculateAdjacentNumbers();
    this.setTotalSeconds(180);
    this.setLives(3);
    this.setScore(0);
    this.setFinished(false);
    this.setVictory(false);
    this.setPause(false);

    this.startTimer(() => {
      this.endGame(this.victory, this.name);
    });
  }

  /**
   * Crea un tablero vacío de celdas sin minas.
   * 
   * @returns {Cell[][]} Un tablero bidimensional de celdas.
   */
  private createEmptyBoard(): Cell[][] {
    const board: Cell[][] = [];
    for (let r = 0; r < this.rows; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < this.cols; c++) {
        row.push({
          row: r,
          col: c,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMines: 0
        });
      }
      board.push(row);
    }
    return board;
  }

  /**
   * Coloca las minas en el tablero de forma aleatoria.
   * Asegura que no haya minas en las celdas ya ocupadas.
   * 
   * @returns {void} No retorna nada, modifica directamente el tablero.
   */
  private placeMines(): void {
    let placed = 0;
    while (placed < this.totalMines) {
      const r = Math.floor(Math.random() * this.rows);
      const c = Math.floor(Math.random() * this.cols);
      const cell = this.board[r][c];
      if (!cell.isMine) {
        cell.isMine = true;
        placed++;
      }
    }
  }

  /**
   * Calcula el número de minas adyacentes a cada celda en el tablero.
   * 
   * @returns {void} No retorna nada, solo actualiza las celdas con la cantidad de minas adyacentes.
   */
  private calculateAdjacentNumbers(): void {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = this.board[r][c];
        if (cell.isMine) continue;
        cell.adjacentMines = this.getAdjacentCells(r, c).filter(n => n.isMine).length;
      }
    }
  }

  /**
   * Obtiene las celdas adyacentes a la celda indicada por las coordenadas de fila y columna.
   * 
   * @param {number} row Fila de la celda.
   * @param {number} col Columna de la celda.
   * @returns {Cell[]} Un array de las celdas adyacentes.
   */
  private getAdjacentCells(row: number, col: number): Cell[] {
    const neighbors: Cell[] = [];
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (
          r >= 0 && r < this.rows &&
          c >= 0 && c < this.cols &&
          (r !== row || c !== col)
        ) {
          neighbors.push(this.board[r][c]);
        }
      }
    }
    return neighbors;
  }

  /**
   * Revela una celda en el tablero.
   * Si la celda es una mina, pierde una vida; si la celda es segura, se revela y
   * se incrementa la puntuación. Si la celda tiene minas adyacentes 0, revela las celdas
   * adyacentes de forma recursiva.
   * 
   * @param {number} row Fila de la celda a revelar.
   * @param {number} col Columna de la celda a revelar.
   * @returns {void} No retorna nada, actualiza el estado de la celda.
   */
  revealCell(row: number, col: number): void {
    const cell = this.board[row][col];
    if (cell.isRevealed || cell.isFlagged || this.getFinished()) return;

    cell.isRevealed = true;

    if (cell.isMine) {
      this.loseLife();
      if (this.getLives() <= 0) {
        this.endGame(this.getVictory(), this.name);
      }
      return;
    }

    this.setScore(this.getScore() + 100);

    if (cell.adjacentMines === 0) {
      this.getAdjacentCells(row, col).forEach(adj => {
        if (!adj.isRevealed) this.revealCell(adj.row, adj.col);
      });
    }

    this.checkVictoryCondition();
  }

  /**
   * Cambia el estado de la bandera en una celda (marca o desmarca).
   * 
   * @param {number} row Fila de la celda a marcar.
   * @param {number} col Columna de la celda a marcar.
   * @returns {void} No retorna nada, solo modifica la celda.
   */
  toggleFlag(row: number, col: number): void {
    const cell = this.board[row][col];
    if (cell.isRevealed) return;
    cell.isFlagged = !cell.isFlagged;
  }

  /**
   * Verifica si se ha alcanzado la condición de victoria del juego.
   * La victoria se alcanza cuando todas las celdas no minas están reveladas.
   * 
   * @returns {void} No retorna nada, termina el juego si se ha alcanzado la victoria.
   */
  private checkVictoryCondition(): void {
    if (this.getFinished()) return;

    const unrevealed = this.board.flat().filter(c => !c.isRevealed);
    const mines = this.board.flat().filter(c => c.isMine);
    if (unrevealed.length === mines.length) {
      this.setVictory(true);
      this.setRoundVictory(true);
      this.endGame(this.getVictory(), this.name);
    }
  }
}
