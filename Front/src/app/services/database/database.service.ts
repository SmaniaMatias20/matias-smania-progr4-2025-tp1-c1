import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  supabase: SupabaseClient<any, "public", any>;

  /**
   * Constructor de la clase DatabaseService.
   * 
   * Este constructor inicializa la conexión a Supabase utilizando las credenciales definidas en el archivo de configuración del entorno.
   */
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  /**
   * Getter para acceder al cliente de Supabase.
   * 
   * @returns {SupabaseClient} El cliente de Supabase.
   */
  get client(): SupabaseClient {
    return this.supabase;
  }

  /**
   * Obtiene el ID de un juego dado su nombre.
   * 
   * @param {string} name - El nombre del juego.
   * @returns {Promise<string | null>} El ID del juego, o null si no se encuentra.
   */
  async getGameIdByName(name: string): Promise<string | null> {
    const { data, error } = await this.supabase
      .from('games')
      .select('id')
      .eq('name', name)
      .single();

    if (error) {
      console.error('Error al obtener id_game:', error);
      return null;
    }

    return data ? data.id : null;
  }

  /**
   * Obtiene el nombre de un juego dado su ID.
   * 
   * @param {string} gameId - El ID del juego.
   * @returns {Promise<string | null>} El nombre del juego, o null si no se encuentra.
   */
  async getGameNameById(gameId: string): Promise<string | null> {
    const { data, error } = await this.supabase
      .from('games')
      .select('name')
      .eq('id', gameId)
      .single();

    if (error) {
      console.error('Error al obtener el nombre del juego:', error);
      return null;
    }

    return data?.name ?? null;
  }

  /**
   * Obtiene los datos de un usuario por su ID.
   * 
   * @param {string | null} userId - El ID del usuario.
   * @returns {Promise<{ firstname: string, lastname: string } | null>} Los datos del usuario (nombre y apellido), o null si no se encuentra.
   */
  async getUserById(userId: string | null): Promise<{ firstname: string, lastname: string } | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('firstname, lastname')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
    }

    return data ? { firstname: data.firstname, lastname: data.lastname } : null;
  }

  /**
   * Obtiene los resultados formateados de la tabla 'results' y los devuelve junto con el nombre del juego asociado.
   * 
   * @returns {Promise<any[] | null>} Una lista de resultados formateados, o null si ocurre un error.
   */
  async getFormattedResults(): Promise<any[] | null> {
    const { data, error } = await this.supabase
      .from('results')
      .select('firstname, lastname, score, victory, created_at, id_game')
      .order('score', { ascending: false });

    if (error) {
      console.error('Error al obtener resultados:', error);
      return null;
    }

    const resultsWithGameNames = await Promise.all(
      data.map(async result => {
        const gameName = await this.getGameNameById(result.id_game);
        return {
          name: `${result.firstname} ${result.lastname}`,
          score: result.score,
          victory: result.victory,
          gameName: gameName ?? 'Desconocido',
          date: new Date(result.created_at).toLocaleDateString() + " - " + new Date(result.created_at).toLocaleTimeString()
        };
      })
    );

    return resultsWithGameNames;
  }
}
