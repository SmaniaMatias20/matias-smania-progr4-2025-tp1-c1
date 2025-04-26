import { Component } from '@angular/core';
import { AhorcadoService } from '../../services/ahorcado/ahorcado.service';

@Component({
  selector: 'app-preguntados-page',
  imports: [],
  templateUrl: './preguntados-page.component.html',
  styleUrl: './preguntados-page.component.css'
})
export class PreguntadosPageComponent {

  constructor(public ahorcadoService: AhorcadoService) { }

  ngOnInit() {
    this.ahorcadoService.startTimer();
  }

  ngOnDestroy() {
    this.ahorcadoService.stopTimer();
  }

  get time(): string {
    return this.ahorcadoService.getTime();
  }

  get livesArray(): any[] {
    return Array(this.ahorcadoService.getLives()).fill(0);
  }


}
