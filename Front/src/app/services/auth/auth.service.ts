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

  /**
   * Constructor del servicio de autenticación.
   * 
   * Este constructor inicializa el servicio de autenticación, configura el cliente de Supabase a través del servicio `DatabaseService`,
   * y verifica si hay una sesión activa al invocar el método `checkSession()`.
   * 
   * Además, se suscribe a los cambios de estado de autenticación mediante `onAuthStateChange` para gestionar el estado del usuario
   * y su sesión en el cliente (por ejemplo, si el usuario se desconecta o la sesión expira).
   * 
   * @param {DatabaseService} db - El servicio de base de datos que proporciona el cliente de Supabase.
   */
  constructor(private db: DatabaseService) {
    this.supabase = this.db.client;

    this.checkSession();

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session === null) {
        this.user.set(false);
        localStorage.removeItem('user');
        return;
      }


      if (session && session.expires_at) {
        localStorage.setItem('session_expires_at', session.expires_at.toString());

        const msUntilExpire = session.expires_at * 1000 - Date.now();
        if (msUntilExpire > 0) {
          setTimeout(() => {
            this.logout();
          }, msUntilExpire);
        }
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

  /**
   * Verifica si hay una sesión activa al cargar la aplicación.
   * 
   * Este método comprueba si existe una sesión activa en `localStorage` al cargar el servicio. Si encuentra un usuario almacenado
   * y la sesión no ha expirado, establece el estado del usuario en el servicio. Si la sesión ha expirado o no existe un usuario
   * almacenado, cierra la sesión automáticamente y actualiza el estado del usuario.
   * 
   * Además, se asegura de que si la sesión ha expirado (basado en el valor de `session_expires_at` en `localStorage`), 
   * se invoque el método de cierre de sesión `logout()` para mantener la seguridad de la aplicación.
   * 
   * @returns {void} No devuelve nada, solo actualiza el estado del usuario en función de la sesión almacenada.
   */
  private checkSession(): void {
    const storedUser = localStorage.getItem('user');
    const expiresAt = localStorage.getItem('session_expires_at');

    if (expiresAt && Date.now() / 1000 > parseInt(expiresAt)) {
      this.logout();
      return;
    }

    if (storedUser) {
      this.user.set(JSON.parse(storedUser));
    } else {
      this.user.set(false);
    }
  }

  /**
   * Devuelve el usuario actual desde el estado reactivo.
   * @returns {User | boolean} Usuario autenticado o false si no hay sesión
   */
  getUser(): User | boolean {
    return this.user();
  }

  /**
   * Registra un nuevo usuario y guarda sus datos adicionales en la tabla 'users'.
   * Luego intenta iniciar sesión automáticamente.
   * 
   * @param {string} email - Correo electrónico del nuevo usuario
   * @param {string} password - Contraseña del nuevo usuario
   * @param {{ firstName: string; lastName: string; age: number }} extraData - Datos adicionales
   * @returns {Promise<{ success: boolean; message: string }>} Resultado de la operación
   */
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

  /**
   * Inicia sesión con email y contraseña, y carga los datos del usuario desde la tabla 'users'.
   * 
   * @param {string} email - Correo electrónico del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<{ success: boolean; message: string }>} Resultado de la operación
   */
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

  /**
   * Cierra la sesión del usuario actual, limpia el almacenamiento local y redirige al home.
   * 
   * @returns {Promise<{ success: boolean; message: string }>} Resultado de la operación
   */
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
