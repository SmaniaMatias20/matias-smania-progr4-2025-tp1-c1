import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  @Input() title: string = '¿Estás seguro?';
  @Input() message: string = 'Esta acción no se puede deshacer.';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  /**
   * Método que se ejecuta cuando el usuario hace clic en "Confirmar".
   * Emite el evento `confirm` para notificar al componente padre.
   */
  onConfirm() {
    this.confirm.emit();
  }

  /**
 * Método que se ejecuta cuando el usuario hace clic en "Cancelar".
 * Emite el evento `cancel` para notificar al componente padre.
 */
  onCancel() {
    this.cancel.emit();
  }
}
