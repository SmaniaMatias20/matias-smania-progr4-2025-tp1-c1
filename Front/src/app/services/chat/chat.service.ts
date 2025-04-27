import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private db: DatabaseService) { }

  async getMessages() {
    const { data, error } = await this.db.client
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

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
