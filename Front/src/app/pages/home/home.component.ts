import { Component } from '@angular/core';
import { CardGameComponent } from './components/card-game/card-game.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardGameComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
