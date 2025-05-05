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
  board: Cell[][] = [];
  rows = 10;
  cols = 10;
  totalMines = 20;

  constructor() {
    super();

  }

  newGame(): void {
    this.board = this.createEmptyBoard();
    this.placeMines();
    this.calculateAdjacentNumbers();
    this.setTotalSeconds(180);
    this.setLives(3);
  }

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

  private calculateAdjacentNumbers(): void {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = this.board[r][c];
        if (cell.isMine) continue;
        cell.adjacentMines = this.getAdjacentCells(r, c).filter(n => n.isMine).length;
      }
    }
  }

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

  revealCell(row: number, col: number): void {
    const cell = this.board[row][col];
    if (cell.isRevealed || cell.isFlagged || this.getFinished()) return;

    cell.isRevealed = true;

    if (cell.isMine) {
      this.loseLife();
      if (this.getLives() <= 0) {
        this.endGame(false, 'Buscaminas');
      }
      return;
    }

    this.setScore(this.getScore() + 1);

    if (cell.adjacentMines === 0) {
      this.getAdjacentCells(row, col).forEach(adj => {
        if (!adj.isRevealed) this.revealCell(adj.row, adj.col);
      });
    }

    this.checkVictoryCondition();
  }

  toggleFlag(row: number, col: number): void {
    const cell = this.board[row][col];
    if (cell.isRevealed) return;
    cell.isFlagged = !cell.isFlagged;
  }

  private checkVictoryCondition(): void {
    const unrevealed = this.board.flat().filter(c => !c.isRevealed);
    const mines = this.board.flat().filter(c => c.isMine);
    if (unrevealed.length === mines.length) {
      this.setVictory(true);
      this.setRoundVictory(true);
      this.endGame(true, 'Buscaminas');
    }
  }
}
