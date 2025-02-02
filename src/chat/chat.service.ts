/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Message } from './interfaces/message.interface';

@Injectable()
export class ChatService {
  private filePath = path.join(process.cwd(), 'src/chat/data');

  saveMessage(sender: string, message: string, chatId: string) {
    const messageData = {
      sender,
      message,
      chatId,
      timestamp: new Date().toISOString(),
    };
    const messages = this.loadMessages(chatId);
    messages.push(messageData);

    const chatFolderPath = path.join(this.filePath, chatId);
    const filePath = path.join(chatFolderPath, 'messages.json');

    if (!fs.existsSync(chatFolderPath)) {
      fs.mkdirSync(chatFolderPath, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
  }

  private loadMessages(chatId: string): Message[] {
    const chatFolderPath = path.join(this.filePath, chatId);
    const filePath = path.join(chatFolderPath, 'messages.json');

    if (!fs.existsSync(filePath)) {
      return [];
    }

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent) as Message[];
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
      return [];
    }
  }

  getMessagesByChatId(chatId: string): Message[] {
    return this.loadMessages(chatId);
  }
}
