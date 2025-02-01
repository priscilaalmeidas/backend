/* eslint-disable prettier/prettier */
import { IsEnum } from 'class-validator';
import { TicketStatus } from '../ticket.schema';

export class UpdateTicketDto {
  @IsEnum(TicketStatus)
  status: TicketStatus;
}
