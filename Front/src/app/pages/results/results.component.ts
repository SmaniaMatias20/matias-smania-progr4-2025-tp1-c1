import { Component } from '@angular/core';
import { ResultsTableComponent } from './components/results-table/results-table.component';

@Component({
  selector: 'app-results',
  imports: [ResultsTableComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  currentPage: number = 1;
  totalPages: number = 4;

  columns = [
    { field: 'name', label: 'Nombre' },
    { field: 'score', label: 'Puntuación' },
    { field: 'date', label: 'Fecha' }
  ];

  scores = [
    { name: 'Juan', score: 95, date: '2024-04-20' },
    { name: 'Ana', score: 88, date: '2024-04-19' },
    { name: 'Luis', score: 72, date: '2024-04-18' },
    { name: 'Juan', score: 95, date: '2024-04-20' },
    { name: 'Ana', score: 88, date: '2024-04-19' },
    { name: 'Juan', score: 95, date: '2024-04-20' },
    { name: 'Ana', score: 88, date: '2024-04-19' },
    { name: 'Luis', score: 72, date: '2024-04-18' },
    { name: 'Juan', score: 95, date: '2024-04-20' },
    { name: 'Ana', score: 88, date: '2024-04-19' },
    { name: 'Luis', score: 72, date: '2024-04-18' }
  ];


  changePage(direction: number): void {
    this.currentPage += direction;

    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }


}
