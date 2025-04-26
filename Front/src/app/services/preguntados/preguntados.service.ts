import { Injectable } from '@angular/core';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService extends Game {

  constructor() {
    super();
  }

}
