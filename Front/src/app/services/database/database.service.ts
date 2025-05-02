import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  supabase: SupabaseClient<any, "public", any>;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  get client(): SupabaseClient {
    return this.supabase;
  }


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

  async getFormattedResults(): Promise<any[] | null> {
    const { data, error } = await this.supabase
      .from('results')
      .select('firstname, lastname, score, victory, created_at, id_game');

    if (error) {
      console.error('Error al obtener resultados:', error);
      return null;
    }

    console.log(data);

    const resultsWithGameNames = await Promise.all(
      data.map(async result => {
        const gameName = await this.getGameNameById(result.id_game);
        return {
          name: `${result.firstname} ${result.lastname}`,
          score: result.score,
          victory: result.victory,
          gameName: gameName ?? 'Desconocido',
          date: result.created_at
        };
      })
    );
    console.log(resultsWithGameNames)
    return resultsWithGameNames;
  }






}
