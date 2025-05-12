import { Component, OnInit } from '@angular/core';
import { ResultsTableComponent } from './components/results-table/results-table.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-results',
  imports: [ResultsTableComponent, SpinnerComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  currentPage: number = 1;
  totalPages: number = 4;
  loading: boolean = true;
  resultsByGame: { [key: string]: any[] } = {};

  columns = [
    { field: 'name', label: 'Nombre Completo' },
    { field: 'score', label: 'Puntuación' },
    { field: 'victory', label: 'Victoria' },
    { field: 'date', label: 'Fecha' }
  ];

  /**
   * Constructor del componente.
   *
   * @param {DatabaseService} database Servicio que proporciona acceso a los datos almacenados.
   */
  constructor(private database: DatabaseService) { }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Carga y agrupa los resultados desde la base de datos.
   *
   * @returns {Promise<void>}
   */
  async ngOnInit(): Promise<void> {
    const data = await this.database.getFormattedResults();
    if (data) {
      this.groupResultsByGame(data);
    }
    this.loading = false;
  }

  /**
   * Agrupa los resultados obtenidos por nombre de juego.
   *
   * @param {any[]} data Lista de resultados sin agrupar.
   * @returns {void}
   */
  groupResultsByGame(data: any[]): void {
    this.resultsByGame = {};
    data.forEach(result => {
      const gameName = result.gameName ?? 'Desconocido';
      if (!this.resultsByGame[gameName]) {
        this.resultsByGame[gameName] = [];
      }
      this.resultsByGame[gameName].push(result);
    });
  }

  /**
   * Cambia de página en la vista de resultados.
   *
   * @param {number} direction Dirección del cambio de página (1 para siguiente, -1 para anterior).
   * @returns {void}
   */
  changePage(direction: number): void {
    this.currentPage += direction;

    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }
}
