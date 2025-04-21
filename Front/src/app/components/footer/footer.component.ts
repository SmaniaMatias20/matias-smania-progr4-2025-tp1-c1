import { Component, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  standalone: true,
})
export class FooterComponent {
  user!: Signal<any>;

  constructor(private authService: AuthService) {
    this.user = this.authService.user;
  }
  currentYear: number = new Date().getFullYear();
}
