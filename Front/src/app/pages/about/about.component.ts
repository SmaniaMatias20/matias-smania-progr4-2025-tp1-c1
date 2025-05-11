import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github/github.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  user: any;
  error: string = '';

  /* 
  * Constructor donde se inyecta el servicio de GithubService.
  */
  constructor(private githubService: GithubService) { }

  /* 
  * Método que se ejecuta cuando se inicializa el componente.
  * En este método se hace una llamada al servicio GithubService para obtener 
  * los datos del usuario de GitHub y manejar posibles errores.
  */
  ngOnInit(): void {
    this.githubService.getUser('SmaniaMatias20').subscribe({
      next: (data) => this.user = data,
      error: () => this.error = 'Error al obtener datos del usuario'
    });
  }
}
