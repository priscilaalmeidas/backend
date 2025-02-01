/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

export enum TicketStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  sender: string; // 'client' ou 'agent'

  @Prop({ required: true })
  text: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

@Schema({ timestamps: true })
export class Ticket {
  @Prop({ type: Types.ObjectId, ref: 'Contact', required: true })
  contact: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  agent: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    enum: TicketStatus,
    default: TicketStatus.PENDING,
  })
  status: TicketStatus;

  @Prop({ type: String, required: true })
  lastMessage: string;

  @Prop({ type: String, required: true })
  channel: string;

  @Prop({ type: Date })
  startedAt: Date;

  @Prop({ type: Date })
  endedAt?: Date;

  @Prop({ type: Number, default: 0 })
  duration: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
