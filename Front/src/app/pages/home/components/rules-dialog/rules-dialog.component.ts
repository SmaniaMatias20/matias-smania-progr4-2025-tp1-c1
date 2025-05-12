import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rules-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './rules-dialog.component.html',
})
export class RulesDialogComponent {

  /**
   * Constructor del componente RulesDialogComponent.
   *
   * @param {MatDialogRef<RulesDialogComponent>} dialogRef Referencia al diálogo para poder cerrarlo.
   * @param {{ title: string; rules: string; lifes: string; time: string }} data Datos inyectados con información sobre el juego.
   */
  constructor(
    public dialogRef: MatDialogRef<RulesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; rules: string; lifes: string; time: string }
  ) { }

  /**
   * Cierra el diálogo actual.
   *
   * @returns {void}
   */
  close(): void {
    this.dialogRef.close();
  }
}
