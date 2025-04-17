import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from '../../services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private router: Router,
    public darkModeService: DarkModeService
  ) { }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  isDarkMode(): boolean {
    return this.darkModeService.getDarkMode();
  }

  onLogout(): void {
    this.router.navigate(['/login']);
  }
}
