import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private baseUrl: string = 'https://api.github.com/users';

  /**
   * Constructor del servicio GithubService.
   * 
   * Este constructor recibe una instancia de HttpClient para hacer solicitudes HTTP.
   * @param {HttpClient} http - El cliente HTTP para hacer solicitudes GET.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene la información de un usuario de GitHub dado su nombre de usuario.
   * 
   * @param {string} username - El nombre de usuario de GitHub del usuario cuya información se desea obtener.
   * @returns {Observable<any>} Un observable con la respuesta de la API, que contiene la información del usuario.
   */
  getUser(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${username}`);
  }
}
