import { Injectable } from '@angular/core';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService extends Game {

  constructor() {
    super()
  }

}
