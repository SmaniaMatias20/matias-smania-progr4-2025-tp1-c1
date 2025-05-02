import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css']
})
export class ResultsTableComponent {
  @Input() columns: { field: string, label: string }[] = [];
  @Input() data: any[] = [];

  constructor() {
    console.log(this.columns);
    console.log(this.data);
  }
}
