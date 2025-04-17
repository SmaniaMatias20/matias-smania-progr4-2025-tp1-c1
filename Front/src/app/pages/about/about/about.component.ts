import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../../services/github/github.service';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-about',
  standalone: true, // solo si estás usando Angular standalone components
  imports: [NavbarComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  user: any;
  error: string = '';

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.githubService.getUser('SmaniaMatias20').subscribe({
      next: (data) => this.user = data,
      error: () => this.error = 'Error al obtener datos del usuario'
    });
  }
}
