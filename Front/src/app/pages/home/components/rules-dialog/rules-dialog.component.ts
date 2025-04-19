import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rules-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './rules-dialog.component.html',
})
export class RulesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RulesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; rules: string }
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}
