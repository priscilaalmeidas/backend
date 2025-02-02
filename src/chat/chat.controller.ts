/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Message } from './interfaces/message.interface';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  saveMessage(
    @Body('sender') sender: string,
    @Body('message') message: string,
    @Body('chatId') chatId: string,
  ) {
    this.chatService.saveMessage(sender, message, chatId);
    return { status: 'Mensagem salva com sucesso!' };
  }

  @Get(':chatId/messages')
  getMessages(@Param('chatId') chatId: string): Message[] {
    return this.chatService.getMessagesByChatId(chatId);
  }
}
