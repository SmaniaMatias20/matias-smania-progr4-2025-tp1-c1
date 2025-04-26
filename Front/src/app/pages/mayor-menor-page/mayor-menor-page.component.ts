import { Component } from '@angular/core';
import { AhorcadoService } from '../../services/ahorcado/ahorcado.service';

@Component({
  selector: 'app-mayor-menor-page',
  imports: [],
  templateUrl: './mayor-menor-page.component.html',
  styleUrl: './mayor-menor-page.component.css'
})
export class MayorMenorPageComponent {

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
