/* eslint-disable prettier/prettier */
export class CreateTicketDto {
  contact: { _id: string; name: string };
  status: string;
  lastMessage?: string;
  duration?: number;
  agent?: string;
  channel: string;
}
