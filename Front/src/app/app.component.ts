import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showNavbarAndFooter: boolean = true;

  /**
   * Constructor de la clase AppComponent.
   * @param {Router} router - El servicio Router de Angular, utilizado para gestionar la navegación y los eventos de navegación en la aplicación.
   */
  constructor(private router: Router) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Nos suscribimos a los eventos de navegación para detectar cuando la navegación ha terminado.
   * Dependiendo de la URL, decidimos si mostrar el Navbar y el Footer.
   * @returns {void}
   */
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showNavbarAndFooter = !event.url.includes('/games');
    });
  }

}
