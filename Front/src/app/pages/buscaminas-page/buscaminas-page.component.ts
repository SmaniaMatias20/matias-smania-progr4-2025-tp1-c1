import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscaminasService } from '../../services/buscaminas/buscaminas.service'; import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { GameResultComponent } from '../../components/game-result/game-result.component';
import { Router } from '@angular/router';

interface Cell {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

@Component({
  selector: 'app-buscaminas-page',
  imports: [GameResultComponent, ConfirmDialogComponent, CommonModule],
  templateUrl: './buscaminas-page.component.html',
  styleUrls: ['./buscaminas-page.component.css']
})
export class BuscaminasPageComponent implements OnInit {
  showConfirmExit = signal(false);

  constructor(public buscaminasService: BuscaminasService, private router: Router) { }

  ngOnInit(): void {
    this.buscaminasService.newGame()
  }

  get livesArray(): any[] {
    return Array(this.buscaminasService.getLives()).fill(0);
  }

  get paused(): boolean {
    return this.buscaminasService.getPause();
  }

  get board(): Cell[][] {
    return this.buscaminasService.board;
  }

  get score(): number {
    return this.buscaminasService.getScore();
  }

  get victory(): boolean {
    return this.buscaminasService.getVictory();
  }

  get finished(): boolean {
    return this.buscaminasService.getFinished();
  }

  get time(): string {
    return this.buscaminasService.getTime();
  }

  onCellClick(cell: Cell): void {
    this.buscaminasService.revealCell(cell.row, cell.col);
  }

  onRightClick(event: MouseEvent, cell: Cell): void {
    event.preventDefault();
    this.buscaminasService.toggleFlag(cell.row, cell.col);
  }

  pause() {
    this.buscaminasService.pause();
  }

  resume() {
    this.buscaminasService.resume();
  }

  exit() {
    this.buscaminasService.stopTimer();
    this.router.navigate(['/home']);
  }

  playAgain() {
    this.buscaminasService.newGame();
  }

  requestExit() {
    this.showConfirmExit.set(true);
  }

  confirmExit() {
    this.showConfirmExit.set(false);
    this.exit();
  }

  cancelExit() {
    this.showConfirmExit.set(false);
  }
}
