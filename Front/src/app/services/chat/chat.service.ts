import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';

@Injectable({ providedIn: 'root' })
export class ChatService {

  /**
   * Constructor de la clase ChatService.
   * 
   * Este constructor recibe una instancia de DatabaseService, que es utilizada para interactuar con la base de datos.
   * 
   * @param {DatabaseService} db - Una instancia del servicio de base de datos que proporciona métodos para interactuar con la base de datos.
   */
  constructor(private db: DatabaseService) { }

  /**
   * Obtiene todos los mensajes de la base de datos, ordenados por la fecha de creación.
   * @returns {Promise<any[]>} - Devuelve los mensajes obtenidos de la base de datos.
   * @throws {Error} - Lanza un error si ocurre un problema al obtener los mensajes.
   */
  async getMessages() {
    const { data, error } = await this.db.client
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  /**
   * Envía un mensaje a la base de datos.
   * @param {string} userId - El ID del usuario que envía el mensaje.
   * @param {string} firstname - El primer nombre del usuario.
   * @param {string} lastname - El apellido del usuario.
   * @param {string} message - El contenido del mensaje a enviar.
   * @throws {Error} - Lanza un error si ocurre un problema al insertar el mensaje.
   */
  async sendMessage(userId: string, firstname: string, lastname: string, message: string) {
    const { error } = await this.db.client.from('messages').insert([
      {
        user_id: userId,
        username: firstname + "-" + lastname,
        message
      }
    ]);
    if (error) throw error;
  }

  /**
   * Escucha los mensajes nuevos que se insertan en la base de datos en tiempo real.
   * @param {function} callback - Función que se ejecuta cuando llega un nuevo mensaje.
   */
  listenToMessages(callback: (msg: any) => void) {
    this.db.client
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          callback(payload.new);
        }
      )
      .subscribe();
  }
}
