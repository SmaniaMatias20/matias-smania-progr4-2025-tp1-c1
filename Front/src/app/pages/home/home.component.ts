import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
//import { AuthService } from '../../services/auth.service'; // Asegurate que existe

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoggedIn: boolean = false;
  username: string = '';

  //constructor(private authService: AuthService) { }

  ngOnInit() {
    // this.isLoggedIn = this.authService.isLoggedIn();
    this.isLoggedIn = true;
    if (this.isLoggedIn) {
      //this.username = this.authService.getUsername(); // Esto dependerá de tu implementación
      this.username = "Matias"
    }
  }

  logout() {
    //this.authService.logout();
    //window.location.reload(); // O usar navegación para volver al estado inicial
  }
}
