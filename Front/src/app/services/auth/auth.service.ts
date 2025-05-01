import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  user = signal<User | boolean>(false);
  router = inject(Router);

  constructor(private db: DatabaseService) {
    this.supabase = this.db.client;

    this.checkSession();

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session === null) {
        this.user.set(false);
        localStorage.removeItem('user');
        return;
      }

      this.supabase.auth.getUser().then(async ({ data, error }) => {
        if (error) {
          console.error('Error al obtener el usuario autenticado:', error.message);
          return;
        }

        const userId = data.user.id;
        const { data: user, error: userError } = await this.supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();

        if (userError) {
          console.error('Error al obtener datos del usuario desde la tabla usuarios:', userError.message);
          return;
        }

        this.user.set(user);
        localStorage.setItem('user', JSON.stringify(user));
      });
    });
  }

  private checkSession() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user.set(JSON.parse(storedUser));
    } else {
      this.user.set(false);
    }
  }

  getUser() {
    return this.user();
  }

  async register(
    email: string,
    password: string,
    extraData: { firstName: string; lastName: string; age: number }
  ): Promise<{ success: boolean; message: string }> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { success: false, message: error.message };
    }

    const user = data.user;

    if (!user) {
      return { success: false, message: 'No se pudo obtener el usuario después del registro.' };
    }

    const { error: insertError } = await this.supabase.from('users').insert([
      {
        id: user.id,
        firstname: extraData.firstName,
        lastname: extraData.lastName,
        age: extraData.age,
      },
    ]);

    if (insertError) {
      return { success: false, message: 'Registro fallido al guardar los datos.' };
    }

    const loginResult = await this.login(email, password);
    if (!loginResult.success) {
      return { success: false, message: 'Usuario registrado pero no pudo iniciar sesión automáticamente.' };
    }

    return {
      success: true,
      message: 'Registro y login exitoso.',
    };
  }

  async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return { success: false, message: 'Credenciales inválidas.' };
    }

    const user = data.user;
    if (user) {
      const { data: userDetails, error: userError } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userError) {
        return { success: false, message: 'Error al obtener los datos del usuario.' };
      }

      localStorage.setItem('user', JSON.stringify(userDetails));
      this.user.set(userDetails);
    }

    this.router.navigateByUrl('/home');
    return { success: true, message: 'Inicio de sesión exitoso.' };
  }

  async logout(): Promise<{ success: boolean; message: string }> {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      return { success: false, message: error.message };
    }

    localStorage.removeItem('user');
    this.user.set(false);
    this.router.navigateByUrl('/home');
    return { success: true, message: 'Sesión cerrada correctamente.' };
  }
}
