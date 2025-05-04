import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent {
  @Input() title: string = '¡Respuesta correcta!';
  @Input() message: string = 'Muy bien, acertaste.';
}
