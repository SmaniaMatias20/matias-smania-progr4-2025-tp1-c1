import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css']
})
export class GameResultComponent {
  @Input() isVictory: boolean = false;
  @Input() score: number = 0;
  @Input() resume: boolean = false;
  @Input() message: string = "";
  @Output() closeModal = new EventEmitter<void>();
  @Output() endGame = new EventEmitter<void>();

  constructor(private router: Router) { }

  onClose() {
    this.closeModal.emit();
  }

  onEndGame() {
    this.endGame.emit();
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
