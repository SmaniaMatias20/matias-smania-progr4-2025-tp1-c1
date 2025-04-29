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

  constructor(private chatService: ChatService, private authService: AuthService) { }

  async ngOnInit() {
    this.user = await this.authService.getUser();
    this.messages = await this.chatService.getMessages();

    this.chatService.listenToMessages((msg) => {
      this.messages.push(msg);
    });
  }

  async sendMessage() {
    if (this.message.trim()) {
      await this.chatService.sendMessage(this.user.id, this.user.firstname, this.user.lastname, this.message);
      this.message = '';
    }
  }

  isMyMessage(msg: any) {
    return msg.user_id === this.user.id;
  }

  formatTime(date: string): string {
    const d = new Date(date);

    const time = d.toLocaleTimeString('en-US', { hour12: false });
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${time} - ${year}/${month}/${day}`;
  }


  getRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

  getUserColor(username: string): string {
    if (!this.userColors[username]) {
      this.userColors[username] = this.getRandomColor();
    }
    return this.userColors[username];
  }



}
