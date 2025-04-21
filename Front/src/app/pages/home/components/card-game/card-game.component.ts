import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RulesDialogComponent } from '../rules-dialog/rules-dialog.component';

@Component({
  selector: 'app-card-game',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './card-game.component.html',
})
export class CardGameComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() image!: string;
  @Input() link!: string;
  @Input() rules!: string;
  @Input() lifes!: string;
  @Input() time!: string;
  @Input() user!: string;

  constructor(private dialog: MatDialog) { }

  openRules(): void {
    this.dialog.open(RulesDialogComponent, {
      data: {
        title: this.title,
        rules: this.rules,
        lifes: this.lifes,
        time: this.time
      }
    });
  }
}
