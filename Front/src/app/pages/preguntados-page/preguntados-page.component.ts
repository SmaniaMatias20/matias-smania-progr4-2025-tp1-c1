import { Component } from '@angular/core';
import { PreguntadosService } from '../../services/preguntados/preguntados.service';

@Component({
  selector: 'app-preguntados-page',
  imports: [],
  templateUrl: './preguntados-page.component.html',
  styleUrl: './preguntados-page.component.css'
})
export class PreguntadosPageComponent {

  constructor(public preguntadosService: PreguntadosService) { }

  ngOnInit() {
    this.preguntadosService.startTimer();
  }

  ngOnDestroy() {
    this.preguntadosService.stopTimer();
  }

  get time(): string {
    return this.preguntadosService.getTime();
  }

  get livesArray(): any[] {
    return Array(this.preguntadosService.getLives()).fill(0);
  }


}
