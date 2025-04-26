import { Component } from '@angular/core';
import { MayorMenorService } from '../../services/mayor-menor/mayor-menor.service';

@Component({
  selector: 'app-mayor-menor-page',
  imports: [],
  templateUrl: './mayor-menor-page.component.html',
  styleUrl: './mayor-menor-page.component.css'
})
export class MayorMenorPageComponent {

  constructor(public mayorMenorService: MayorMenorService) { }

  ngOnInit() {
    this.mayorMenorService.startTimer();
  }

  ngOnDestroy() {
    this.mayorMenorService.stopTimer();
  }

  get time(): string {
    return this.mayorMenorService.getTime();
  }

  get livesArray(): any[] {
    return Array(this.mayorMenorService.getLives()).fill(0);
  }

}
