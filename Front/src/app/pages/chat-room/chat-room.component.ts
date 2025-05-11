import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat/chat.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-chat-room',
  imports: [FormsModule],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css'
})
export class ChatRoomComponent implements OnInit {

  user: any = null;
  messages: any[] = [];
  userColors: { [username: string]: string } = {};
  currentDate: string | null = null;
  message = '';

  /**
 * Constructor de la clase ChatRoomComponent.
 * 
 * @param {ChatService} chatService - Servicio que maneja la lógica de los mensajes en el chat.
 * @param {AuthService} authService - Servicio que maneja la autenticación del usuario.
 */
  constructor(private chatService: ChatService, private authService: AuthService) { }

  /**
 * Método que se ejecuta cuando el componente se inicializa.
 * @returns {void} - No retorna ningún valor.
 */
  async ngOnInit() {
    this.user = await this.authService.getUser();
    this.messages = await this.chatService.getMessages();

    this.chatService.listenToMessages((msg) => {
      this.messages.push(msg);
    });
  }

  /**
   * Método para enviar un mensaje.
   * @returns {void} - No retorna ningún valor.
   */
  async sendMessage() {
    if (this.message.trim()) {
      await this.chatService.sendMessage(this.user.id, this.user.firstname, this.user.lastname, this.message);
      this.message = '';
    }
  }

  /**
 * Método que verifica si el mensaje pertenece al usuario actual.
 * @param {any} msg - El mensaje que se verifica.
 * @returns {boolean} - Retorna true si el mensaje es del usuario actual.
 */
  isMyMessage(msg: any) {
    return msg.user_id === this.user.id;
  }

  /**
 * Método para formatear la hora de un mensaje.
 * @param {string} date - Fecha del mensaje.
 * @returns {string} - Devuelve la hora y fecha formateada.
 */
  formatTime(date: string): string {
    const d = new Date(date);

    const time = d.toLocaleTimeString('en-US', { hour12: false });
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${time} - ${year}/${month}/${day}`;
  }


  /**
   * Método para generar un color aleatorio en formato RGB.
   * @returns {string} - Retorna un color aleatorio en formato RGB.
   */
  getRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

  /**
 * Método que obtiene el color asignado a un usuario.
 * Si no tiene un color asignado, lo genera aleatoriamente.
 * @param {string} username - El nombre de usuario.
 * @returns {string} - Retorna el color asignado al usuario.
 */
  getUserColor(username: string): string {
    if (!this.userColors[username]) {
      this.userColors[username] = this.getRandomColor();
    }
    return this.userColors[username];
  }



}
