import { Component, OnInit } from '@angular/core';
import { ResultsTableComponent } from './components/results-table/results-table.component';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-results',
  imports: [ResultsTableComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  currentPage: number = 1;
  totalPages: number = 4;

  columns = [
    { field: 'name', label: 'Nombre' },
    { field: 'score', label: 'Puntuación' },
    { field: 'victory', label: 'Victoria' },
    { field: 'date', label: 'Fecha' }
  ];

  resultsByGame: { [key: string]: any[] } = {};

  constructor(private database: DatabaseService) { }

  async ngOnInit() {
    const data = await this.database.getFormattedResults();
    if (data) {
      this.groupResultsByGame(data);
    }
  }

  groupResultsByGame(data: any[]) {
    this.resultsByGame = {};
    data.forEach(result => {
      const gameName = result.gameName ?? 'Desconocido';
      if (!this.resultsByGame[gameName]) {
        this.resultsByGame[gameName] = [];
      }
      this.resultsByGame[gameName].push(result);
    });

    console.log(this.resultsByGame);
  }

  changePage(direction: number): void {
    this.currentPage += direction;

    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }
}
